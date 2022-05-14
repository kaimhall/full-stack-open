const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const {good, ...r1} = state
      return {good: good + 1, ...r1} 
    case 'OK':
      const {ok, ...r2} = state
      return {ok: ok + 1, ...r2} 
    case 'BAD':
      const {bad, ...r3} = state
      return {bad: bad + 1, ...r3} 
    case 'ZERO':
      return {
        good: 0,
        ok: 0, 
        bad: 0
      }
    
      default: return state
  }
}
export default counterReducer