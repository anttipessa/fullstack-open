import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'

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
        <input
        id='username'
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id='login-button' type="submit">login</button>
  </form >
)
}
export default LoginForm
