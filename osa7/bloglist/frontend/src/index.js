import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import UserService from './services/users'

import NotificationReducer from './reducers/NotificationReducer'
import BlogReducer from './reducers/BlogReducer'
import UserReducer from './reducers/UserReducer'
import UserListReducer, { setUserList } from './reducers/UserListReducer'

const store = configureStore({
  reducer: {
    notifications: NotificationReducer,
    blogs: BlogReducer,
    users: UserReducer,
    userlist: UserListReducer
  }
})

UserService.getAll().then(users =>
  store.dispatch(setUserList(users))
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
