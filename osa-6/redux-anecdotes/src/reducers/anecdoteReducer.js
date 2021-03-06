import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const anecdoteIndex = state.findIndex(val => val.id === action.id)
      const votedAnecdote = {...state[anecdoteIndex], votes: action.newVotes}
      const newState = state.slice(0,anecdoteIndex).concat(votedAnecdote).concat(state.slice(anecdoteIndex+1, state.length))
      return newState
    case 'CREATE_ANECDOTE':
      return [...state, action.content]
    case 'INIT_ANECDOTES':
      const initState = action.contents
      return initState
    default:
      return state
  }
}

export const vote = ({ id, content, votes }) => {
  return async (dispatch) => {
    const incrementedVotes = votes + 1
    await anecdoteService.update({ id, content, votes: incrementedVotes })
    const response = dispatch({ type : 'VOTE_ANECDOTE', id, newVotes: incrementedVotes })
    return response
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const content = await anecdoteService.createNew({ content : anecdote, votes : 0})
    dispatch({ type : 'CREATE_ANECDOTE', content })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const contents = await anecdoteService.getAll()
    dispatch({ type : 'INIT_ANECDOTES', contents })
  }
}

export default anecdoteReducer