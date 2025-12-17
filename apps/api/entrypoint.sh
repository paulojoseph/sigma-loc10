#!/bin/sh
# apps/api/entrypoint.sh
set -e

# Aguarda o banco de dados estar pronto
echo "Aguardando o Postgres..."
while ! nc -z $POSTGRES_HOST 5432; do
  sleep 0.1
done
echo "Postgres iniciado"

# Executa migrações
echo "Aplicando migrações..."
python manage.py migrate --noinput

# Carrega dados iniciais se a tabela de equipamentos estiver vazia
# Verifica se existe algum equipamento. Se retornar 0, carrega a fixture.
count=$(python manage.py shell -c "from equipment.models import Equipment; print(Equipment.objects.count())" || echo "0")
if [ "$count" = "0" ]; then
    echo "Carregando dados iniciais..."
    # Usa o caminho absoluto para evitar ambiguidade
    python manage.py loaddata /usr/src/app/fixtures/initial_data.json
else
    echo "Dados já existem. Pulando carga."
fi

# Cria superusuário padrão se não existir
echo "Verificando superusuário..."
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superusuário admin criado.')
else:
    print('Superusuário admin já existe.')
"

# Coleta arquivos estáticos
echo "Coletando estáticos..."
python manage.py collectstatic --noinput

# Inicia o servidor com Gunicorn
echo "Iniciando servidor..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
