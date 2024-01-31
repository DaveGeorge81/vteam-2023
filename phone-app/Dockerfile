FROM node:20

RUN mkdir -p /phone-app
WORKDIR /phone-app

COPY /phone-app/package*.json /phone-app/

EXPOSE 8081
EXPOSE 8082
EXPOSE 8083

RUN mkdir -p /sdk

ENV ANDROID_HOME /sdk
# RUN npm install && npm i @expo/ngrok@^4.1.0
RUN npm install

# RUN apt-get update && apt-get -y install android-tools-adb

CMD [ "npx", "expo", "start" ]
