import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'


const LoginForm = ({ onLogin }) => {
  useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

  const Input = styled.input`
  margin: 0.25em;
`

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
          <Input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <Input
            type='text'
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <Button id='loginBtn' type="submit">login</Button>
      </form>
    </div>
  )
}
export default LoginForm