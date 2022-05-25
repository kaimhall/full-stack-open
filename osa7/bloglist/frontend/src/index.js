import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import BlogService from './services/blogs'

import NotificationReducer from './reducers/NotificationReducer'
import BlogReducer, { setBlogs } from './reducers/BlogReducer'
import UserReducer from './reducers/UserReducer'

const store = configureStore({
  reducer: {
    notifications: NotificationReducer,
    blogs: BlogReducer,
    users: UserReducer
  }
})

BlogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
