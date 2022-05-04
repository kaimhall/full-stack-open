// only stuff required for server functionality 
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const postRouter = require('./controller/posts.js')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const userExtractor = middleware.userExtractor
const errorHandler = middleware.errorHandler

//try and connect. catch if you can.
logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', userExtractor, postRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(errorHandler)

module.exports = app
