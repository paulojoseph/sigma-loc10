FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings

WORKDIR /usr/src/app

# CORREÇÃO AQUI: Removemos 'apps/api/' pois já estamos dentro dela pelo contexto
COPY requirements.txt ./requirements.txt

RUN apt-get update && apt-get install -y --no-install-recommends \
  postgresql-client \
  gcc \
  build-essential \
  netcat-traditional \
  && pip install --no-cache-dir -r requirements.txt \
  && pip install gunicorn \
  && rm -rf /var/lib/apt/lists/*

# CORREÇÃO AQUI: Copia tudo do contexto atual (.) para o container (.)
COPY . .

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]