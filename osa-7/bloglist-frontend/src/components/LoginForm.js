import React from 'react'
import loginService from '../services/login'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import localStorage from '../services/localStorage'

const LoginForm = ({ newNotification, loginUser }) => {
  // eslint-disable-next-line no-unused-vars
  const { reset : resetU, ...username } = useField('text')
  // eslint-disable-next-line no-unused-vars
  const { reset : resetP, ...password } = useField('password')

  const doLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username : username.value, password : password.value })
      localStorage.setStoredUser(user)
      loginUser(user)
    } catch (exception) {
      newNotification({ success: false, content: 'Wrong username or password!' })
    }
  }

  return <form onSubmit={doLogin}>
    <h2>Login to application</h2>
    <div>
        Username
      <input {...username} />
    </div>
    <div>
        Password
      <input {...password} />
    </div>
    <button type="submit">Login</button>
  </form>
}

export default connect(null, { newNotification, loginUser })(LoginForm)