import { Link } from 'react-router-dom'

const ToggleView = ({ children }) => {
  const { title, author, id } = children.props.blog

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div key={id} style={blogStyle} className='blogViewContent'>
      <Link to={`/blogs/${id}`}>{title} {author}</Link> <br></br>
    </div>
  )
}

export default ToggleView