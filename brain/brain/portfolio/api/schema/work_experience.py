from datetime import date

from ninja import Schema

from brain.portfolio.api.schema import SkillSchema


class WorkExperienceSchema(Schema):
    id: int
    company: str
    location: str
    role: str
    start_date: date
    end_date: date | None = None
    objective: str
    description: str
    order: int
    skills: list[SkillSchema]


class WorkExperienceCreateSchema(Schema):
    company: str
    location: str = ""
    role: str
    start_date: date
    end_date: date | None = None
    objective: str = ""
    description: str = ""
    order: int = 0
    skill_ids: list[int] = []


class WorkExperienceUpdateSchema(Schema):
    company: str | None = None
    location: str | None = None
    role: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    objective: str | None = None
    description: str | None = None
    order: int | None = None
    skill_ids: list[int] | None = None
