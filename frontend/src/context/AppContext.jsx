import { createContext, useContext, useReducer, useState } from 'react'

const AppContext = createContext()

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }
    
    default:
      return state
  }
}

// Search reducer
const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        query: action.payload
      }
    
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        results: action.payload
      }
    
    case 'CLEAR_SEARCH':
      return {
        ...state,
        query: '',
        results: []
      }
    
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  })

  const [search, searchDispatch] = useReducer(searchReducer, {
    query: '',
    results: []
  })

  // Toasts
  const [toasts, setToasts] = useState([])
  const pushToast = (toast) => {
    const id = Math.random().toString(36).slice(2)
    const t = { id, type: 'info', duration: 3000, ...toast }
    setToasts((list) => [...list, t])
    if (!t.actions || t.actions.length === 0) {
      setTimeout(() => dismissToast(id), t.duration)
    }
    return id
  }
  const dismissToast = (id) => setToasts((list) => list.filter((t) => t.id !== id))

  // Cart actions
  const addToCart = (product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    cartDispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    cartDispatch({ type: 'TOGGLE_CART' })
  }

  // Search actions
  const setSearchQuery = (query) => {
    searchDispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }

  const setSearchResults = (results) => {
    searchDispatch({ type: 'SET_SEARCH_RESULTS', payload: results })
  }

  const clearSearch = () => {
    searchDispatch({ type: 'CLEAR_SEARCH' })
  }

  // Calculate cart totals
  const cartTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemCount = cart.items.reduce((count, item) => count + item.quantity, 0)

  const value = {
    // Cart
    cart,
    cartTotal,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    
    // Search
    search,
    setSearchQuery,
    setSearchResults,
    clearSearch,

    // Toasts
    toasts,
    pushToast,
    dismissToast
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
