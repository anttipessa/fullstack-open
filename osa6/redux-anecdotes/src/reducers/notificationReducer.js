
const initialState = 'Hello World'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message
      default:
        return state
    }
  }
  
  export const setNotification = (message) => {
    return {
      type: 'SET_NOTIFICATION',
      message,
    }
  }
  
  export default notificationReducer