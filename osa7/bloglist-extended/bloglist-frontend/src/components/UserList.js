import React from 'react'
import { Link } from 'react-router-dom'
import { TableHead, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const UserList = ({ users }) => {

  if (users === null) {
    return null
  }

  return (
    <div>
      <h2><b>Users</b></h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Username</b></TableCell>
              <TableCell><b>Blogs created</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.id} >
                <TableCell>
                  <Link to={`/users/${user.id}`}> {user.username}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList