import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sort, setSort] = useState('newest')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' })
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [showAll, setShowAll] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addToCart, pushToast, dismissToast } = useApp()

  const categories = ['All', 'Electronics', 'Fashion', 'Lifestyle']

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/products')
      setProducts(data)
    } catch (e) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Handle search from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = products
    if (query.trim()) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    }
    if (category !== 'All') {
      const active = category.trim().toLowerCase()
      list = list.filter((p) => (p.category || '').trim().toLowerCase() === active)
    }
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, sort, query, category])

  // Reset pagination when filters or query change
  useEffect(() => {
    setShowAll(false)
  }, [sort, query, category])

  async function handleDelete(product) {
    const id = pushToast({
      type: 'warning',
      title: 'Delete product?',
      message: `Are you sure you want to delete "${product.name}"?`,
      actions: [
        { label: 'Cancel', onClick: () => dismissToast(id) },
        { label: 'Delete', onClick: async () => {
            dismissToast(id)
            await axios.delete(`/api/products/${product._id}`)
            pushToast({ type: 'success', title: 'Deleted', message: `${product.name} removed.` })
            fetchProducts()
          }
        }
      ]
    })
  }

  function handleEdit(product) {
    navigate(`/edit/${product._id}`)
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!form.name || form.price === '') {
      setFormError('Name and price are required')
      return
    }
    if (!form.category.trim()) {
      setFormError('Category is required')
      return
    }
    if (!file) {
      setFormError('Product image is required')
      return
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    const MAX_IMAGE_MB = 3
    if (!allowedTypes.includes(file.type)) {
      setFormError('Invalid image type. Please upload JPG, PNG, or WEBP')
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setFormError(`Image is too large. Max ${MAX_IMAGE_MB} MB allowed`)
      return
    }
    setSubmitting(true)
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('price', Number(form.price))
      data.append('description', form.description)
      data.append('category', form.category)
      if (file) {
        // Compress image on the client to speed up upload and processing
        const compressed = await (async () => {
          try {
            const blob = file
            const imageBitmap = await createImageBitmap(blob)
            const maxDim = 1280
            const scale = Math.min(1, maxDim / Math.max(imageBitmap.width, imageBitmap.height))
            const targetW = Math.max(1, Math.round(imageBitmap.width * scale))
            const targetH = Math.max(1, Math.round(imageBitmap.height * scale))

            const canvas = document.createElement('canvas')
            canvas.width = targetW
            canvas.height = targetH
            const ctx = canvas.getContext('2d')
            ctx.drawImage(imageBitmap, 0, 0, targetW, targetH)

            const prefersWebp = file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/png'
            const type = prefersWebp && canvas.toDataURL('image/webp').startsWith('data:image/webp') ? 'image/webp' : 'image/jpeg'

            const quality = 0.82
            const compressedBlob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b || blob), type, quality))

            // Name the file consistently while preserving original base name
            const baseName = file.name.replace(/\.[^.]+$/, '')
            const ext = type === 'image/webp' ? 'webp' : 'jpg'
            return new File([compressedBlob], `${baseName}.${ext}`, { type })
          } catch (_) {
            return file
          }
        })()
        data.append('image', compressed)
      }

      await axios.post('/api/products', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      setForm({ name: '', price: '', description: '', category: '' })
      setFile(null)
      setShowAddForm(false)
      fetchProducts()
    } catch (e) {
      setFormError('Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loader">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page products">
      <div className="products-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Discover amazing products that define your style</p>
      </div>

      {/* Toggle between products view and add form */}
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${!showAddForm ? 'active' : ''}`}
          onClick={() => { setShowAddForm(false); setShowAll(false) }}
        >
          View Products
        </button>
        <button 
          className={`toggle-btn ${showAddForm ? 'active' : ''}`}
          onClick={() => setShowAddForm(true)}
        >
          Add Product
        </button>
      </div>

      {!showAddForm ? (
        <>
          <div className="products-toolbar">
            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="search-sort">
              <div className="search-input-wrap">
                <input 
                  placeholder="Search products..." 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // keep behavior same; query already filters list
                    }
                  }}
                  className="search-input"
                />
                <button 
                  className="search-button"
                  aria-label="Search"
                  onClick={() => {/* query is already applied via state */}}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
                <option value="newest">Latest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="products-grid">
            {(showAll ? filtered : filtered.slice(0, 6)).map((p) => (
              <ProductCard key={p._id} product={p} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search or browse our full collection</p>
            </div>
          )}
          
          {filtered.length > (showAll ? 0 : 6) && (
            <div className="load-more">
              <button className="load-more-btn" onClick={() => setShowAll(true)}>Load More Products</button>
            </div>
          )}
        </>
      ) : (
        <motion.form 
          className="add-product-form" 
          onSubmit={handleSubmit} 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2>Add New Product</h2>
          {formError && <div className="error">{formError}</div>}
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
            <button type="button" className="btn cancel" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </motion.form>
      )}
    </div>
  )
}


