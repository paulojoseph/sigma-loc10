from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # Campos que queremos expor para o Frontend
        fields = ['id', 'username', 'email', 'is_active', 'date_joined']