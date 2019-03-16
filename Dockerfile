FROM node:11

## Add metadata
LABEL version=1.0
LABEL maintainer="Omar Doma"

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/

RUN npm set progress=false && npm cache clean --force
RUN npm i --quiet
RUN npm i -g pm2 --quiet

## Add application code
COPY . /app

## Allows port 3000 to be publicly available
EXPOSE 3000

## Run the server
CMD ["npm", "run", "start:prod"]