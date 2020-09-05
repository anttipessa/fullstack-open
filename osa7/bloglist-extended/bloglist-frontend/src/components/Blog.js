import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, deleteBlog, user }) => {

  if (!blog) {
    return null
  }

  const deleteVisibility = { display: true ? (user.username === blog.user.username ? '' : 'none') : 'none' }

  const addLike = () => {
    updateLike(blog.id,
      {
        title: blog.title,
        likes: blog.likes + 1
      })
  }

  const delBlog = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) deleteBlog(blog.id)
  }

  return (
    <div >
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} <button onClick={addLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <button onClick={delBlog} style={deleteVisibility} >remove</button>

      <h3>comments</h3>
      {blog.comments.map(c =>
        <li>{c.text}</li>)}
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
