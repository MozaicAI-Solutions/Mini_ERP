# ==================================================
# PROJECT CONFIG
# ==================================================

DEV_COMPOSE=docker compose -f docker-compose.dev.yml
PROD_COMPOSE=docker compose -f docker-compose.prod.yml

# ==================================================
# DEV
# ==================================================

dev:
	$(DEV_COMPOSE) up --build

dev-d:
	$(DEV_COMPOSE) up --build -d

down-dev:
	$(DEV_COMPOSE) down

restart-dev:
	$(DEV_COMPOSE) down
	$(DEV_COMPOSE) up --build 

logs-dev:
	$(DEV_COMPOSE) logs -f

# ==================================================
# PROD
# ==================================================

prod:
	$(PROD_COMPOSE) up --build

prod-d:
	$(PROD_COMPOSE) up --build -d

down-prod:
	$(PROD_COMPOSE) down

restart-prod:
	$(PROD_COMPOSE) down
	$(PROD_COMPOSE) up --build -d

logs-prod:
	$(PROD_COMPOSE) logs -f

# ==================================================
# CLEANUP
# ==================================================

docker-nuke:
	docker rmi -f $$(docker images -q)
	docker system prune -a --volumes -f
	docker volume rm $$(docker volume ls -q)
	docker network rm $$(docker network ls -q | grep -v "bridge\|host\|none")
	docker rm -f $$(docker ps -aq)


# ==================================================
# FULL RESET
# ==================================================

reset-dev:
	$(DEV_COMPOSE) down -v
	docker system prune -a --volumes -f

reset-prod:
	$(PROD_COMPOSE) down -v
	docker system prune -a --volumes -f

# ==================================================
# STATUS
# ==================================================

ps:
	docker ps

images:
	docker images

volumes:
	docker volume ls

networks:
	docker network ls