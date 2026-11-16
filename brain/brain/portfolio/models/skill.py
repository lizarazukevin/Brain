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
