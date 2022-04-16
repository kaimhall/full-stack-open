/* eslint-disable no-unused-vars */
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
} 