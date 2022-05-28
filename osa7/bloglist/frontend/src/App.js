import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import PostForm from './components/PostForm'
import Blog from './components/Blog'
import Notification from './components/notification'
import ToggleView from './components/ToggleView'
import UserTable from './components/UserTable'
import Comments from './components/Comments'
import { setMessage, removeMessage } from './reducers/NotificationReducer'
import { CreateBlog, AddLike } from './reducers/BlogReducer'
import { setUser } from './reducers/UserReducer'

const App = () => {

  const padding = {
    padding: 5
  }
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(setUser(user))
      userService.setUser(user)
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

  const LoginView = () => (
    <div>
      <Notification notification={useSelector(state => state.notifications)} />
      <LoginForm onLogin={login} />
    </div>
  )

  const PostView = () => (
    <div>
      <h2>Blog App</h2>
      <Notification notification={useSelector(state => state.notifications)} />

      <Toggle buttonLabel='create new' ref={blogFormRef}>
        <PostForm createPost={createPost} />
      </Toggle>

      {blogs.map(blog =>
        <ToggleView key={blog.id}>
          <Blog blog={blog} />
        </ToggleView>
      )}
    </div>
  )

  const UserView = () => {
    if (!user) {
      return null
    }

    return (
      <div>
        <form onSubmit={logoutHandler} >
          <h2>Blogs</h2>
          <p>{user.name} logged in </p>
          <button id='logoutBtn' type="submit"> logout</button>
        </form>
        <h1>Users</h1>
        <UserTable />
      </div>
    )
  }

  const SingleUserView = () => {
    if (!user) {
      return null
    }

    const userBlogs = blogs.filter(
      blog => blog.author === user.username)

    return (
      <div>
        <div>
          <form onSubmit={logoutHandler} >
            <h2>Blogs</h2>
            <p>{user.name} logged in </p>
            <button id='logoutBtn' type="submit"> logout</button>
          </form>
        </div>
        <div>
          <h1>{user.name}</h1>
          <h3>added blogs</h3>
          <ul>
            {userBlogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </div>
      </div>

    )
  }
  // eslint-disable-next-line no-unused-vars
  const likeBlog = (id) => {
    console.log(id)
    const object = blogs.find(b => b.id === id)
    const likedObject = {
      ...object,
      likes: (object.likes || 0) + 1,
      user: object.user.id
    }
    dispatch(AddLike(likedObject, id, user))
  }

  const BlogView = () => {
    const id = useParams().id
    const blogToShow = blogs.find(blog => blog.id === id)
    if (!blogToShow) {
      return null
    }

    return (
      <div>
        <form onSubmit={logoutHandler} >
          <h2>Blogs</h2>
          <p>{user.name} logged in </p>
          <button id='logoutBtn' type="submit"> logout</button>
        </form>
        <h1>{blogToShow.title}</h1>
        <div><a href={`${blogToShow.url}`}>{blogToShow.url}</a><br></br>
          {blogToShow.likes} likes <button onClick={() => likeBlog(blogToShow.id)}>like</button><br></br>
          added by {blogToShow.user.name}
        </div>
        <h3>Comments</h3>
        <Comments blog={blogToShow} />
      </div>
    )
  }
  const home = user
    ? <PostView />
    : <LoginView />

  return (

    <BrowserRouter>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>

        {user
          ? <em> {user.name} logged in</em>
          : <Link to="/login">login</Link>
        }

      </div>
      <Routes>
        <Route path='/' element={home} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/users' element={<UserView />} />
        <Route path="/users/:id" element={<SingleUserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App