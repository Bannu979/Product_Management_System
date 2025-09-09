import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const { pushToast } = useApp()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = { name: '', email: '', message: '' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name'
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters'
    }
    setErrors(nextErrors)
    const hasError = Object.values(nextErrors).some(Boolean)
    if (hasError) return

    // Simulate successful submit and show toast
    pushToast({
      type: 'info',
      title: 'Message sent',
      message: 'We will get back to you shortly.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      duration: 3000,
    })

    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page contact">
      <div className="contact-hero">
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          Get in Touch
        </motion.h1>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <motion.div 
            className="contact-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>Location</h3>
            <p>123 Shopping Street, Fashion District, 12345</p>
          </motion.div>

          <motion.div 
            className="contact-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3>Phone</h3>
            <p>+1 (234) 567-8900</p>
          </motion.div>

          <motion.div 
            className="contact-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3>Email</h3>
            <p>contact@trendymart.com</p>
          </motion.div>
        </div>

        <motion.form 
          className="contact-form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
            {errors.message && <div className="error">{errors.message}</div>}
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </motion.form>
      </div>
    </div>
  )
}


