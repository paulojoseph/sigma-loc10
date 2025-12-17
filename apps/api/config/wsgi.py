import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

print("--- LOADING WSGI APPLICATION ---")

application = get_wsgi_application()
