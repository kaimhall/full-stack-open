const postForm = () => (
  <div>
    <h2>create new</h2>
    <form onsubmit = {postHandler}>
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
        onChange = {({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        url:
        <input 
        type= 'text'
        value= {url}
        name = 'url'
        onChange = {({target}) => setTitle(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)
const loginForm = () => (
  <div>
    <h2>Log in to application</h2>
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
