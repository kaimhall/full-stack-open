const app = require('./App')
const http = require('http')
const config = require('./utils/config') //import key
const logger = require('./utils/logger') // import logs

const server = http.createServer(app) //create server from app

// get port from config
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})