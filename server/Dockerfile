FROM node:20

WORKDIR /app

COPY ./server ./server

RUN cd ./server && npm install

COPY .env ./server

WORKDIR /app/server

CMD ["npm", "run", "dev"]