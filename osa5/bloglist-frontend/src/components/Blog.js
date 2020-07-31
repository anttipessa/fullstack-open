import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


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

  return (
    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>show</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <div>{blog.url}</div>
          <div>{blog.likes} <button>like</button></div>
          <div>{blog.user.username}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog
