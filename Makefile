.PHONY: up down build shell-api test-api logs

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose up --build -d

logs:
	docker compose logs -f

shell-api:
	docker compose exec backend bash

test-api:
	docker compose exec backend pytest

migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations
