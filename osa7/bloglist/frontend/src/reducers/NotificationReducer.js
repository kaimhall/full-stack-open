/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, payload) {
      return null
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export default notificationSlice.reducer