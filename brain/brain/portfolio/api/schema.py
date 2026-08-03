from datetime import date

from ninja import Schema

from brain.portfolio.models import Profile


class SkillSchema(Schema):
    id: int
    name: str
    category: str


class ProfileSchema(Schema):
    id: int
    name: str
    tagline: str
    bio: str
    avatar: str | None = None
    resume: str | None = None
    linkedin_url: str
    github_url: str

    @staticmethod
    def resolve_avatar(obj: Profile, context):
        if obj.avatar:
            request = context["request"]
            return request.build_absolute_uri(obj.avatar.url)
        return None

    @staticmethod
    def resolve_resume(obj: Profile, context):
        if obj.resume:
            request = context["request"]
            return request.build_absolute_uri(obj.resume.url)
        return None


class ProfileUpdateSchema(Schema):
    name: str | None = None
    tagline: str | None = None
    bio: str | None = None
    linkedin_url: str | None = None
    github_url: str | None = None


class WorkExperienceSchema(Schema):
    id: int
    company: str
    location: str
    role: str
    start_date: date
    end_date: date | None = None
    description: str
    order: int
    skills: list[SkillSchema]


class WorkExperienceCreateSchema(Schema):
    company: str
    location: str = ""
    role: str
    start_date: date
    end_date: date | None = None
    description: str = ""
    order: int = 0
    skill_ids: list[int] = []


class WorkExperienceUpdateSchema(Schema):
    company: str | None = None
    location: str | None = None
    role: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    description: str | None = None
    order: int | None = None
    skill_ids: list[int] | None = None
