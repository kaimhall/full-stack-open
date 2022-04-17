const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initBlogs = require('./test_helper').blog

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is right amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})