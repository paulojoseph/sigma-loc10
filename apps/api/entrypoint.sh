#!/usr/bin/env sh
set -e

# --- Helper: extrai host e port de DATABASE_URL se necessário ---
extract_from_database_url() {
  # Ex: postgresql://user:pass@hostname:5432/dbname
  if [ -n "${DATABASE_URL:-}" ]; then
    # extrai host
    HOST_FROM_URL=$(echo "$DATABASE_URL" | sed -E 's#.*@([^:/]+).*#\1#')
    # extrai porta (se houver)
    PORT_FROM_URL=$(echo "$DATABASE_URL" | sed -E 's#.*:([0-9]+)/.*#\1#')
    # valida se extraiu um número
    case "$PORT_FROM_URL" in
      ''|*[!0-9]*)
        PORT_FROM_URL=''
        ;;
      *)
        ;;
    esac
  fi
}

# --- Determina host e port a usar para checar o Postgres ---
# Prioridade: POSTGRES_HOST > PGHOST > DB_HOST > extracted from DATABASE_URL
POSTGRES_HOST=${POSTGRES_HOST:-}
POSTGRES_PORT=${POSTGRES_PORT:-}

PGHOST=${PGHOST:-}
DB_HOST=${DB_HOST:-}
DB_PORT=${DB_PORT:-}

extract_from_database_url

# choose host
if [ -n "$POSTGRES_HOST" ]; then
  DB_HOST_TO_CHECK="$POSTGRES_HOST"
elif [ -n "$PGHOST" ]; then
  DB_HOST_TO_CHECK="$PGHOST"
elif [ -n "$DB_HOST" ]; then
  DB_HOST_TO_CHECK="$DB_HOST"
elif [ -n "$HOST_FROM_URL" ]; then
  DB_HOST_TO_CHECK="$HOST_FROM_URL"
else
  # fallback (local docker-compose)
  DB_HOST_TO_CHECK="db"
fi

# choose port
if [ -n "$POSTGRES_PORT" ]; then
  DB_PORT_TO_CHECK="$POSTGRES_PORT"
elif [ -n "$DB_PORT" ]; then
  DB_PORT_TO_CHECK="$DB_PORT"
elif [ -n "$PORT_FROM_URL" ]; then
  DB_PORT_TO_CHECK="$PORT_FROM_URL"
else
  DB_PORT_TO_CHECK=5432
fi

echo "Using Postgres host: ${DB_HOST_TO_CHECK}, port: ${DB_PORT_TO_CHECK}"

# --- Aguarda Postgres responder ---
echo "Aguardando o Postgres (${DB_HOST_TO_CHECK}:${DB_PORT_TO_CHECK})..."
# loop infinito até conectar (Railway pode demorar)
until nc -z "${DB_HOST_TO_CHECK}" "${DB_PORT_TO_CHECK}"; do
  echo "Postgres não disponível ainda em ${DB_HOST_TO_CHECK}:${DB_PORT_TO_CHECK} — aguardando 0.5s..."
  sleep 0.5
done
echo "Postgres está pronto!"

# --- Migrações e fixtures ---
echo "Aplicando migrações..."
python manage.py migrate --noinput

# Load fixtures only if Equipment table seems vazia (safeguard)
if python manage.py shell -c "import sys; from equipment.models import Equipment; sys.exit(0 if Equipment.objects.count() == 0 else 1)"; then
  echo "Carregando dados iniciais..."
  python manage.py loaddata /usr/src/app/fixtures/initial_data.json || true
else
  echo "Dados já existem. Pulando carga."
fi

echo "Verificando superusuário..."
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin','admin@example.com','admin123')
    print('Superusuário admin criado.')
else:
    print('Superusuário admin já existe.')
"

echo "Coletando estáticos..."
python manage.py collectstatic --noinput || true

# --- Inicia Gunicorn bind no PORT injetado pelo Railway (fallback 8000) ---
PORT="${PORT:-8000}"
echo "Iniciando Gunicorn no porto ${PORT}..."
exec gunicorn config.wsgi:application \
  --bind "0.0.0.0:${PORT}" \
  --workers 3 \
  --threads 4 \
  --access-logfile '-' \
  --error-logfile '-'
