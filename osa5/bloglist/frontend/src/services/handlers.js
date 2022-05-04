const loginHandler = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    ) 
    setUser(user)
      setUsername('')
      setPassword('') 
  } catch (exception) {
    setErrorMessage('wrong username or password')
    setTimeout( () => {
      setErrorMessage(null)
    }, 2000)
  }
}

