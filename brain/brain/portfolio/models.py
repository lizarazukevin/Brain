from django.db import models
from django.utils.translation import gettext_lazy as _


class Skill(models.Model):
    """
    A skill or technology.
    Categorized for group in the UI.
    """

    name = models.CharField(_("name"), max_length=100, unique=True)
    category = models.CharField(_("category"), max_length=100, blank=True, default="")

    class Meta:
        ordering = ["category", "name"]
        verbose_name = _("skill")
        verbose_name_plural = _("skills")

    def __str__(self):
        if self.category:
            return f"{self.name} ({self.category})"
        return self.name


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


class WorkExperience(models.Model):
    """
    A job or role on the career timeline.
    """

    company = models.CharField(_("company"), max_length=200)
    location = models.CharField(_("location"), max_length=200, blank=True, default="")
    role = models.CharField(_("role"), max_length=200)
    start_date = models.DateField(_("start date"))
    end_date = models.DateField(_("end date"), blank=True, null=True)
    description = models.TextField(_("description"), blank=True, default="")
    skills = models.ManyToManyField(
        Skill,
        related_name="experiences",
        blank=True,
        verbose_name=_("skills"),
    )
    order = models.PositiveIntegerField(_("display order"), default=0)

    class Meta:
        ordering = ["-start_date", "order"]
        verbose_name = _("work experience")
        verbose_name_plural = _("work experiences")

    def __str__(self):
        return f"{self.role} at {self.company}"
