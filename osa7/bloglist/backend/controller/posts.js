//const jwt = require('jsonwebtoken')
const User = require('../models/user')

const postRouter = require('express').Router() //import router..
const Blog = require('../models/blog') // and mongoose model..
const Comment = require('../models/comment')

postRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comment', { comment: 1 })


  response.json(blog)
})

postRouter.get('/comments', async (request, response) => {
  const commentList = await Comment
    .find({})
    .populate('blog', { title: 1, id: 1 })
  response.json(commentList)
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

postRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blog = await Blog.findById(request.params.id)

  const newComment = new Comment({
    comment: comment,
    blog: blog._id
  })

  const savedComment = await newComment.save()
  blog.comment = blog.comment.concat(savedComment._id)
  await blog.save()
  return response.status(201).json(savedComment)
})

postRouter.put('/:id', async (request, response) => {
  const blog = request.body
  console.log(request.params.id)
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
postRouter.delete('/delete', async (request, response) => {
  await Comment.deleteMany({})
  response.status(204).end()
})

module.exports = postRouter