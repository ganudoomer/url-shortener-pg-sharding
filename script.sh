docker run --name pgshard1 -p 5432:5432 -d pgshard
docker run --name pgshard2 -p 5433:5432 -d pgshard
docker run --name pgshard3 -p 5434:5432 -d pgshard
docker run -p 5555:80 --name pgadmin -e PGADMIN_DEFAULT_EMAIL="ganu@gamil.com" -e PGADMIN_DEFAULT_PASSWORD="password" dpage/pgadmin4