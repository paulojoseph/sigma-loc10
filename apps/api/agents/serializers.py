from rest_framework import serializers
from .models import Agent

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = [
            'id', 
            'name', 
            'role', 
            'role_display', # Campo extra mágico do Django (get_role_display)
            'system_prompt', 
            'model_provider', 
            'temperature', 
            'is_active', 
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    # Campo calculado para retornar o nome legível da Role (ex: "Arquiteto de Soluções...")
    role_display = serializers.CharField(source='get_role_display', read_only=True)