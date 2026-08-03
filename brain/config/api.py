from django.contrib.admin.views.decorators import staff_member_required
from ninja import NinjaAPI

from brain.portfolio.api.views import router as portfolio_router
from brain.users.api.views import router as user_router

api = NinjaAPI(
    urls_namespace="api",
    docs_decorator=staff_member_required,
)

api.add_router("/users/", user_router)
api.add_router("/portfolio/", portfolio_router)
