FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings

WORKDIR /usr/src/app

# Copia requirements.txt usando caminho absoluto no contexto
COPY apps/api/requirements.txt ./requirements.txt

RUN apt-get update && apt-get install -y --no-install-recommends \
  postgresql-client \
  gcc \
  build-essential \
  netcat-traditional \
  && pip install --no-cache-dir -r requirements.txt \
  && pip install gunicorn \
  && rm -rf /var/lib/apt/lists/*

# Copia todo o código da API
COPY apps/api/ .

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
