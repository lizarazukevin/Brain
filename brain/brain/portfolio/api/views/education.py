from django.shortcuts import get_object_or_404

from brain.portfolio.api import router
from brain.portfolio.api.schemas import EducationSchema
from brain.portfolio.models import Education


@router.get("/education/", response=list[EducationSchema], auth=None)
def list_education(request):
    return Education.objects.all()


@router.get(
    "/education/{education_id}/",
    response=EducationSchema,
    auth=None,
)
def get_education(request, education_id: int):
    return get_object_or_404(
        Education.objects,
        pk=education_id,
    )
