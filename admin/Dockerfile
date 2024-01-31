FROM node:20-slim

ENV LANG C.utf8

WORKDIR /admin

COPY package*.json ./

RUN npm install

COPY . ./

ENTRYPOINT ["npm", "start"]