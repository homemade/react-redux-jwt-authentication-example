# Raisely react-redux-jwt-authentication-example

Raisely React + Redux - JWT Authentication Tutorial & Example

## Local Development Pre-requisites

Docker (a running docker daemon / service version 1.9 or above)

Docker Compose

### 1. Set env vars

WEB_PORT - Set to 443 for https access

ORGANISATION_UUID - Raisely Organisation UUID

CAMPAIGN_UUID - Raisely Campaign UUID

NOTE: [Docker compose supports `.env` files](https://docs.docker.com/compose/env-file/)

### 2. Docker compose

Run `docker-compose up` from this directory.

This will start the `ri-ri` docker container with Node etc installed.

### 3. Connecting to the container

In a new terminal window connect to the container:

`docker exec -it ri-ri /bin/bash`

### 4. Installing dependencies

`yarn install`

If additional installation steps are required an additional README.md will be included in the sample's directory

### 5. Running the example

`npm start`
