import { useState } from 'react'
import { useSelector } from 'react-redux'


const LoginForm = ({ onLogin }) => {
  useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='text'
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id='loginBtn' type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm