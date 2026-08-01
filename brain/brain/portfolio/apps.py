from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class PortfolioConfig(AppConfig):
    name = "brain.portfolio"
    verbose_name = _("Portfolio")

    def ready(self):
        """
        Override this method in subclasses to run code when Django starts.
        """
