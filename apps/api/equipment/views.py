from rest_framework import viewsets, permissions # <--- Adicionei 'permissions' aqui
from .models import Equipment
from .serializers import EquipmentSerializer

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all().order_by('-created_at')
    serializer_class = EquipmentSerializer
    
    # MUDANÇA CRÍTICA: AllowAny permite que qualquer um (mesmo sem login) edite.
    # Ideal para dev/showcase rápido, perigoso para produção.
    permission_classes = [permissions.AllowAny]