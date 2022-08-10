FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80

ENTRYPOINT ["node", "server.js"]