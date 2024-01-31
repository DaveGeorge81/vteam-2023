FROM node:20-slim

ENV LANG C.utf8
ENV TZ Europe/Stockholm
ENV NODE_ENV production

WORKDIR /bike-sim

COPY package*.json ./

RUN npm install

# The .dockerignore file prevents copying of node_modules/, db/ and others
COPY . ./

ENTRYPOINT ["node", "app.js"]

