from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Aqui herdamos tudo do UserAdmin padrão (tratamento de senha, grupos, etc).
    # Se adicionar campos novos no model, precisaremos configurar 'fieldsets' aqui depois.
    pass