/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const viewSlice = createSlice({
  name: 'view',
  initialState: 'hide',
  reducers: {
    showView(state, action) {
      return 'view'
    },
    hideView(state, action) {
      return 'hide'
    }
  }
})

export const { showView, hideView } = viewSlice.actions
export default viewSlice.reducers