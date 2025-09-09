import { motion } from 'framer-motion'

export default function About() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Free shipping on orders over $50"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: "🕒",
      title: "24/7 Support",
      description: "Dedicated customer support"
    }
  ]

  return (
    <div className="page about">
      <div className="about-hero">
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          About TrendyMart
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .5 }}>
          We're dedicated to bringing you the finest selection of premium products, carefully curated for quality and style. Our commitment to excellence ensures you get nothing but the best.
        </motion.p>
      </div>

      <div className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


