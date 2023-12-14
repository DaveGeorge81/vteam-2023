FROM node:latest

RUN mkdir -p /scooter

WORKDIR /scooter

COPY package*.json ./

RUN npm install

# The .dockerignore file prevents copying of node_modules/ and db/
COPY . ./

EXPOSE 1337

CMD ["npm", "run", "start-hive"]
