import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const getUser = data => {
  return async dispatch => {
    blogService.setToken(data.token)
    dispatch({
      type: 'GET_USER',
      data: data
    })
  }
}

export const logOutUser = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT_USER',
      data: null,
    })
  }
}

export default userReducer