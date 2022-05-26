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
      state.push(action.payload)
      state.sort(byLikes)
      return state
    },
    likeBlog(state, action) {
      const id = action.payload.id
      const likedBlog = state.find(b => b.id === id)
      const changedBlog = {
        ...likedBlog, likes: likedBlog.likes + 1
      }
      return (state.map(blog => blog.id !== id ? blog : changedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)

    }
  }
})

export const { addLike, setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer