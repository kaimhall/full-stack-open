
const Blog = ({blog}) => {

  return(
    <div >
      {blog.title} {blog.author} <br></br>
      {blog.url} <br></br>
      likes {blog.likes} <br></br>
      {blog.user.name}
    </div>  
  )
}
export default Blog