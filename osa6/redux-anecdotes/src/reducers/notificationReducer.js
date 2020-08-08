
const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer