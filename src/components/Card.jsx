import { cn } from '../lib/utils'

const Card = ({ className = '', children, hoverable = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card p-6 transition transform',
        hoverable && 'hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
