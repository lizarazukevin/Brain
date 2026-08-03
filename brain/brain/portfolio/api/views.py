from django.http import FileResponse
from django.shortcuts import get_object_or_404
from ninja import Router
from ninja.errors import HttpError
from ninja.security import django_auth

from brain.portfolio.api.schema import ProfileSchema
from brain.portfolio.api.schema import ProfileUpdateSchema
from brain.portfolio.api.schema import WorkExperienceCreateSchema
from brain.portfolio.api.schema import WorkExperienceSchema
from brain.portfolio.api.schema import WorkExperienceUpdateSchema
from brain.portfolio.models import Profile
from brain.portfolio.models import Skill
from brain.portfolio.models import WorkExperience

router = Router(tags=["portfolio"], auth=django_auth)


def _get_profile() -> Profile:
    """Return the singleton profile or 404."""
    profile = Profile.objects.first()
    if profile is None:
        raise HttpError(404, "No profile found. Create one in the admin.")
    return profile


# ── Public endpoints


@router.get("/profile/", response=ProfileSchema, auth=None)
def get_profile(request):
    return _get_profile()


@router.get("/resume/", auth=None)
def download_resume(request):
    profile = _get_profile()
    if not profile.resume:
        raise HttpError(404, "No resume uploaded.")
    return FileResponse(
        profile.resume.open("rb"),
        as_attachment=True,
        filename=profile.resume.name.split("/")[-1],
    )


@router.get("/work-experience/", response=list[WorkExperienceSchema], auth=None)
def list_work_experience(request):
    return WorkExperience.objects.prefetch_related("skills").all()


@router.get(
    "/work-experience/{experience_id}/",
    response=WorkExperienceSchema,
    auth=None,
)
def get_work_experience(request, experience_id: int):
    return get_object_or_404(
        WorkExperience.objects.prefetch_related("skills"),
        pk=experience_id,
    )


# ── Protected endpoints


@router.patch("/profile/", response=ProfileSchema)
def update_profile(request, data: ProfileUpdateSchema):
    profile = _get_profile()
    for attr, value in data.dict(exclude_unset=True).items():
        setattr(profile, attr, value)
    profile.save()
    return profile


@router.post("/work-experience/", response=WorkExperienceSchema)
def create_work_experience(request, data: WorkExperienceCreateSchema):
    experience = WorkExperience.objects.create(
        company=data.company,
        location=data.location,
        role=data.role,
        start_date=data.start_date,
        end_date=data.end_date,
        description=data.description,
        order=data.order,
    )
    if data.skill_ids:
        skills = Skill.objects.filter(id__in=data.skill_ids)
        experience.skills.set(skills)

    return WorkExperience.objects.prefetch_related("skills").get(pk=experience.pk)


@router.patch("/work-experience/{experience_id}/", response=WorkExperienceSchema)
def update_work_experience(
    request,
    experience_id: int,
    data: WorkExperienceUpdateSchema,
):
    experience = get_object_or_404(
        WorkExperience.objects.prefetch_related("skills"),
        pk=experience_id,
    )
    update_data = data.dict(exclude_unset=True)
    skill_ids = update_data.pop("skill_ids", None)

    for attr, value in update_data.items():
        setattr(experience, attr, value)
    experience.save()

    if skill_ids is not None:
        skills = Skill.objects.filter(id__in=skill_ids)
        experience.skills.set(skills)

    return experience


@router.delete("/work-experience/{experience_id}/", response={204: None})
def delete_work_experience(request, experience_id: int):
    experience = get_object_or_404(WorkExperience, pk=experience_id)
    experience.delete()
    return 204, None
