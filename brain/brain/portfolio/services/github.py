from __future__ import annotations

import json
import logging
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

GITHUB_API_BASE = "https://api.github.com"
REQUEST_TIMEOUT_SECONDS = 10


class GithubStatsError(Exception):
    """Raised when GitHub stats cannot be fetched or parsed."""

    def __init__(self, message: str = "Could not fetch GitHub stats.") -> None:
        super().__init__(message)


@dataclass(frozen=True)
class GithubStats:
    repos: int
    prs: int


def _fetch_json(url: str) -> dict:
    """GET a JSON document from the unauthenticated GitHub API."""
    request = urllib.request.Request(url, headers={"User-Agent": "brain-portfolio"})  # noqa: S310
    try:
        with urllib.request.urlopen(  # noqa: S310
            request,
            timeout=REQUEST_TIMEOUT_SECONDS,
        ) as response:
            return json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, OSError, json.JSONDecodeError) as exc:
        logger.warning("GitHub API request failed for %s: %s", url, exc)
        raise GithubStatsError from exc


def get_github_username(profile) -> str | None:
    """Extract the GitHub username from a profile's github_url, if any."""
    github_url = profile.github_url.strip()
    if not github_url:
        return None

    path = urlparse(github_url).path.strip("/")
    if not path or "/" in path:
        logger.warning("Could not parse GitHub username from url: %s", github_url)
        return None

    return path


def fetch_github_stats(username: str) -> GithubStats:
    """Fetch public repo and authored-PR counts from the GitHub API.

    REPOS comes from the user profile's ``public_repos`` field; PRS is the
    ``total_count`` of issues matching ``author:<username> type:pr``.
    """
    user_url = f"{GITHUB_API_BASE}/users/{urllib.parse.quote(username)}"
    search_url = (
        f"{GITHUB_API_BASE}/search/issues?"
        f"{urllib.parse.urlencode({'q': f'author:{username} type:pr', 'per_page': 1})}"
    )

    user_data = _fetch_json(user_url)
    search_data = _fetch_json(search_url)

    repos = user_data.get("public_repos")
    prs = search_data.get("total_count")
    if not isinstance(repos, int) or not isinstance(prs, int):
        raise GithubStatsError

    return GithubStats(repos=repos, prs=prs)
