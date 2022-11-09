FROM node:16-alpine

RUN mkdir ./app

COPY ./dist ./app
COPY package.json ./app
COPY .env ./app
COPY yarn.lock ./app

WORKDIR ./app

RUN yarn install

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]