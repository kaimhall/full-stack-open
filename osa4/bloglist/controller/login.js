const jwt = require('jsonwebtoken') //token creator
const bcrypt = require('bcrypt') //crypt
const loginRouter = require('express').Router() //router for login
const User = require('../models/user') //usermodel

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username }) //check user db for name
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) 

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter