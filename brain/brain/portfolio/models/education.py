from django.db import models
from django.utils.translation import gettext_lazy as _


class Education(models.Model):
    """
    Academic degree and institution history on the career timeline.
    """

    DEGREE_LEVEL_CHOICES = [
        ("high_school", _("High School")),
        ("associate", _("Associate Degree")),
        ("bachelor", _("Bachelor's Degree")),
        ("master", _("Master's Degree")),
        ("doctorate", _("Doctorate")),
        ("professional", _("Professional Degree")),
    ]

    institution = models.CharField(_("institution"), max_length=200)
    location = models.CharField(_("location"), max_length=200, blank=True, default="")
    degree_level = models.CharField(
        _("degree level"),
        max_length=20,
        choices=DEGREE_LEVEL_CHOICES,
    )
    degree_title = models.CharField(
        _("degree title"),
        max_length=100,
        blank=True,
        default="",
    )
    major = models.CharField(_("major"), max_length=100, blank=True, default="")
    minor = models.CharField(_("minor"), max_length=100, blank=True, default="")
    start_date = models.DateField(_("start date"))
    end_date = models.DateField(_("end date"), blank=True, null=True)
    gpa = models.FloatField(_("gpa"), blank=True, null=True)
    order = models.PositiveIntegerField(_("display order"), default=0)
    description = models.TextField(_("description"), blank=True, default="")
    logo_url = models.URLField(_("logo url"), blank=True, default="")

    class Meta:
        ordering = ["-start_date", "order"]
        verbose_name = _("education")
        verbose_name_plural = _("educations")

    def __str__(self):
        if self.degree_title:
            return f"{self.degree_title} at {self.institution}"
        return self.institution
