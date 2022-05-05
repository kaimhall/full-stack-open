import { useState } from "react"

const PostForm = ({createPost}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const postHandler = async (event) => {
    event.preventDefault()
    setTitle(title)
    setAuthor(author)
    setUrl(url)
    
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    createPost(newObject)
    
    setTitle('')
    setAuthor('')
    setUrl('')
    //notify(`a new blog ${newObject.title} by ${newObject.author} added`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {postHandler}>
        <div>
          title:
          <input 
          type= 'text'
          value= {title}
          name = 'title'
          onChange = {({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input 
          type= 'text'
          value= {author}
          name = 'author'
          onChange = {({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
          type= 'text'
          value= {url}
          name = 'url'
          onChange = {({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      </div>
    )}

  export default PostForm