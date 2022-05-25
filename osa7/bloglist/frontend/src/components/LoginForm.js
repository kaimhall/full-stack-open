const LoginForm = ({
  handleNameChange,
  handlePasswordChange,
  username,
  password,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleNameChange}
            id= 'username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            id= 'password'
          />
        </div>
        <button id ='loginBtn' type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm