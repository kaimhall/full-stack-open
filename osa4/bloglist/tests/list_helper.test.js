const listHelper = require('../utils/test_functions')
const blog = require('./test_helper').blog

describe('dummy', () => {
  
  test('dummy returns 1', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
  })
})

describe('likes', () => {
  
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  
  test('one blog results in avg equal to likes', () =>  { 
    const result = listHelper.totalLikes( [blog[0]].map((item) => item.likes))
    expect(result).toBe(7)
  })
  
  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blog
      .map((item) => item.likes))
    expect(result).toBe(6)
  })
})

describe('advanced tests', () => {
  
  const favorite_blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }
  test('most favorite blog is detected', () => {
    const result = listHelper.favoriteBlog(blog)
    expect(result).toEqual(favorite_blog)
  })
  
  const most_blogs = {
    author: 'Robert C. Martin',
    blogs: 3
  }
  test('most blogs detected', () => {
    const result = listHelper.mostBlogs(blog)
    expect(result).toEqual(most_blogs)
  })
  const favorite_author = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }
  test('most liked author', () => {
    const result = listHelper.mostLikes(blog)
    expect(result).toEqual(favorite_author)
  })
})