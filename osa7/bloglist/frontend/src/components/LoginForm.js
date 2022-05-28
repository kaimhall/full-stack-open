import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
  useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
    navigate('/blogs')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default LoginForm