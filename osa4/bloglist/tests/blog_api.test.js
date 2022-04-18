const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initBlogs = require('./test_helper').blog
const blogsInDB = require('./test_helper').blogsInDb

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initBlogs)
})
describe('response is correct', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there is right amount of blogs', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(initBlogs.length)
  })
  test('identifying field is id', async ()=> {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })
})
describe('server functionality works', () => { 
  
  test('a blog can be added', async () => {  
    const newBlog = {
      title: 'postRouter module handles routes for app',
      author: 'kai',
      url: 'www.hardto.get',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const endBlogs = await blogsInDB()
    expect(endBlogs).toHaveLength(initBlogs.length + 1)

    const content = endBlogs.map((blog) => blog.title)
    expect(content).toContain('postRouter module handles routes for app') 
  })
})

afterAll(() => {
  mongoose.connection.close()
})