import { useState } from 'react'
import './login.css'

function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
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

    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setMessage('Please fill out all fields to create your account.')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match.')
        return
      }

      setMessage(`Account created for ${formData.email}!`)
      return
    }

    if (!formData.email || !formData.password) {
      setMessage('Please enter both your email and password.')
      return
    }

    setMessage(`Welcome back, ${formData.email}!`)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isSignUp ? 'Create account' : 'Welcome back'}</h1>
        <p>{isSignUp ? 'Sign up to get started' : 'Sign in to continue to your account'}</p>

        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </>
          ) : null}

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

          {isSignUp ? (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </>
          ) : (
            <div className="login-row">
              <label className="checkbox-row">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>

          <p className="switch-text">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setIsSignUp((prev) => !prev)
                setMessage('')
              }}
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>

          {message ? <p className="status-message">{message}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default Login
