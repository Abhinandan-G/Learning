'use strict';

require('dotenv').config();

const {configureRoutes } = require("./routes/routeConfigs");
const Hapi = require('hapi');


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
  });
  const main = async () => {
    await configureRoutes(server)
    await server.start()
  
    return server
  }
  
  main().then(server => {
    console.log('Server running at:', server.info.uri)
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })