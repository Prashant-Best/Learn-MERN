import { useState } from 'react'
import './sign-up.css'

function SignUp({ onSignUpSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage('Please fill out all fields.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    const success = onSignUpSuccess(formData.name, formData.email, formData.password)

    if (!success) {
      setMessage('An account with this email already exists.')
      return
    }

    setMessage('')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-badge">Create Account</div>
        <h1>Start your journey</h1>
        <p>Create an account to access the dashboard</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button className="primary-btn" type="submit">
            Sign Up
          </button>

          <div className="switch-row">
            <span>Already have an account?</span>
            <button type="button" className="link-btn" onClick={onSwitchToLogin}>
              Log In
            </button>
          </div>

          {message ? <p className="status-message">{message}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default SignUp
