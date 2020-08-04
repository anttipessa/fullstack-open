import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const deleteVisibility = { display: visible ? (user.username === blog.user.username ? '' : 'none') : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    console.log(blog.user.id)
    updateLike(blog.id,
      {
        likes: blog.likes + 1
      })
  }

  const delBlog = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(result)    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>show</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <div>{blog.url}</div>
          <div>{blog.likes} <button onClick={addLike}>like</button></div>
          <div>{blog.user.username}</div>
          <button onClick={delBlog} style={deleteVisibility} >remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
