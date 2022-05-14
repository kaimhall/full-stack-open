import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState.good).toEqual(1)
  })
  
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState.ok).toEqual(1)
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState.bad).toEqual(1)
  })

  test('zero resets good count', () => {
    const state = {
      good: 1,
      ok: 0,
      bad: 0
    } 
    const action = {
      type: 'ZERO'
    }
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

})