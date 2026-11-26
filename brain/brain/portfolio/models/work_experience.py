from django.db import models
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models.skill import Skill


class WorkExperience(models.Model):
    """
    A job or role on the career timeline.
    """

    EMPLOYMENT_TYPES = [
        ("full_time", _("Full-Time")),
        ("part_time", _("Part-Time")),
        ("internship", _("Internship")),
        ("design_team", _("Design Team")),
        ("research", _("Research")),
        ("executive", _("Executive")),
    ]

    company = models.CharField(_("company"), max_length=200)
    location = models.CharField(_("location"), max_length=200, blank=True, default="")
    role = models.CharField(_("role"), max_length=200)
    start_date = models.DateField(_("start date"))
    end_date = models.DateField(_("end date"), blank=True, null=True)
    objective = models.CharField(_("objective"), max_length=200, blank=True, default="")
    description = models.TextField(_("description"), blank=True, default="")
    skills = models.ManyToManyField(
        Skill,
        related_name="experiences",
        blank=True,
        verbose_name=_("skills"),
    )
    order = models.PositiveIntegerField(_("display order"), default=0)
    employment_type = models.CharField(
        _("employment type"),
        max_length=20,
        choices=EMPLOYMENT_TYPES,
        blank=True,
    )
    logo_url = models.URLField(_("logo url"), blank=True, default="")

    class Meta:
        ordering = ["-start_date", "order"]
        verbose_name = _("work experience")
        verbose_name_plural = _("work experiences")

    def __str__(self):
        return f"{self.role} at {self.company}"
