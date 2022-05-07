import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async id => {
  const address = `${baseUrl}/${id}`
  const response = await axios.get(address)
  return response.data
}

export default getUser