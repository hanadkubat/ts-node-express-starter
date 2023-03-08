# Node - Express - Typescript starter

## What is this repository for?

- The repository contains the code for the Node/Express/Typescript backend starter.
- Version: ***1.0.0***
- Author: Hanad Kubat

## How do I get set up?

- Prerequisites:
  1. Node 16+ LTS
  2. yarn
  3. Docker 20.10 (make sure the service is running)

- Summary of set up (Make sure you are in the root folder)

  ```bash
  cp example.env .env ## update .env with correct settings.
  yarn install
  sudo docker-compose up -d
  yarn debug
  ```

## DB

- RUN DOCKER MONGODB: ```sudo docker-compose up -d```
- TERMINATE DOCKER MONGODB: ```sudo docker-compose down```
