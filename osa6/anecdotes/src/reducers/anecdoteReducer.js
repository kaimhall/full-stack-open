
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      return ( state.map( anecdote => 
        anecdote.id !== id ? anecdote: action.payload )
        .sort( (a,b) => b.votes - a.votes))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})
export const {setAnecdotes, appendAnecdote, updateAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = item => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateAnecdote(item)
    dispatch(updateAnecdote(votedAnecdote))
  } 
}

export default anecdoteSlice.reducer