/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const byLikes = (b1, b2) => b2.likes > b1.likes ? 1 : -1

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload].sort(byLikes)

    }
  }
})

export const { addLike, setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer