import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>title:
        <TextField
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>author:
        <TextField
          id='author'
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>url:
        <TextField
          id='url'
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">save</Button>
    </form>

  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm