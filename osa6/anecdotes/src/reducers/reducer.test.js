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
  test('return init state', () => {
    const newState = reducer(undefined, {type: 'anecdotes'})
    expect(newState.map(s => s.content)).toEqual(anecdotesAtStart)
  })

  test('adds an anecdote by NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'anecdotes/addAnecdote',
      payload: 'the app state is in redux store',
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
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
      type: 'anecdotes/addVote',
      payload: 2
    }
    deepFreeze(state)
    const newState = reducer(state, action)
    
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState[0].votes).toEqual(1)
  })
  test('message ads message', () => {
    const payload = 'first message'
    const action = {
      type: 'messages/createMessage'
    }
    const message = reducer(payload, action)
    expect(message).toEqual(payload)
  })
  test('removes message', () => {
    const message = reducer('', {type:'messages/removeMessage'})
    expect(message).toEqual('')
  })
})
