const postRouter = require('express').Router() //import router..
const Blog = require('../models/blog') // and mongoose model.

postRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

postRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

postRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
module.exports = postRouter