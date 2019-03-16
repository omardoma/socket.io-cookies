# socket.io-cookies

A simple Socket.io echo server for illustrating how to use cookies with Socket.io.

## Technology

- Node.js v8+
- Express.js v4
- Socket.io v2
- Docker

## Notes For Successfull Running

- You have to plug in a .env file of your own configuration (API Keys, Secret Keys and etc) in the root project folder.

- Sample .env file:

  ```
  SECRET=averystrongsecretkey
  ```

## How to run manually

1. Clone the repo
2. `npm i`
3. - Development:
     - `npm start`
   - Production:
     1. `npm i -g pm2`
     2. `NODE_ENV=production pm2 start index.js`
4. Navigate to `http://localhost:3000` in your favorite browser

## How to run with docker

1. Clone the repo.
2. - Development: `docker-compose -f docker-compose.dev.yml up`
   - Production: `docker-compose -f docker-compose.yml up -d`
3. Navigate to `http://localhost:3000` in your favorite browser

&#9400; Omar Doma 2019
