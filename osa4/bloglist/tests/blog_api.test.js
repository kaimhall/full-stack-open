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
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.      eyJ1c2VybmFtZSI6InRlc3RfdXNyIiwiaWQiOiI2MjYwMTcyOGE4NTUzOTg0MmU3MmUyYTAiLCJpYXQiOjE2NTA0NjQ2MDR9.0_rx3JIa9wK7A1sVCqbug8FmrnHhcFTLi3Uf0XUp_y8'

  test('a blog can be added', async () => {  
    const newBlog = {
      title: 'postRouter module handles routes for app',
      author: 'kai',
      url: 'www.hardto.get',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
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
      url: 'www.not.goingto.happen'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const endBlogs = await blogsInDB()
    expect(_.find(endBlogs, ['title','find this one']).likes).toBe(0) 
  })

  test('can not add invalid blog', async () => {
    const newBlog = {
      author: 'kai m. hall',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('can update note', async () => {
    
    const updatedBlog = {
      title: 'Test tryouts',
      author: 'Kai Mikael',
      url: 'https://notsogood.atthis/',
      likes: 1
    }

    const startBlogs = await blogsInDB()
    const toUpdate = startBlogs[0]

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const endBlogs = await blogsInDB()
    expect(endBlogs[0]).not.toEqual(startBlogs[0])
    expect(_.find(endBlogs, ['title','Test tryouts'])).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})