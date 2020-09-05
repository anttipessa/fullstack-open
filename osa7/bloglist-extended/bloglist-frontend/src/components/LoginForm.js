import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({ getUser, printMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(getUser(user))
      setUsername('')
      setPassword('')
      printMessage(`Welcome back ${user.username}!`)
    } catch (error) {
      printMessage('wrong credentials', 'error')
    }
}

return (
  < form onSubmit={handleLogin} >
    <div>
      username
        <TextField
        id='username'
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <TextField
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <Button id='login-button' variant="contained" color="primary"  type="submit">login</Button>
  </form >
)
}
export default LoginForm
