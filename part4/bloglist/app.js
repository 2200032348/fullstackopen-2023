const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDb')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDb', err.message)
  })


app.use(cors())
app.use(express.json())
//app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', middleware.tokenExtractor, loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports =app
