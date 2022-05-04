const blogForm = () => (
  <div>
      <h2>blogs</h2>
      <form onSubmit = {logoutHandler} >
        <p>{user.name} logged in
          <button type="submit"> logout</button>
        </p>
      </form>

      {blogs.map( blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
)