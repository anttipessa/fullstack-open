import React from 'react'
import { List, ListItem } from '@material-ui/core'

const User = ({ user }) => {

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map(blog =>
        <List>
          <ListItem divider button key={blog.id} >
            {blog.title}
          </ListItem>
        </List>)}
    </div>
  )
}

export default User