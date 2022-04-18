/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { maxBy } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length === 0
    ? 1
    : 1
}

const totalLikes = (likes) => {
  if (likes.length === 0) {
    return 0
  }
  const reducer = (prev, curr) => prev + curr
  return likes.reduce(reducer, 0)/ likes.length
}

const favoriteBlog = (blogs) => {
  const getMax = (x,y) => {
    return x >= y ? x : y 
  }
  const max = blogs
    .map((elem) => elem.likes)
    .reduce(getMax, -Infinity)
  
  const match = blogs
    .filter((elem) => elem.likes == max)
    .map(({_id, url, __v, ...rest}) => rest)
  
  return match[0]
}

const mostBlogs = (blog) => {
  const authors = _.countBy(blog.map((o) => o.author))
  author_list = _.map(authors, function (k, v) {return { 'author':v, 'blogs':k}
  })
  return _.maxBy(author_list, 'blogs')
}

const mostLikes = (blog) => {
  const author_likes = 
  _.chain(blog)
    .groupBy('author') // list common writers
    .map((obj, key) => ({'author': key, 'likes': _.sumBy(obj, 'likes')})).value()
  return maxBy(author_likes, 'likes')


}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} 