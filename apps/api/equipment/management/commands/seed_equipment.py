import random
from decimal import Decimal
from django.core.management.base import BaseCommand
from equipment.models import Equipment

class Command(BaseCommand):
    help = 'Popula o banco de dados com equipamentos de construção realistas'

    def handle(self, *args, **kwargs):
        self.stdout.write('Iniciando o seeding de equipamentos...')

        # Lista de dados curados para parecer real
        items = [
            ("Betoneira 400L Profissional", "Motor elétrico monofásico, ideal para concreto e argamassa em grandes obras.", "45.00"),
            ("Andaime Tubular 1.5m (Par)", "Aço carbono reforçado, encaixe perfeito. Preço por metro vertical.", "12.00"),
            ("Martelo Demolidor 15kg", "Sistema antivibração, 1700W. Ideal para quebra de pisos e vigas.", "120.00"),
            ("Compactador de Solo (Sapo)", "Motor 4 tempos a gasolina. Alta compactação para fundações.", "150.00"),
            ("Esmerilhadeira Angular 7\"", "Rotação de 8500 RPM. Para corte e desbaste em metais e alvenaria.", "35.00"),
            ("Furadeira de Impacto Industrial", "Mandril 1/2, velocidade variável e reversível. Acompanha maleta.", "25.00"),
            ("Gerador de Energia 5kVA", "Gasolina, partida elétrica, autonomia de 8h. Tensão Bivolt.", "200.00"),
            ("Lavadora de Alta Pressão", "Uso profissional, 2000 PSI, mangueira de 10 metros.", "55.00"),
            ("Serra Circular de Bancada", "Disco de 10 polegadas, corte preciso em madeira. Guia de alumínio.", "80.00"),
            ("Escada Extensiva 7m", "Fibra de vidro, não condutora. Essencial para serviços elétricos.", "28.00"),
            ("Guincho de Coluna 200kg", "Elevação de materiais para lajes e andares superiores. Cabo de 30m.", "65.00"),
            ("Vibrador de Concreto", "Mangote de 5 metros. Elimina bolhas de ar e garante a densidade.", "40.00"),
        ]

        # Limpa dados antigos para não duplicar se rodar duas vezes
        Equipment.objects.all().delete()

        created_count = 0
        for name, desc, price in items:
            # Lógica para distribuir status: 60% Disponível, 30% Alugado, 10% Manutenção
            status = random.choices(
                ['AVAILABLE', 'RENTED', 'MAINTENANCE'], 
                weights=[60, 30, 10], 
                k=1
            )[0]

            Equipment.objects.create(
                name=name,
                description=desc,
                daily_rate=Decimal(price),
                status=status
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Sucesso! {created_count} equipamentos foram criados.'))