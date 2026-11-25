from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models import Project


class ProjectSkillInline(admin.TabularInline):
    """
    Inline for managing skills directly on the Project admin page.
    """

    model = Project.skills.through
    extra = 1
    verbose_name = _("skill")
    verbose_name_plural = _("skills")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "start_date", "end_date", "order"]
    search_fields = ["name", "objective"]
    list_filter = ["start_date", "end_date"]
    ordering = ["-start_date", "order"]
    inlines = [ProjectSkillInline]
    fieldsets = (
        (None, {"fields": ["name"]}),
        (
            _("Dates"),
            {
                "fields": ("start_date", "end_date"),
            },
        ),
        (_("Details"), {"fields": ("objective", "description", "logo_url", "order")}),
    )
