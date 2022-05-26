import axios from 'axios'
const baseUrl = '/api/users'

const setUser = (user) => {
  window.localStorage.setItem(
    'loggedBloglistUser', JSON.stringify(user)
  )
}

const getUser = async id => {
  const address = `${baseUrl}/${id}`
  const response = await axios.get(address)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getUser, getAll, setUser }