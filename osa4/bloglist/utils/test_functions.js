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

module.exports = {
  dummy,
  totalLikes
} 