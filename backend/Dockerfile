FROM node:20-slim

RUN mkdir -p /server
WORKDIR /server


COPY ./backend/package*.json /server/

RUN npm install

# The .dockerignore file prevents copying of node_modules/ and db/
COPY ./backend /server

EXPOSE 1337


ENV LANG C.utf8
ENV TZ Europe/Stockholm

# ENTRYPOINT ["node", "server.js"]

# Using npm to start the server will cause it not to receive stop signals
#ENTRYPOINT ["npm", "start"]

