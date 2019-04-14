FROM node:11-alpine as builder

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache --virtual .gyp python make g++

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

FROM node:11-alpine

## Add metadata
LABEL version=1.0
LABEL maintainer="Omar Doma"

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder node_modules node_modules

RUN npm i -g pm2

## Add application code
COPY . .

## Allows port 3000 to be publicly available
EXPOSE 3000

## Run the server
CMD ["npm", "run", "start:prod"]