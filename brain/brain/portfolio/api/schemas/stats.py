from ninja import Schema


class GithubStatsSchema(Schema):
    repos: int | None = None
    prs: int | None = None


class MediumStatsSchema(Schema):
    articles: int | None = None


class StatsSchema(Schema):
    github: GithubStatsSchema | None = None
    medium: MediumStatsSchema | None = None
