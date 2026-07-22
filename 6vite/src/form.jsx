import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './form.css'

export default function Form() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    regid: ''
  })

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Submitted Data:', formData)
    // You can add your API submission logic here
  }

  return (
    <div className="form-container">
      {/* Optional Brand/Logo Header */}
     
      {/* Main Form */}
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="regid">Regid</label>
          <textarea
            id="regid"
            name="regid"
            value={formData.regid}
            onChange={handleChange}
            placeholder="registration id"
            rows="1"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  )
}