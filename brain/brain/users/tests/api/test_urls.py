from __future__ import annotations

from typing import TYPE_CHECKING

from django.urls import resolve
from django.urls import reverse

if TYPE_CHECKING:
    from brain.users.models import User


def test_user_detail(user: User):
    assert (
        reverse("v1:retrieve_user", kwargs={"username": user.username})
        == f"/v1/users/{user.username}/"
    )
    assert resolve(f"/v1/users/{user.username}/").view_name == "v1:retrieve_user"


def test_user_list():
    assert reverse("v1:list_users") == "/v1/users/"
    assert resolve("/v1/users/").view_name == "v1:list_users"


def test_current_user():
    assert reverse("v1:retrieve_current_user") == "/v1/users/me/"
    assert resolve("/v1/users/me/").view_name == "v1:retrieve_current_user"


def test_update_user():
    assert reverse("v1:update_user", kwargs={"username": "john"}) == "/v1/users/john/"
    assert resolve("/v1/users/john/").view_name == "v1:retrieve_user"
