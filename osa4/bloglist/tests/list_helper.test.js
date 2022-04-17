const listHelper = require('../utils/test_functions')
const blog = require('./test_helper').blog

test('dummy returns 1', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  
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

describe('favoriteBlog', () => {
  const fav = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }
  test('if most favorite blog is detected', () => {
    const result = listHelper.favoriteBlog(blog)
    expect(result).toEqual(fav)
  })
})