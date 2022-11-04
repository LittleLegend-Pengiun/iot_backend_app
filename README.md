# IoT Web App

## Description

A fullstack project deployed with Docker.

## Requirements

You need to install [Docker](https://docs.docker.com/desktop/install/windows-install/) to build and run this app.

## Installation

For the first build
```
docker-compose --file docker-compose-dev.yaml up --build
```

For re-build the app
```
docker-compose --file docker-compose-dev.yaml down --volumes
docker-compose --file docker-compose-dev.yaml up --build
```
Note: Run each command one after the other.

## Running the app

After the installation complete, the backend server is available in port 8080.

## Adafruit Dashboard

https://io.adafruit.com/Tez0106/public