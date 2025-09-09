import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' })
  const [file, setFile] = useState(null)
  const MAX_IMAGE_MB = 3
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name || form.price === '') {
      setError('Name and price are required')
      return
    }
    if (!form.category.trim()) {
      setError('Category is required')
      return
    }
    if (!file) {
      setError('Product image is required')
      return
    }
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid image type. Please upload JPG, PNG, or WEBP')
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`Image is too large. Max ${MAX_IMAGE_MB} MB allowed`)
      return
    }
    setSubmitting(true)
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('price', Number(form.price))
      data.append('description', form.description)
      data.append('category', form.category)
      if (file) data.append('image', file)

      await axios.post('/api/products', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate('/products')
    } catch (e) {
      setError('Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page add-product">
      <motion.form 
        className="add-product-form" 
        onSubmit={handleSubmit} 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2>Add New Product</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-row">
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Price
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} required />
          </label>
        </div>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={onChange} />
        </label>
        <div className="form-row">
          <label>
            Category
            <input name="category" value={form.category} onChange={onChange} required />
          </label>
          <label>
            Image
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" className="btn cancel" onClick={() => navigate('/products')}>
            Cancel
          </button>
          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </motion.form>
    </div>
  )
}


