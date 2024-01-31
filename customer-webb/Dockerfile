FROM node:20

RUN mkdir -p /customer-webb
WORKDIR /customer-webb

COPY /customer-webb/package*.json /customer-webb/

RUN npm install

CMD [ "npx", "next", "dev" ]