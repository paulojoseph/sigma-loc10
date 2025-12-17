# apps/api/Dockerfile

# Usamos a imagem oficial Python (Slim é menor)
FROM python:3.11-slim

# Define variáveis de ambiente
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=config.settings

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de dependência primeiro para aproveitar o cache
COPY requirements.txt .

# Instala as dependências (incluindo dependências de sistema para o psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
  postgresql-client \
  gcc \
  build-essential \
  netcat-traditional \
  && pip install --no-cache-dir -r requirements.txt \
  && pip install gunicorn \
  && rm -rf /var/lib/apt/lists/*

# Copia o resto do código
COPY . .

# Copia e configura o entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Define o entrypoint
ENTRYPOINT ["/entrypoint.sh"]