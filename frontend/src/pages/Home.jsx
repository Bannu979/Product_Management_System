import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, threshold: 0.3 })

  // Dynamic number counting effect
  const [animatedStats, setAnimatedStats] = useState({
    products: 0,
    customers: 0,
    rating: 0
  })

  useEffect(() => {
    if (isInView) {
      setStatsVisible(true)
      
      // Animate numbers
      const animateNumber = (target, key, duration = 2000) => {
        const start = 0
        const increment = target / (duration / 16)
        let current = start
        
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }))
        }, 16)
      }

      animateNumber(5000, 'products')
      animateNumber(100000, 'customers')
      animateNumber(4.8, 'rating', 1500)
    }
  }, [isInView])

  const featuredCollections = [
    {
      id: 1,
      title: "Luxury Watches",
      description: "Timeless elegance for every occasion",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      category: "Premium Watch"
    },
    {
      id: 2,
      title: "Audio Excellence",
      description: "Immersive sound experience",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      category: "Premium Headphones"
    },
    {
      id: 3,
      title: "Sport Collection",
      description: "Performance meets style",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      category: "Premium Sneakers"
    }
  ]

  return (
    <div className="page home">

      {/* Hero Section */}
      <div className="hero-section">
        {/* Animated background elements */}
        <div className="hero-bg-elements">
          <motion.div 
            className="floating-shape shape-1"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="floating-shape shape-2"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="floating-shape shape-3"
            animate={{ 
              y: [0, -10, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <motion.h1 
          className="hero-title" 
          initial={{ opacity: 0, y: 30, scale: 0.9 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to the
          </motion.span>
          <motion.span
            className="gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Future of Shopping
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Discover premium products that define your style
        </motion.p>
        
        <div className="hero-cta">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className="btn shop-now" to="/products">
              <span>Shop Now</span>
              <motion.span
                className="btn-icon"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ delay: 1.0, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link className="btn view-featured" to="/products">
              <span>View Featured</span>
              <motion.span
                className="btn-icon"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                ✨
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
      
      {/* Statistics Section */}
      <div className="stats-section" ref={statsRef}>
        <motion.div 
          className="stat-item" 
          initial={{ opacity: 0, y: 30, scale: 0.8 }} 
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }} 
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <motion.div 
            className="stat-number"
            key={animatedStats.products}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {animatedStats.products.toLocaleString()}+
          </motion.div>
          <div className="stat-label">Products</div>
        </motion.div>
        
        <motion.div 
          className="stat-item" 
          initial={{ opacity: 0, y: 30, scale: 0.8 }} 
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }} 
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <motion.div 
            className="stat-number"
            key={animatedStats.customers}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {(animatedStats.customers / 1000).toFixed(0)}k+
          </motion.div>
          <div className="stat-label">Happy Customers</div>
        </motion.div>
        
        <motion.div 
          className="stat-item" 
          initial={{ opacity: 0, y: 30, scale: 0.8 }} 
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }} 
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <motion.div 
            className="stat-number"
            key={animatedStats.rating}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {animatedStats.rating.toFixed(1)}
          </motion.div>
          <div className="stat-label">Rating</div>
        </motion.div>
      </div>

      {/* Featured Collections */}
      <div className="featured-collections">
        <h2 className="section-title">Featured Collections</h2>
        <div className="collections-grid">
          {featuredCollections.map((collection) => (
            <motion.div 
              key={collection.id} 
              className="collection-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (collection.id * 0.1) }}
            >
              <div className="collection-image">
                <img src={collection.image} alt={collection.title} />
                <div className="collection-category">{collection.category}</div>
              </div>
              <div className="collection-content">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hidden admin section for product management functionality */}
      <div className="admin-section" style={{ display: 'none' }}>
        <motion.h2 className="gradient-text" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>Manage Products Effortlessly</motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .5 }}>View, add, update, and manage your product catalog with image uploads.</motion.p>
        <div className="cta">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>
            <Link className="btn" to="/products">View Products</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>
            <Link className="btn primary" to="/add">Add Product</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>
            <Link className="btn success" to="/products">Quick Start</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


