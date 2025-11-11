import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'

const Drawer = ({ open, onOpenChange, title, description, children }) => {
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
    return undefined
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onOpenChange?.(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onOpenChange?.(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className="flex-1 bg-slate-950/60 backdrop-blur-sm" />
      <aside
        className={cn(
          'relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-slate-900/95',
          'p-8 text-slate-100 shadow-2xl backdrop-blur-xl'
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold gradient-text">{title}</h2>
            {description && <p className="mt-1 text-sm text-white/70">{description}</p>}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange?.(false)}
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </aside>
    </div>,
    document.body
  )
}

export default Drawer
