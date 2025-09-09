import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Toasts from './Toasts'

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  // Removed navbar search UI per request
  const { cartItemCount, toggleCart } = useApp()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'All Products' },
    { to: '/add', label: 'Add Product' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
    <motion.nav className="navbar" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
    <link rel="icon" type="image/svg+xml" href='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop offset="0%25" stop-color="%230ea5e9"/%3E%3Cstop offset="100%25" stop-color="%238b5cf6"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x="4" y="4" width="56" height="56" rx="14" fill="url(%23g)"/%3E%3Cpath d="M20 42V22h14a8 8 0 0 1 0 16H28l8 8" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E' />
     <link rel="icon" sizes="192x192" href='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop offset="0%25" stop-color="%230ea5e9"/%3E%3Cstop offset="100%25" stop-color="%238b5cf6"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x="4" y="4" width="56" height="56" rx="14" fill="url(%23g2)"/%3E%3Cpath d="M20 42V22h14a8 8 0 0 1 0 16H28l8 8" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E' />
     
      <div className="brand">TrendyMart</div>
      
      <ul className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        {links.map((l) => (
          <li key={l.to} className={location.pathname === l.to ? 'active' : ''}>
            <Link to={l.to}>{l.label}</Link>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <div className="nav-icons">
          <button 
            className="nav-icon cart-icon" 
            aria-label="Shopping Cart" 
            onClick={toggleCart}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="m1 1 4 4 13 1 0 6-4 2"/>
            </svg>
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>
        </div>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
    <Toasts />
    </>
  )
}


