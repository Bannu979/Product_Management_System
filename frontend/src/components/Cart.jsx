import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Cart() {
  const { cart, cartTotal, cartItemCount, removeFromCart, updateQuantity, clearCart, toggleCart, pushToast } = useApp()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />
          
          {/* Cart Sidebar */}
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h3>Shopping Cart</h3>
              <button className="close-cart" onClick={toggleCart}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="cart-content">
              {cart.items.length === 0 ? (
                <div className="cart-empty">
                  <div className="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="m1 1 4 4 13 1 0 6-4 2"/>
                    </svg>
                  </div>
                  <h4>Your cart is empty</h4>
                  <p>Add some products to get started!</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.items.map((item) => (
                      <motion.div
                        key={item._id}
                        className="cart-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="item-image">
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <div className="placeholder-image">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21,15 16,10 5,21"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-price">{formatPrice(item.price)}</p>
                          
                          <div className="quantity-controls">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item._id)}
                          title="Remove item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="total-row">
                        <span>Items ({cartItemCount}):</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="total-row final">
                        <span>Total:</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                    
                    <div className="cart-actions">
                      <button className="btn clear-cart" onClick={clearCart}>
                        Clear Cart
                      </button>
                      <button className="btn checkout-btn" onClick={() => {
                        pushToast({ type: 'success', title: 'Thank you for shopping!', message: 'Your order has been placed.' })
                        clearCart()
                        toggleCart()
                      }}>
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
