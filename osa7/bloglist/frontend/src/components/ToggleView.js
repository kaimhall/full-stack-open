import { useState } from 'react'
import ToggleBtn from './ToggleBtn'

const ToggleView = ({ children, addLike, deletePost }) => {
  const { title, author, url, likes, user, id } = children.props.blog
  const [blogView, setBlogView] = useState('hide')

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const viewBlog = () => {
    setBlogView('view')
  }

  const hideBlog = () => {
    setBlogView('hide')
  }

  const createLike = () => {
    const newObject = {
      user: user.id,
      likes: likes + 1,
      author: author,
      title: title,
      url: url
    }
    addLike(newObject, id)
  }

  const removePost = () => {
    if (window.confirm(`remove blog ${title} by ${author}`)) {
      deletePost(id)
    }
  }

  if (blogView === 'hide') {
    return (
      <div key={id} style={blogStyle} className='blogHideContent'>
        {title} {author} <button onClick={viewBlog}>view</button>
      </div>
    )
  }
  else if (blogView === 'view') {
    return (
      <div key={id} style={blogStyle} className='blogViewContent'>
        {title} {author} <button onClick={hideBlog}>hide</button> <br></br>
        {url}<br></br>
        {likes} <button onClick={createLike}>like</button> <br></br>

        <ToggleBtn user={user.name}>
          <button onClick={removePost} >delete</button>
        </ToggleBtn>
      </div>
    )
  }
}

export default ToggleView