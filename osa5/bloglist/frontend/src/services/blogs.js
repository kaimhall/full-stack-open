import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const remove = async (id) => {
  const address = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(
    address,
    config
  )
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(
    baseUrl,
    newObject,
    config
  )
  return response.data
}

const update = async (newObject, id) => {
  const address = `${baseUrl}/${id}`

  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(
    address,
    newObject,
    config
  )
  return response.data
}

export default { getAll, create, update, setToken, remove }