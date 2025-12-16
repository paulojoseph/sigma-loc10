from django.db import models
import uuid

class Agent(models.Model):
    # Definindo os papéis baseados na sua arquitetura Sigma Nexus
    ROLE_CHOICES = [
        ('ARCHITECT', 'Arquiteto de Soluções (Risco & BPMN)'),
        ('DEV', 'Engenheiro Craftsman (TDD & Clean Code)'),
        ('QA', 'Auditor de Qualidade (Reviewer)'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    # O "Cérebro" do agente
    system_prompt = models.TextField(help_text="A persona e instruções base do agente.")
    
    # Configurações técnicas
    model_provider = models.CharField(max_length=50, default="gpt-4-turbo", help_text="Ex: gpt-4, claude-3-opus")
    temperature = models.FloatField(default=0.7)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.role})"
    
    class Meta:
        ordering = ['-created_at']