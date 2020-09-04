import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog, upVote } from './reducers/blogReducer'
import { getUser, logOutUser } from './reducers/loginReducer'
import { getAllUsers } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import NavMenu from './components/NavMenu'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import './App.css'


const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')
  const target = match
    ? users.find(u => u.id === match.params.id)
    : null
  const targetBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      dispatch(getUser(JSON.parse(loggedUserJSON)
      ))
    }
  }, [dispatch])

  const printMessage = (message, type = 'success') => {
    dispatch(setNotification({ message, type }, 5))
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logOutUser())
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject)).then(() => {
      printMessage('Blog succesfully added!')
    }).catch(error => {
      printMessage(`${error.response.data.error} `, 'error')
    })
  }

  const addLike = (id, blogObject) => {
    dispatch(upVote(id, blogObject)).then(() => {
      printMessage(`You voted for ${blogObject.title}`)
    }).catch(error => {
      printMessage(`${error.response.data.error} `, 'error')
    })
  }

  const deleteBlog = (id) => {
    dispatch(removeBlog(id)).then(() => {
      printMessage('Blog succesfully deleted!')
    }).catch(error => {
      printMessage(`${error.response.data.error} `, 'error')
    })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm getUser={getUser} printMessage={printMessage} />
      </div>
    )
  }

  return (
    <div>
      <NavMenu user={user} handleLogout={handleLogout} />
      <Notification />
      <h2>blogs</h2>
      <Switch>
        <Route path="/users/:id">
          <User user={target} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={targetBlog} updateLike={addLike} deleteBlog={deleteBlog} user={user} />
        </Route>
        <Route path='/users'>
          <UserList users={users} />
        </Route>
        <Route path='/'>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
            <Link to={`/blogs/${blog.id}`}><div style={blogStyle}>{blog.title} {blog.author}</div></Link>
          ).sort(((a, b) => b.votes - a.votes))}
        </Route>
      </Switch>
    </div>
  )
}

export default App