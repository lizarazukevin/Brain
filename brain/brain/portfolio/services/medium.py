from __future__ import annotations

import json
import logging
import urllib.error
import urllib.request
from urllib.parse import urlparse

from django.conf import settings

logger = logging.getLogger(__name__)

RAPIDAPI_BASE = "https://medium2.p.rapidapi.com"
RAPIDAPI_HOST = "medium2.p.rapidapi.com"
# Medium user id for https://medium.com/@lizarazukevin
MEDIUM_USER_ID = "5c7e986347fd"
REQUEST_TIMEOUT_SECONDS = 10


class MediumStatsError(Exception):
    """Raised when Medium stats cannot be fetched or parsed."""

    def __init__(self, message: str = "Could not fetch Medium stats.") -> None:
        super().__init__(message)


def get_medium_username(profile) -> str | None:
    """Extract the Medium username from a profile's medium_url, if any."""
    medium_url = profile.medium_url.strip()
    if not medium_url:
        return None

    path = urlparse(medium_url).path.strip("/")
    if not path or "/" in path:
        logger.warning("Could not parse Medium username from url: %s", medium_url)
        return None

    return path[1:] if path.startswith("@") else path


def _fetch_json(url: str, headers: dict[str, str] | None = None) -> dict:
    """GET a JSON document with optional extra headers."""
    request_headers = {"User-Agent": "brain-portfolio", **(headers or {})}
    request = urllib.request.Request(url, headers=request_headers)  # noqa: S310
    try:
        with urllib.request.urlopen(  # noqa: S310
            request,
            timeout=REQUEST_TIMEOUT_SECONDS,
        ) as response:
            return json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, OSError, json.JSONDecodeError) as exc:
        logger.warning("Medium request failed for %s: %s", url, exc)
        raise MediumStatsError from exc


def fetch_medium_articles() -> int | None:
    """Count articles via the unofficial Medium API (needs a RapidAPI key)."""
    api_key = settings.MEDIUM_RAPIDAPI_KEY
    if not api_key:
        return None

    headers = {
        "x-rapidapi-key": api_key,
        "x-rapidapi-host": RAPIDAPI_HOST,
    }
    try:
        articles_data = _fetch_json(
            f"{RAPIDAPI_BASE}/user/{MEDIUM_USER_ID}/articles?limit=1000",
            headers,
        )
    except MediumStatsError as exc:
        logger.warning("Medium RapidAPI lookup failed: %s", exc)
        return None

    article_ids = articles_data.get("associated_articles")
    if isinstance(article_ids, list):
        return len(article_ids)

    count = articles_data.get("count")
    if isinstance(count, int):
        return count

    logger.warning("Unexpected Medium articles payload: %s", articles_data)
    return None
