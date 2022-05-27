const Blog = ({ blog }) => {

  return (
    <div key={blog.id}>
      {blog.title} {blog.author} <br></br>
      {blog.url} <br></br>
      likes {blog.likes} <br></br>
      {blog.user.name}
    </div>
  )
}
export default Blog