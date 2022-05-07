import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import PostForm from './components/PostForm'
import Blog from './components/Blog'
import Notification from './components/notification'
import ToggleView from './components/ToggleView'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => {
        return  b.likes - a.likes
      })
      setBlogs( blogs )
    }

    )
  }, [])

  useEffect(() => {
    const logUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (logUserJSON) {
      const user = JSON.parse(logUserJSON)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

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
    }
    catch (exception) {
      setErrorMessage('wrong username or password')
      notify( errorMessage, 'alert')
    }
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    //window.localStorage.removeItem('loggedblogListUser')
  }

  const notify = (message, type= 'info') => {
    setNotification({ message, type })
    setTimeout( () => {
      setNotification(null)
    }, 3000)
  }

  const createPost = async (newObject) => {
    await blogFormRef.current.toggleVisibility()
    await blogService.setToken(user.token)
    await blogService.create(newObject)

    notify(`a new blog ${newObject.title} by ${newObject.author} added`)
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => {
      return  b.likes - a.likes
    })
    setBlogs(blogs)
  }

  const addLike = async (newObject, id) => {
    await blogService.setToken(user.token)
    await blogService.update(newObject, id)

    const blogs = await blogService.getAll()
    blogs.sort((a,b) => {
      return  b.likes - a.likes
    })
    setBlogs( blogs )
  }

  const deletePost = async (id) => {
    await blogService.setToken(user.token)
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => {
      return  b.likes - a.likes
    })
    setBlogs( blogs )
  }

  const loginForm = () => (
    <div>
      <Notification notification= {notification} />
      <LoginForm
        username = {username}
        password = {password}
        handleNameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword(target.value)}
        handleLogin = {loginHandler}
      />
    </div>
  )

  const postForm = () => (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <form onSubmit = {logoutHandler} >
        <p>
          {user.name} logged in
          <button type="submit"> logout</button>
        </p>
      </form>

      <Toggle buttonLabel='create' ref= {blogFormRef}>
        <PostForm createPost= {createPost}/>
      </Toggle>

      {blogs.map( blog =>
        <ToggleView key= {blog.id} addLike={addLike} loggedUser={user} deletePost={deletePost}>
          <Blog blog={blog}/>
        </ToggleView>
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
