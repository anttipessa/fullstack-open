import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog, upVote } from './reducers/blogReducer'
import { getUser, logOutUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  console.log(user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      dispatch(getUser(loggedUserJSON))
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
      <Notification />
      <h2>blogs</h2>
      <p> {user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={addLike} deleteBlog={deleteBlog} user={user} />
      ).sort(((a, b) => b.votes - a.votes))}

    </div>
  )
}

export default App