# ./pesto/api/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8000
CMD yarn migrate && yarn dev

