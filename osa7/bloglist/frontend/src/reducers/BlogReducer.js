/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      return (state.map(blog => blog.id !== id ? blog : changedBlog)
        .sort(byLikes))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { addLike, setBlogs, appendBlog, likeBlog, deleteBlog, commentBlog } = blogSlice.actions

export const InitBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort(byLikes)
    dispatch(setBlogs(blogs))
  }
}
// had to pass user for now. will figure how to use store here

export const CreateBlog = (object, user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    const newBlog = await blogService.create(object)
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
  }
}
export const RemoveBlog = (id, user) => {
  return async dispatch => {
    await blogService.setToken(user.token)
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}
export const AddLike = (object, id, user) => {
  return async dispatch => {
    await blogService.setToken(user.token)
    const newBlog = await blogService.update(object, id)
    dispatch(likeBlog(newBlog))
  }
}
export default blogSlice.reducer