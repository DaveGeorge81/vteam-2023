#!/usr/bin/env bash

docker build -f Scooter.Dockerfile -t glopal78/scooter-simulation:latest .
docker build -f User.Dockerfile -t glopal78/user-simulation:latest .
