const jwt = require('jsonwebtoken')
const postRouter = require('express').Router() //import router..
const Blog = require('../models/blog') // and mongoose model..
const User = require('../models/user') //and user model

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

postRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

postRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url:body.url,
    user: user._id
  })
  
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }
  catch( exception) {
    response.status(400)
    next(exception)
  }
})

postRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = 
    await Blog.findByIdAndUpdate(request.params.id, blog,{ new: true})
  response.json(updatedBlog)
})

postRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
module.exports = postRouter