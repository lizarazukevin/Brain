from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models import Profile


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
