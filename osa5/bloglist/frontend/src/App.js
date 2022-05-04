import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const notify = (message, type= 'info') => {
    setNotification({ message, type })
    setTimeout( () => {
      setNotification(null)
    }, 3000)
  }

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
      notify(errorMessage,'alert')
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
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
    window.localStorage.clear()
    setUser(null)
    //window.localStorage.removeItem('loggedblogListUser')
  }

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
    blogService.setToken(user.token)
    await blogService.create(newObject)
    
    notify(`a new blog ${newObject.title} by ${newObject.author} added`)
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const postForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      
      <form onSubmit = {logoutHandler} >
        <p>{user.name} logged in
          <button type="submit"> logout</button>
        </p>
      </form>
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
      
      {blogs.map( blog =>
          <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && postForm()}
    </div>
  )
}

export default App
