from rest_framework import viewsets
from .models import CustomUser
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    Endpoint da API para ver ou editar usuários.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # Como definimos IsAuthenticated no settings.py, 
    # só quem estiver logado verá isso.