import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/styles.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/footer.css'
import './styles/toasts.css'
import './styles/home.css'
import './styles/products.css'
import './styles/forms.css'
import './styles/about.css'
import './styles/contact.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)


