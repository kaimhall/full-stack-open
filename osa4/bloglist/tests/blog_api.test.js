const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initBlogs = require('./test_helper').blog
const blogsInDB = require('./test_helper').blogsInDb
const _ = require('lodash')

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
describe('server functionality', () => {

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

  test('a blog can be deleted', async () => {
    const startBlogs = await blogsInDB()
    const toDelete = startBlogs[0]
    
    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(204)

    const endBlogs = await blogsInDB()
    expect(endBlogs).toHaveLength(
      initBlogs.length - 1
    )
    const title = endBlogs.map((blog) => blog.title)
    expect(title).not.toContain(toDelete.title)
  })

  test('likes have no value', async () => {
    const newBlog = {
      title: 'find this one',
      author: 'kai m. hall',
      url: 'www.not.going.to happen'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const endBlogs = await blogsInDB()
    expect(_.find(endBlogs, ['title','find this one']).likes).toBe(0)
    
  })
})

afterAll(() => {
  mongoose.connection.close()
})