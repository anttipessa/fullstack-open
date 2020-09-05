import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, List, ListItem, Card } from '@material-ui/core'

const Blog = ({ blog, updateLike, deleteBlog, user, giveComment }) => {
  const [comment, setComment] = useState('')

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

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    giveComment(blog.id, { text: comment })
    setComment('')
  }

  return (
    <div >
      <Card variant="outlined">
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} <Button onClick={addLike} variant="contained" color="primary" size="small">like</Button></div>
      <div>added by {blog.user.name}</div>
      <Button onClick={delBlog} variant="contained" color="secondary" size="small" style={deleteVisibility} >remove</Button>
      </Card>
      <h3>comments</h3>
      <TextField value={comment} onChange={handleCommentChange} />
      <Button onClick={addComment} variant="contained" color="primary">add comment</Button>
      {blog.comments.map(c =>
        <List>
          <ListItem divider button key={c.id}>{c.text}</ListItem>
        </List>)}
    </div>
  )
}

Blog.propTypes = {
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
