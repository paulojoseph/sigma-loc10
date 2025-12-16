from django.contrib import admin
from .models import Equipment

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    # Colunas que aparecerão na lista
    list_display = ('name', 'status', 'daily_rate', 'created_at')
    
    # Filtros laterais (barra direita)
    list_filter = ('status',)
    
    # Barra de busca (pesquisa por nome ou descrição)
    search_fields = ('name', 'description')
    
    # Campos que podem ser editados direto na lista (opcional, mas prático)
    list_editable = ('status', 'daily_rate')