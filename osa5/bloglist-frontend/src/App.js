import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) =>  b.likes - a.likes))
    )
  }, [])



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      printMessage(`Welcome back ${user.username}!`)
    } catch (error) {
      printMessage('wrong credentials', 'error')
    }
  }

  const printMessage = (message, type = 'success') => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem(
      'loggedUser'
    )
    printMessage(`Logout successful! See you around, ${user.username}!`)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        printMessage('Blog succesfully added!')
      })
      .catch(error => {
        printMessage(`${error.response.data.error} `, 'error')
      })
  }


  const addLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === returnedBlog.id ? returnedBlog :  b).sort((a, b) =>  b.likes - a.likes))
        printMessage('Blog succesfully updated!')
      })
      .catch(error => {
        printMessage(`${error.response.data.error} `, 'error')
      })
  }


  const deleteBlog = (id) => {
    const deleted = id
    blogService
      .deleteBlog(id)
      .then( () => {
        setBlogs(blogs.filter(b => b.id !== deleted))
        printMessage('Blog succesfully deleted!')
      })
      .catch(error => {
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
        <Notification notification={message} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification notification={message} />
      <h2>blogs</h2>
      <p> {user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={addLike} deleteBlog={deleteBlog} user={user} />
      )}

    </div>
  )
}

export default App