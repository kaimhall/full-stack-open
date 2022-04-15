// only stuff required for server functionality 
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const postRouter = require('./controller/posts.js')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

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
app.use('/api/blogs', postRouter)

module.exports = app
