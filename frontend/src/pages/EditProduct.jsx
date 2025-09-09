import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get('/api/products')
        const p = data.find((d) => d._id === id)
        if (!p) return setError('Product not found')
        setForm({ name: p.name, price: p.price, description: p.description || '', category: p.category || '' })
      } catch (e) {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (file) {
        const data = new FormData()
        data.append('name', form.name)
        data.append('price', Number(form.price))
        data.append('description', form.description)
        data.append('category', form.category)
        data.append('image', file)
        await axios.put(`/api/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await axios.put(`/api/products/${id}`, { ...form, price: Number(form.price) })
      }
      navigate('/products')
    } catch (e) {
      setError('Failed to update product')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loader">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page add-product">
      <motion.form 
        className="add-product-form" 
        onSubmit={handleSubmit} 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2>Edit Product</h2>
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
            Image (optional)
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" className="btn cancel" onClick={() => navigate('/products')}>
            Cancel
          </button>
          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </motion.form>
    </div>
  )
}


