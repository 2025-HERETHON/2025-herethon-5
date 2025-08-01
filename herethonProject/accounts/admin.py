from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, LearningRecord

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('추가', {'fields': ('name',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(LearningRecord)