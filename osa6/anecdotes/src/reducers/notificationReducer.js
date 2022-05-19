import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    createMessage(state, action) {
        return action.payload
    },
    removeMessage(state, action) {
      return action.payload
    } 
  } 
})
export const {createMessage, removeMessage, voteMessage} = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(createMessage(content))
    setTimeout( () => {
      dispatch(removeMessage(''))
    }, time * 1000)
  } 
}

export default notificationSlice.reducer