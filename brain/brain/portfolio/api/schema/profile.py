from ninja import Schema

from brain.portfolio.models import Profile


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
