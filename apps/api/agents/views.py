from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Agent
from .serializers import AgentSerializer

class AgentViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gerenciar Agentes de IA.
    """
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [IsAuthenticated] # Apenas usuários logados podem mexer nos agentes