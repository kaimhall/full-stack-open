import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

describe('anecdote reducer:', () => {
  test('returns init state', () => {
    const newState = reducer(undefined, [])
    expect(newState.map( anecdote => anecdote.content)).toEqual(anecdotesAtStart)
    })
  
  test('adds an anecdote by NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'Can do it once, can do it twice',
        id: 1,
        votes: 0
      }
    }
    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(1)
  })
  test('votes by VOTE', () => {
    const state = [
      {
      content: 'anecdote 1',
      id: 1,
      votes: 0
      },
      {
        content: 'anecdote 2',
        id: 2,
        votes: 0
      }
    ]
    
    const action = {
      type: 'VOTE',
      data: {
        id:2
      }
    }
    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState[1].votes).toEqual(1)
  })
})
