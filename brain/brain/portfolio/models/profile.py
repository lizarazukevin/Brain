from django.db import models
from django.utils.translation import gettext_lazy as _


class Profile(models.Model):
    """
    Singleton model, only one profile should exist.
    Holds personal information about me!
    """

    name = models.CharField(_("name"), max_length=100)
    tagline = models.CharField(_("tagline"), max_length=300, blank=True, default="")
    bio = models.CharField(_("bio"), blank=True, default="")
    avatar = models.ImageField(
        _("avatar"),
        upload_to="portfolio/avatar",
        blank=True,
        null=True,
    )
    resume = models.FileField(
        _("resume"),
        upload_to="portfolio/resume",
        blank=True,
        null=True,
    )
    linkedin_url = models.URLField(_("linkedin url"), blank=True, default="")
    github_url = models.URLField(_("github url"), blank=True, default="")

    class Meta:
        verbose_name = _("profile")
        verbose_name_plural = _("profiles")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Ensure only one Profile instance exists (singleton pattern)."""
        if not self.pk:
            existing = Profile.objects.first()
            if existing is not None:
                self.pk = existing.pk
        super().save(*args, **kwargs)
