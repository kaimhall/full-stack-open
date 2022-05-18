import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    createMessage:{
      reducer: (state, action) => {
        return action.payload
      },
      prepare: (message) => ({
        payload: `you added '${message}'`
      })
    },
    voteMessage:{
      reducer: (state, action) => {
        return action.payload
      },
      prepare: (message) => ({
        payload: `you voted '${message}'`
      })
    },
    removeMessage(state, action){
      return action.payload
    } 
  } 
})
export const {createMessage, removeMessage, voteMessage} = notificationSlice.actions
export default notificationSlice.reducer