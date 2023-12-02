#!/usr/bin/env bash

docker build -f Scooter.Dockerfile -t glopal78/scooter-simulation:1.0 .
docker build -f User.Dockerfile -t glopal78/user-simulation:1.0 .
