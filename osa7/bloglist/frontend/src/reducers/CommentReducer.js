import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
      return state
    }
  }
})

export const { setComments, appendComment } = commentSlice.actions

export const InitComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch(setComments(comments))
  }
}

export const CreateComment = (newObject, blogId) => {
  return async dispatch => {
    await commentService.create(newObject, blogId)
    dispatch(appendComment(newObject))
  }
}
export default commentSlice.reducer