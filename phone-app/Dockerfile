FROM node:18

RUN mkdir -p /phone-app
WORKDIR /phone-app

COPY package*.json /phone-app/

EXPOSE 8081
EXPOSE 8082
EXPOSE 8083

RUN npm install && npm install -g expo-cli && npm i @expo/ngrok@^4.1.0

RUN apt-get update && apt-get -y install android-tools-adb

CMD [ "npx", "expo", "start" ]
