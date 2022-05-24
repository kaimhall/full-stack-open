import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const url = baseUrl

  useEffect(() => {
    axios.get(url)
    .then(initialResources => {
      setResources(initialResources.data)
    })
  },[url])

  const create = async (resource) => {
    const response = await axios.post(url, resource)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}
