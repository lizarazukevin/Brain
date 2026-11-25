from django.http import FileResponse
from ninja.errors import HttpError

from brain.portfolio.api.router import router
from brain.portfolio.api.schemas import ProfileSchema
from brain.portfolio.api.schemas import ProfileUpdateSchema
from brain.portfolio.models import Profile


def _get_profile() -> Profile:
    """Return the singleton profile or 404."""
    profile = Profile.objects.first()

    if profile is None:
        raise HttpError(404, "No profile found. Create one in the admin.")

    return profile


@router.get("/profile/", response=ProfileSchema, auth=None)
def get_profile(request):
    return _get_profile()


@router.get("/profile/resume/", auth=None)
def download_resume(request):
    profile = _get_profile()
    if not profile.resume:
        raise HttpError(404, "No resume uploaded.")
    return FileResponse(
        profile.resume.open("rb"),
        as_attachment=False,
        filename=profile.resume.name.split("/")[-1],
    )


@router.patch("/profile/", response=ProfileSchema)
def update_profile(request, data: ProfileUpdateSchema):
    profile = _get_profile()
    for attr, value in data.dict(exclude_unset=True).items():
        setattr(profile, attr, value)
    profile.save()
    return profile
