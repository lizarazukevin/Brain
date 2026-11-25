from brain.portfolio.api.router import router
from brain.portfolio.api.schemas import StatsSchema
from brain.portfolio.services.stats import get_stats


@router.get("/stats/", response=StatsSchema, auth=None)
def get_portfolio_stats(request):
    return get_stats()
