import {useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import PostForm from './components/PostForm'
import Blog from './components/Blog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

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

 /*const notify = (message, type= 'info') => {
    setNotification({ message, type })
    setTimeout( () => {
      setNotification(null)
    }, 3000)
  }
*/
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
      //notify(errorMessage,'alert')
    }
  }
  const logoutHandler = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    //window.localStorage.removeItem('loggedblogListUser')
  }
  const createPost = (newObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)
    blogService.create(newObject)
  }

  const loginForm = () => (
    <div>
        <LoginForm
          username = {username}
          password = {password}
          handleNameChange = {({target}) => setUsername(target.value)}
          handlePasswordChange = {({target}) => setPassword(target.value)}
          handleLogin = {loginHandler}
        />
      </div>
  )

  const postForm = () => (
    <div>
      <h1>Blogs</h1>
      <form onSubmit = {logoutHandler} >
        <p>
          {user.name} logged in
          <button type="submit"> logout</button>
        </p>
      </form>

      <Toggle buttonLabel='new note' ref= {blogFormRef}> 
        <PostForm createPost= {createPost}/>
      </Toggle>

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
