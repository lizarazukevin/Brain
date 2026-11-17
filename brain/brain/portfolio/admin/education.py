from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models import Education


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = [
        "institution",
        "location",
        "degree_level",
        "major",
        "start_date",
        "end_date",
        "order",
    ]
    list_filter = ["degree_level", "institution", "location"]
    search_fields = ["institution", "degree_title", "major", "minor"]
    ordering = ["-start_date", "order"]
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "institution",
                    "location",
                    "degree_level",
                    "degree_title",
                    "major",
                    "minor",
                ),
            },
        ),
        (
            _("Dates"),
            {"fields": ("start_date", "end_date")},
        ),
        (
            _("Details"),
            {"fields": ("gpa", "order")},
        ),
    )
