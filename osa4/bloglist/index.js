const app = require('./App') //import express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app) // create server from app

//define servers port
server.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`)
})
