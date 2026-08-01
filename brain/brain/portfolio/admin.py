from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models import Profile
from brain.portfolio.models import Skill
from brain.portfolio.models import WorkExperience


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]
    list_filter = ["category"]
    search_fields = ["name", "category"]
    ordering = ["category", "name"]


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
    list_display = ["role", "company", "location", "start_date", "end_date", "order"]
    list_filter = ["company"]
    search_fields = ["role", "company", "description"]
    ordering = ["-start_date", "order"]
    inlines = [WorkExperienceSkillInline]
    fieldsets = (
        (
            None,
            {
                "fields": ("company", "location", "role"),
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
                "fields": ("description", "order"),
            },
        ),
    )
    exclude = ("skills",)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            _("Personal Info"),
            {
                "fields": ("name", "tagline", "bio"),
            },
        ),
        (
            _("Media"),
            {
                "fields": ("avatar", "resume"),
            },
        ),
        (
            _("Links"),
            {
                "fields": ("linkedin_url", "github_url"),
            },
        ),
    )

    def has_add_permission(self, request):
        """Prevent creating a second profile if one already exists."""
        return not Profile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """Prevent deleting the last profile."""
        return False
