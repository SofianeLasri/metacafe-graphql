FROM node:20

WORKDIR /app

COPY ./client ./client

RUN cd ./client && npm install

COPY .env ./client

WORKDIR /app/client

CMD ["npm", "run", "dev:host"]
