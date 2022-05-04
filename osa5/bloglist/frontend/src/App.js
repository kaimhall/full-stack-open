import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const logUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (logUserJSON) {
      const user = JSON.parse(logUserJSON)
      setUser(user)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token) 

      setUser(user)
        setUsername('')
        setPassword('') 
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout( () => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginHandler}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedblogListUser')
    setUser(null)
    window.localStorage.clear()
  }

  const blogForm = () => (
    <div>
        <h2>blogs</h2>

        <form onSubmit = {logoutHandler} >
          <p>{user.name} logged in
            <button type="submit"> logout</button>
          </p>
        </form>

        {blogs.map( blog =>
          <Blog key={blog.id} blog={blog} />
        )}

    </div>
  )

  const postHandler = (event) => {
    event.preventDefault()
    setTitle(title)
    setAuthor(author)
    setUrl(url)
    
    const newObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }
    blogService.setToken(user.token)
    blogService.create(newObject)
  }

  const postForm = () => (
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
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
      {user !== null && postForm()}
    </div>
  )
}

export default App
