from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounts.views import UserViewSet

# Importações do JWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # --- Rotas de Autenticação JWT ---
    # Login: Envia user/pass -> Recebe Access e Refresh Token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh: Envia Refresh Token -> Recebe novo Access Token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]