from django.contrib import admin

from brain.portfolio.models import Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category"]
    list_filter = ["category"]
    search_fields = ["name"]
    ordering = ["category", "name"]
