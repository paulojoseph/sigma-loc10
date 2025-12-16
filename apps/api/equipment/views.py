from rest_framework import viewsets, permissions
from .models import Equipment
from .serializers import EquipmentSerializer

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all().order_by('-created_at')
    serializer_class = EquipmentSerializer
    
    # TODO: Configure stricter permissions for production (e.g., IsAuthenticatedOrReadOnly)
    permission_classes = [permissions.AllowAny]