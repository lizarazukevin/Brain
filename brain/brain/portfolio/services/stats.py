from __future__ import annotations

import logging
from dataclasses import dataclass

from celery import shared_task
from django.conf import settings
from django.core.cache import cache

from brain.portfolio.models import Profile
from brain.portfolio.services.github import GithubStats
from brain.portfolio.services.github import GithubStatsError
from brain.portfolio.services.github import fetch_github_stats
from brain.portfolio.services.github import get_github_username
from brain.portfolio.services.medium import fetch_medium_articles
from brain.portfolio.services.medium import get_medium_username

logger = logging.getLogger(__name__)

GITHUB_CACHE_KEY = "portfolio:stats:github"
MEDIUM_CACHE_KEY = "portfolio:stats:medium"
# Retry sooner after a provider failure so a flaky upstream doesn't leave the
# footer empty for a full TTL.
FAILURE_CACHE_TTL_SECONDS = 5 * 60


@dataclass(frozen=True)
class GithubStatsPayload:
    repos: int | None = None
    prs: int | None = None


@dataclass(frozen=True)
class MediumStatsPayload:
    articles: int | None = None


@dataclass(frozen=True)
class PortfolioStats:
    github: GithubStatsPayload | None = None
    medium: MediumStatsPayload | None = None


def _cache_ttl() -> int:
    return settings.PORTFOLIO_STATS_CACHE_TTL


def _get_github_stats(profile: Profile) -> GithubStatsPayload | None:
    cached = cache.get(GITHUB_CACHE_KEY)
    if cached is not None:
        return cached

    username = get_github_username(profile)
    if username is None:
        return None

    try:
        stats: GithubStats = fetch_github_stats(username)
    except GithubStatsError:
        logger.exception("Could not fetch GitHub stats for %s", username)
        return None

    payload = GithubStatsPayload(repos=stats.repos, prs=stats.prs)
    cache.set(GITHUB_CACHE_KEY, payload, timeout=_cache_ttl())
    return payload


def _get_medium_stats(profile: Profile) -> MediumStatsPayload | None:
    cached = cache.get(MEDIUM_CACHE_KEY)
    if cached is not None:
        return cached

    username = get_medium_username(profile)
    if username is None:
        return None

    articles = fetch_medium_articles()
    payload = MediumStatsPayload(articles=articles)
    # Failures are cached short-lived too, so a flaky provider can't exhaust
    # the RapidAPI free quota by being re-fetched on every page load.
    timeout = _cache_ttl() if articles is not None else FAILURE_CACHE_TTL_SECONDS
    cache.set(MEDIUM_CACHE_KEY, payload, timeout=timeout)
    return payload


def get_stats() -> PortfolioStats:
    """Aggregate cached GitHub/Medium stats for the current profile."""
    profile = Profile.objects.first()
    if profile is None:
        return PortfolioStats()

    return PortfolioStats(
        github=_get_github_stats(profile),
        medium=_get_medium_stats(profile),
    )


@shared_task()
def refresh_portfolio_stats() -> None:
    """Warm the portfolio stats cache (call from a webhook or beat schedule)."""
    get_stats()
