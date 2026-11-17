from django.db import models
from django.utils.translation import gettext_lazy as _

from brain.portfolio.models.skill import Skill


class Project(models.Model):
    """
    A personal or side project.
    Primarily around experimentation and exploration.
    """

    name = models.CharField(_("name"), max_length=100, unique=True)
    start_date = models.DateField(_("start date"))
    end_date = models.DateField(_("end date"), blank=True, null=True)
    objective = models.CharField(_("objective"), max_length=400, blank=True, default="")
    description = models.TextField(_("description"), blank=True, default="")
    skills = models.ManyToManyField(
        Skill,
        related_name="projects",
        blank=True,
        verbose_name=_("skills"),
    )
    order = models.PositiveIntegerField(_("display order"), default=0)

    class Meta:
        ordering = ["-start_date", "order"]
        verbose_name = _("project")
        verbose_name_plural = _("projects")

    def __str__(self):
        return f"{self.name}"
