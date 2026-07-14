import { useState } from 'react'
import './login.css'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      setMessage('Please enter both your email and password.')
      return
    }

    setMessage(`Welcome back, ${formData.email}!`)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome back</h1>
        <p>Sign in to continue to your account</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="login-row">
            <label className="checkbox-row">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Log In</button>
          {message ? <p className="status-message">{message}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default Login
