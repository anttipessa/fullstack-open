import React from 'react'

const UserList = ({ users }) => {

  if (users === null) {
    return null
  }

  return (
    <div>
      <h2><b>users</b></h2>
      <div> <b>blogs created</b></div>
      {users.map(user =>
        <div>{user.username} {user.blogs.length}</div>)}
    </div>
  )
}

export default UserList