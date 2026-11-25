from django.shortcuts import get_object_or_404

from brain.portfolio.api import router
from brain.portfolio.api.schemas import ProjectSchema
from brain.portfolio.models import Project


@router.get("/project/", response=list[ProjectSchema], auth=None)
def list_project(request):
    return Project.objects.prefetch_related("skills").all()


@router.get("/project/{project_id}/", response=ProjectSchema, auth=None)
def get_project(request, project_id: int):
    return get_object_or_404(
        Project.objects.prefetch_related("skills"),
        pk=project_id,
    )
