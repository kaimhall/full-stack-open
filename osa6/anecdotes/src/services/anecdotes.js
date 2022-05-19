/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const obj = {content, votes: 0}
  const response = await axios.post(baseUrl, obj)
  return response.data
}
const updateAnecdote = async (item) => {
  const url = `${baseUrl}/${item.id}`
  const changedAnecdote = {
    ...item, 
    votes: item.votes + 1}
  const response = await axios.put(url, changedAnecdote)
  return response.data
}

export default {
  getAll,
  createNew,
  updateAnecdote
}