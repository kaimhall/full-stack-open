import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  
  const good = () => {
    const action = { type: 'GOOD' }
    store.dispatch( action )
  }
  const ok = () => {
    const action = { type: 'OK' }
    store.dispatch( action )
  }
  const bad = () => {
    const action = { type: 'BAD' }
    store.dispatch( action )
  }
  const zero = () => {
    const action = { type: 'ZERO' }
    store.dispatch( action )
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button  onClick={ok}>ok</button>
      <button  onClick={bad}>bad</button>
      <button  onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
