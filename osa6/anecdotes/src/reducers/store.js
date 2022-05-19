import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'
import timeReducer from './timeReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    messages: notificationReducer,
    filters: filterReducer,
    timeouts: timeReducer
  }
})
export default store