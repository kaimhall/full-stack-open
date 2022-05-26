import { createSlice } from '@reduxjs/toolkit'
import UserService from '../services/users'

const userListSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserList(state, action) {
      return action.payload
    }
  }
})
export const { setUserList } = userListSlice.actions

export const InitUserList = () => {
  return async dispatch => {
    const userList = await UserService.getAll()
    dispatch(setUserList(userList))
  }
}
export default userListSlice.reducer