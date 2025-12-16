from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

# Importações dos ViewSets
from accounts.views import UserViewSet
from equipment.views import EquipmentViewSet  # <--- Faltava isso (Business Core)

# Importações do JWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Configuração do Router
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'equipment', EquipmentViewSet) # <--- Rota de Equipamentos restaurada

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # --- Rotas de Autenticação JWT ---
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]