from datetime import date

from ninja import Schema

from brain.portfolio.api.schemas.skill import SkillSchema


class ProjectSchema(Schema):
    id: int
    name: str
    start_date: date
    end_date: date | None = None
    objective: str
    description: str
    order: int
    skills: list[SkillSchema]
    logo_url: str | None = None
