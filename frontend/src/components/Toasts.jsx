import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export default function Toasts() {
  const { toasts, dismissToast } = useApp()
  const hasModal = toasts.some((t) => t.actions && t.actions.length > 0)
  return (
    <>
      <AnimatePresence>
        {hasModal && (
          <motion.div
            key="toast-backdrop"
            className="toast-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className={`toast toast-${t.type}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="toast-content">
                {t.icon && <span className="toast-icon" aria-hidden>{t.icon}</span>}
                <div className="toast-text">
                  {t.title && <div className="toast-title">{t.title}</div>}
                  {t.message && <div className="toast-message">{t.message}</div>}
                </div>
              </div>
              <div className="toast-actions">
                {t.actions?.map((a) => {
                  const lower = (a.label || '').toLowerCase()
                  const cls = lower.includes('delete') ? 'toast-action toast-action-delete' : lower.includes('cancel') ? 'toast-action toast-action-cancel' : 'toast-action'
                  return (
                    <button key={a.label} className={cls} onClick={() => a.onClick?.() }>{a.label}</button>
                  )
                })}
                <button className="toast-dismiss" onClick={() => dismissToast(t.id)} aria-label="Dismiss">×</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}


