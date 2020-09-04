import React from 'react'
import { Link } from 'react-router-dom'
const NavMenu = ({user, handleLogout}) => {
    const padding = {
      paddingRight: 5,
     
    }

    const colour = {
        backgroundColor: "#669999"
    }
    return (
      <div style={colour}>
        <Link href='#' style={padding} to="/">blogs</Link>
        <Link href='#' style={padding} to="/users">users</Link>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
    )
}

export default NavMenu