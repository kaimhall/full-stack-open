const jwt = require('jsonwebtoken')
const postRouter = require('express').Router() //import router..
const Blog = require('../models/blog') // and mongoose model..

postRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', '-blogs')
  response.json(blog)
})

postRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log(request.user)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url:body.url,
    user: user._id
  })
  console.log(blog)

  try {
    const savedBlog = await blog.save()
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
  const blogWriter = await Blog.findById(request.params.id)
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  if(user.id.toString() === blogWriter.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  
})

postRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

module.exports = postRouter