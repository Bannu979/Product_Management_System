import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function ProductCard({ product, onDelete, onEdit }) {
  const { addToCart } = useApp()
  const getRandomBadge = () => {
    const badges = ['New', 'Best Seller', 'Trending', 'Hot', 'Limited', 'Popular', 'Exclusive', 'Best Value', 'Featured']
    return badges[Math.floor(Math.random() * badges.length)]
  }

  const getRandomRating = () => {
    return (Math.random() * 1.5 + 4).toFixed(1)
  }

  return (
    <motion.div className="product-card" whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }} transition={{ type: 'spring', stiffness: 180, damping: 16 }}>
      <div className="product-badge">{getRandomBadge()}</div>
      <div className="image-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="details">
        <h3>{product.name}</h3>
        <div className="rating">
          <span className="stars">({getRandomRating()})</span>
        </div>
        <p className="price">${Number(product.price).toFixed(2)}</p>
        <div className="product-actions">
          <button 
            className="btn-add-to-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <div className="admin-actions">
            <button className="edit" onClick={() => onEdit?.(product)} title="Edit Product">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <span className="btn-label">Edit</span>
            </button>
            <button className="delete" onClick={() => onDelete?.(product)} title="Delete Product">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
              </svg>
              <span className="btn-label">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


