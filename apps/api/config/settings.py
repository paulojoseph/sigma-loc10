import os
from pathlib import Path
from decouple import config, Csv
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
SECRET_KEY = config('SECRET_KEY')

# DEBUG: Padrão False se não especificado (Segurança para Produção)
DEBUG = config('DEBUG', default=False, cast=bool)

# ALLOWED_HOSTS: Aceita lista do .env ou padrão para localhost
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='127.0.0.1,localhost', cast=Csv())

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party
    'rest_framework',      
    'corsheaders',        

    # Local
    'accounts',
    'core',
    'agents',
    'equipment',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # WhiteNoise para estáticos
    'corsheaders.middleware.CorsMiddleware',      # CORS deve ser logo no início
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# --- DATABASE CONFIGURATION (Blindado) ---

# Tenta pegar a URL do Railway diretamente do ambiente
RAILWAY_DB_URL = os.getenv('DATABASE_URL')

if RAILWAY_DB_URL:
    # 🚂 PRODUÇÃO (Railway)
    # Se existe URL do Railway, USAMOS ELA e ignoramos o resto.
    # Adicionamos suporte a Proxy SSL (Essencial para o Railway)
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    
    # FORÇA BRUTA: Aceita qualquer host no Railway para evitar erro 400/502
    ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*', cast=Csv())
    
    DATABASES = {
        'default': dj_database_url.parse(
            RAILWAY_DB_URL,
            conn_max_age=600,
            # Removed health checks to be safer with older drivers
        )
    }
else:
    # 🐳 LOCAL (Docker)
    # Se não tem URL do Railway, assume que é Docker local (host='db')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME', default='loc10'),
            'USER': config('DB_USER', default='postgres'),
            'PASSWORD': config('DB_PASSWORD', default='postgres'),
            'HOST': config('DB_HOST', default='db'), # <--- O culpado 'db' só vive aqui agora
            'PORT': config('DB_PORT', default='5432'),
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# --- ESTÁTICOS HÍBRIDOS (Docker vs Railway) ---
if not DEBUG:
    # PRODUÇÃO: Compressão máxima via WhiteNoise
    STORAGES = {
        "staticfiles": {
            "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
        },
    }
else:
    # LOCAL: Padrão do Django (evita erros no Docker)
    pass

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'accounts.CustomUser'

# DEBUG = False already set in env
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# --- CORS & CSRF CONFIGURATION (DINÂMICO) ---
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Pega a URL do Frontend definida no Railway (Variável FRONTEND_URL)
# Isso permite que a Vercel acesse o Backend sem você hardcodar o link aqui.
PROD_FRONTEND_URL = os.getenv('FRONTEND_URL')

if PROD_FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(PROD_FRONTEND_URL)
    CSRF_TRUSTED_ORIGINS.append(PROD_FRONTEND_URL)

CORS_ALLOW_CREDENTIALS = True

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# --- EXTENDED LOGGING (For Debugging 502 Errors) ---
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'gunicorn': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# --- CACHE LOCAL (Diagnóstico para Eliminar Redis) ---
# Usamos memória local para garantir que o site suba mesmo sem Redis
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}

# Voltar sessão para o banco (mais seguro por enquanto)
SESSION_ENGINE = "django.contrib.sessions.backends.db"