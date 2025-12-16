from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from agents.models import Agent

class AgentModelTest(TestCase):
    def test_create_agent_successful(self):
        """Teste: Deve criar um agente corretamente com role e prompt"""
        agent = Agent.objects.create(
            name="Oraculo",
            role="ARCHITECT",
            system_prompt="Você é um arquiteto de software sênior.",
            model_provider="gpt-4-turbo"
        )

        self.assertEqual(agent.name, "Oraculo")
        self.assertEqual(agent.role, "ARCHITECT")
        self.assertTrue(agent.is_active)
        self.assertIsNotNone(agent.created_at)

    def test_agent_str_representation(self):
        """Teste: O __str__ deve retornar o nome do agente"""
        agent = Agent.objects.create(name="Neo", role="DEV")
        self.assertEqual(str(agent), "Neo (DEV)")