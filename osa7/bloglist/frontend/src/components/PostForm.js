import { useState } from 'react'
import PropTypes from 'prop-types'

const PostForm = ({ createPost }) => {

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
  }

  return (
    <div className='blogDiv'>
      <h2>create new</h2>
      <form onSubmit={postHandler}>
        <div>
          title:
          <input
            id='blogtitle'
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}

          />
        </div>
        <div>
          author:
          <input
            id='blogauthor'
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='blogurl'
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='blogcreate' type="submit">create</button>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}
export default PostForm