import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import PostForm from './components/PostForm'
import Blog from './components/Blog'
import Notification from './components/notification'
import ToggleView from './components/ToggleView'
import blogService from './services/blogs'
import loginService from './services/login'
import { setMessage, removeMessage } from './reducers/NotificationReducer'
import { InitBlogs, CreateBlog, RemoveBlog, AddLike } from './reducers/BlogReducer'
import { setUser } from './reducers/UserReducer'
import { useSelector, useDispatch } from 'react-redux'
import UserTable from './components/UserTable'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitBlogs())
  }, [dispatch])

  useEffect(() => {
    const logUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (logUserJSON) {
      const user = JSON.parse(logUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(setUser(user))
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      notify(`${user.name} logged in!`)
    } catch (err) { notify('wrong username/password', 'alert') }
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setUser(null))
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
    dispatch(CreateBlog(newObject, user))
    notify(`a new blog ${newObject.title} by ${newObject.author} added`)
  }

  const addLike = async (newObject, id) => {
    dispatch(AddLike(newObject, id, user))
  }

  const deletePost = async (id) => {
    dispatch(RemoveBlog(id, user))
  }

  const LoginView = () => (
    <div>
      <Notification notification={useSelector(state => state.notifications)} />
      <LoginForm onLogin={login} />
    </div>
  )

  const PostView = () => (
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

  const UserView = () => {
    return (
      <div>
        <form onSubmit={logoutHandler} >
          <h1>Blogs</h1>
          <p> logged in </p>
          <button id='logoutBtn' type="submit"> logout</button>
        </form>
        <h1>Users</h1>
        <UserTable />
      </div>
    )
  }
  const home = user === null ? <LoginView /> : <PostView />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={home} />
        <Route path='/users' element={<UserView />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App