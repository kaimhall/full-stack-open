import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const address = `${baseUrl}/comments`
  const request = axios.get(address)
  return request.then(response => response.data)
}

const create = async (newObject, id) => {
  const address = `${baseUrl}/${id}/comments`
  const response = await axios.post(
    address,
    newObject
  )
  return response.data
}
export default { getAll, create }
