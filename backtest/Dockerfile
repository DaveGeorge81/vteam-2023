FROM node:alpine

RUN mkdir -p /backtest
WORKDIR /backtest

COPY ./backtest/package*.json /backtest/
RUN npm install
