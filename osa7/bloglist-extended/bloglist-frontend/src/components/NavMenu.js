import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const NavMenu = ({ user, handleLogout }) => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit" onClick={handleLogout}>logout</Button>
        <em>{user.username} logged in</em>
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu