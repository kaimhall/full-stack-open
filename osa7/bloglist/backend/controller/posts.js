//const jwt = require('jsonwebtoken')
//const User = require('../models/user')

const postRouter = require('express').Router() //import router..
const Blog = require('../models/blog') // and mongoose model..


postRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({})
    .find({}).populate('user', '-blogs')

  response.json(blog)
})

postRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user
  const blog = new Blog({ ...request.body, user: user })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  return response.status(201).json(savedBlog)
})

postRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )

  response.json(updatedBlog)
})

postRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

postRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

module.exports = postRouter