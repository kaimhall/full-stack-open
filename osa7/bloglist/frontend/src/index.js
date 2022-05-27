import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import NotificationReducer from './reducers/NotificationReducer'
import BlogReducer, { InitBlogs } from './reducers/BlogReducer'
import UserReducer, { setUser } from './reducers/UserReducer'
import UserListReducer, { InitUserList } from './reducers/UserListReducer'

const store = configureStore({
  reducer: {
    notifications: NotificationReducer,
    blogs: BlogReducer,
    users: UserReducer,
    userlist: UserListReducer
  }
})

const logUserJSON = window.localStorage.getItem('loggedBloglistUser')
if (logUserJSON) {
  const user = JSON.parse(logUserJSON)
  store.dispatch(setUser(user))
}

store.dispatch(InitUserList())
store.dispatch(InitBlogs())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
