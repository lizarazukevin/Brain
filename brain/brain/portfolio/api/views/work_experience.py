from django.shortcuts import get_object_or_404

from brain.portfolio.api.router import router
from brain.portfolio.api.schemas import WorkExperienceCreateSchema
from brain.portfolio.api.schemas import WorkExperienceSchema
from brain.portfolio.api.schemas import WorkExperienceUpdateSchema
from brain.portfolio.models import Skill
from brain.portfolio.models import WorkExperience


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


@router.post("/work-experience/", response=WorkExperienceSchema)
def create_work_experience(request, data: WorkExperienceCreateSchema):
    experience = WorkExperience.objects.create(
        company=data.company,
        location=data.location,
        role=data.role,
        start_date=data.start_date,
        end_date=data.end_date,
        objective=data.objective,
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
