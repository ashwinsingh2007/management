## How to setup (Easy Way)

Run with Docker

```bash
docker-compose up --build
```
## How to setup (Manual Way)

Install Postgres

```bash
docker pull postgres:latest
docker run --name postgresql -p 5432:5432  -e POSTGRES_PASSWORD=password -d postgres
```


