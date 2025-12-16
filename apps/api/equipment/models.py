import uuid
from django.db import models

class Equipment(models.Model):
    STATUS_CHOICES = [
        ('AVAILABLE', 'Disponível'),
        ('RENTED', 'Alugado'),
        ('MAINTENANCE', 'Em Manutenção'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, verbose_name="Nome do Equipamento")
    description = models.TextField(blank=True, verbose_name="Descrição")
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Valor da Diária")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"