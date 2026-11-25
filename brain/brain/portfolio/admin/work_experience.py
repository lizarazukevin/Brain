from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models import WorkExperience


class WorkExperienceSkillInline(admin.TabularInline):
    """
    Inline for managing skills directly on the WorkExperience admin page.
    """

    model = WorkExperience.skills.through
    extra = 1
    verbose_name = _("skill")
    verbose_name_plural = _("skills")


@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = [
        "role",
        "company",
        "location",
        "employment_type",
        "start_date",
        "end_date",
        "order",
    ]
    list_filter = ["company", "employment_type"]
    search_fields = ["role", "company", "objective"]
    ordering = ["-start_date", "order"]
    inlines = [WorkExperienceSkillInline]
    fieldsets = (
        (
            None,
            {
                "fields": ("company", "location", "role", "employment_type"),
            },
        ),
        (
            _("Dates"),
            {
                "fields": ("start_date", "end_date"),
            },
        ),
        (
            _("Details"),
            {
                "fields": ("objective", "description", "logo_url", "order"),
            },
        ),
    )
