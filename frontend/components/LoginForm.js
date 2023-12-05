import React, { useState } from 'react'
import PT from 'prop-types'
import axios from 'axios'
import App from './App'
const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
 const {login} = props
 //console.log(`login ---->${login}`)
  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement


     return axios.post('http://localhost:9000/api/login',values)

      .then(res =>{
        props.login(values)
        setValues(initialFormValues);
      })
      .catch(err => console.error(err))



  }

  const isDisabled = () => {
    return values.username.trim().length < 3 || values.password.trim().length < 8;
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
