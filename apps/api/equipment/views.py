from rest_framework import viewsets
# 1. Importe a permissão correta
from rest_framework.permissions import IsAuthenticatedOrReadOnly 
from .models import Equipment
from .serializers import EquipmentSerializer

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all().order_by('-created_at')
    serializer_class = EquipmentSerializer
    
    # 2. Defina que leitura é pública, mas escrita exige login
    permission_classes = [IsAuthenticatedOrReadOnly]