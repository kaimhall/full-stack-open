import { createSlice } from "@reduxjs/toolkit"

const timeSlice = createSlice({
  name: 'times',
  initialState:'',
  reducers: {
    addTimeOut(state, action){
      clearTimeout(state)
      return action.payload
    }
  }
})
export const {addTimeOut} = timeSlice.actions
export default timeSlice.reducer
