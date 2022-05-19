import { createSlice } from "@reduxjs/toolkit"
import { addTimeOut } from "./timeReducer"

const notificationSlice = createSlice({
  name: 'messages',
  initialState:'',
  reducers: {
    createMessage(state, action) {
        return action.payload
    },
    removeMessage(state, action) {
      return action.payload
    } 
  } 
})

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(createMessage(content))
    const timeId = setTimeout( () => {
      dispatch(removeMessage(''))
    }, time * 1000)
    dispatch(addTimeOut(timeId))
  } 
}

export const {createMessage, removeMessage, voteMessage} = notificationSlice.actions
export default notificationSlice.reducer