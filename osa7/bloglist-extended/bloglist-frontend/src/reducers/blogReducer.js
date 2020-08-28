import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort(((a, b) => b.likes - a.likes))
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.data)
    case 'VOTE':
      const changedBlog = action.data
      return state.map(anec =>
        anec.id !== changedBlog.id ? anec : changedBlog
      ).sort(((a, b) => b.likes - a.likes))
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = data => {
    return async dispatch => {
      const newBlog = await blogService.create(data)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    }
  }

  export const removeBlog = id => {
    return async dispatch => {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    }
  }

  export const upVote = (id, obj) => {
    return async dispatch => {
      const updatedBlog = await blogService.update(id, obj)
      dispatch({
        type: 'VOTE',
        data:  updatedBlog
      })
    }
  }

export default blogReducer