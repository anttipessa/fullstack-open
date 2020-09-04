import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

  if (users === null) {
    return null
  }

  return (
    <div>
      <h2><b>Users</b></h2>
      <div> <b>blogs created</b></div>
      {users.map(user =>
        <div key={user.id} >
          <Link to={`/users/${user.id}`}> {user.username}</Link> {user.blogs.length}
        </div>)}
    </div>
  )
}

export default UserList