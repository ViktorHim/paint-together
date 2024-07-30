.PHONY: up up-dev down down-dev

DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE_DEV_FILE = docker-compose.dev.yml

# targets description

help:
	@echo "Usage:"
	@echo "  make build-prod          Build the production containers"
	@echo "  make build-dev           Build the development containers"
	@echo "  make up-prod             Start the production containers"
	@echo "  make up-dev              Start the development containers"
	@echo "  make run-prod            Build and start the production containers"
	@echo "  make run-dev             Build and start the development containers"

# start docker on linux
start:
	sudo systemctl start docker

# production targets

build-prod:
	docker-compose -f ${DOCKER_COMPOSE_FILE} build

up-prod:
	docker-compose -f ${DOCKER_COMPOSE_FILE} up

run-prod:
	docker-compose -f ${DOCKER_COMPOSE_FILE} up --build

# development targets

build-dev:
	docker-compose -f ${DOCKER_COMPOSE_DEV_FILE} build

up-dev:
	docker-compose -f ${DOCKER_COMPOSE_DEV_FILE} up

run-dev:
	docker-compose -f ${DOCKER_COMPOSE_DEV_FILE} up --build