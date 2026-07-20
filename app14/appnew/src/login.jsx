import { useState } from 'react'
import './login.css'

function Login({ onLoginSuccess, onSwitchToSignUp }) {
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

    const success = onLoginSuccess(formData.email, formData.password)

    if (!success) {
      setMessage('Invalid email or password. Try signing up first.')
      return
    }

    setMessage('')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-badge">Secure Access</div>
        <h1>Welcome back</h1>
        <p>Sign in to continue to your workspace</p>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button className="primary-btn" type="submit">
            Log In
          </button>

          <div className="switch-row">
            <span>Don&apos;t have an account?</span>
            <button type="button" className="link-btn" onClick={onSwitchToSignUp}>
              Sign Up
            </button>
          </div>

          {message ? <p className="status-message">{message}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default Login
