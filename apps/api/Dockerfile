FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings

WORKDIR /usr/src/app

# Copia SOMENTE o requirements.txt da pasta api
COPY ./requirements.txt .

RUN apt-get update && apt-get install -y --no-install-recommends \
  postgresql-client \
  gcc \
  build-essential \
  netcat-traditional \
  && pip install --no-cache-dir -r requirements.txt \
  && pip install gunicorn \
  && rm -rf /var/lib/apt/lists/*

# Copia o resto do código da API
COPY . .

# Dá permissão ao entrypoint
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
