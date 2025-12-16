from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounts.views import UserViewSet

# O Router cria automaticamente as URLs: /users/, /users/1/, etc.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Aqui definimos que tudo da API começa com 'api/'
    # Ex: http://localhost:8000/api/users/
    path('api/', include(router.urls)),
]