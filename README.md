# Two ways to setup this project

# 1. Setup (Docker Way)

## Run with Docker

```bash
docker-compose up --build
```
This will download postgres, resolve dependecies of api and web folder and will start postgres, web next server, api express server
```
Navigate to localhost:3000
```

# 2. Setup (Manual Way)

### Requirements
```
node version 18
postgres
```


## 1. Install Postgres

```bash
docker pull postgres:latest
docker run --name postgresql -p 5432:5432  -e POSTGRES_PASSWORD=password -d postgres
```

## 2. Setup Web

```bash
1. cd web
2. yarn install
3. yarn dev
```

## 3. Setup Api

```bash
1. cd api
2. yarn install
3. Change SQL_DATABASE_NAME value to 127.0.0.1 in .env of api folder
4. yarn migrate-sequilize
5. yarn dev
```

## 4. Last
```
Navigate to localhost:3000
```


