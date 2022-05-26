import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import PostForm from './components/PostForm'
import Blog from './components/Blog'
import Notification from './components/notification'
import ToggleView from './components/ToggleView'

import { setMessage, removeMessage } from './reducers/NotificationReducer'
import { setBlogs, appendBlog, likeBlog, deleteBlog } from './reducers/BlogReducer'
import { setUser } from './reducers/UserReducer'
import { useSelector, useDispatch } from 'react-redux'



const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)

  const dispatch = useDispatch()
  const byLikes = (b1, b2) => b2.likes > b1.likes ? 1 : -1

  useEffect(() => {
    blogService
      .getAll().then(blogs => blogs.sort(byLikes))
      .then(blogs => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const logUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (logUserJSON) {
      const user = JSON.parse(logUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

      await setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const notify = (message, type = 'info') => {
    const content = { message, type }
    dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 3000)
  }

  const createPost = async (newObject) => {
    await blogFormRef.current.toggleVisibility()
    await blogService.setToken(user.token)
    const newBlog = await blogService.create(newObject)
    dispatch(appendBlog(newBlog))
    notify(`a new blog ${newObject.title} by ${newObject.author} added`)
  }

  const addLike = async (newObject, id) => {
    await blogService.setToken(user.token)
    const newBlog = await blogService.update(newObject, id)
    dispatch(likeBlog(newBlog))
  }

  const deletePost = async (id) => {
    await blogService.setToken(user.token)
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }

  const loginForm = () => (
    <div>
      <Notification
        notification={useSelector(state => state.notifications)}
      />
      <LoginForm
        username={username}
        password={password}
        handleNameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={loginHandler}
      />
    </div>
  )

  const postForm = () => (
    <div>
      <h1>Blogs</h1>
      <Notification
        notification={useSelector(state => state.notifications)}
      />
      <form onSubmit={logoutHandler} >
        <p>
          {user.name} logged in
          <button id='logoutBtn' type="submit"> logout</button>
        </p>
      </form>

      <Toggle buttonLabel='create' ref={blogFormRef}>
        <PostForm createPost={createPost} />
      </Toggle>

      {blogs.map(blog =>
        <ToggleView key={blog.id} addLike={addLike} deletePost={deletePost}>
          <Blog blog={blog} />
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