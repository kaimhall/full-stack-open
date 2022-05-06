import { useState } from 'react'

const ToggleView = ({children}) => {
  const {title, author, url, likes, user} = children.props.blog
  const [blogView, setBlogView] = useState('hide')

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }  
  
  const viewBlog = () => {
    setBlogView('view')
  }
  
  const hideBlog = () => {
    setBlogView('hide')
  }

  if (blogView === 'hide') {
    return (
      <div style={blogStyle}>
        {title} {author} <button onClick = {viewBlog}>view</button>
      </div>
    )
  }
  else if (blogView === 'view'){
    return (
      <div style={blogStyle}>
         {title} {author} <button  onClick = {hideBlog}>hide</button> <br></br>
         {url}<br></br>
         {likes} <button>like</button> <br></br>
         {user.name}
      </div>
  )}
} 
export default ToggleView