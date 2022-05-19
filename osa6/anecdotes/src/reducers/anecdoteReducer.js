import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action){
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const votedAnecdote = state.find( a => a.id === id)
      const newAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return ( state.map( anecdote => 
        anecdote.id !== id ? anecdote: newAnecdote )
        .sort((a,b) => b.votes - a.votes))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const {addAnecdote, addVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer