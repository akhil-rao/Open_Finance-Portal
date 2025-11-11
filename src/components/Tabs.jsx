import { Children, cloneElement, isValidElement } from 'react'
import { cn } from '../lib/utils'

const Tabs = ({ tabs, value, onValueChange, children, className }) => {
  const handleSelect = (tabValue) => {
    if (tabValue !== value) {
      onValueChange?.(tabValue)
    }
  }

  const renderedChildren = Children.toArray(children).map((child) => {
    if (!isValidElement(child)) return child
    const isActive = child.props.value === value
    if (!isActive) return null
    return cloneElement(child, {
      active: true,
      key: child.key ?? child.props.value
    })
  })

  return (
    <div className={cn('w-full', className)}>
      <div className="glass-card mb-6 flex items-center gap-3 overflow-x-auto p-2" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.value === value
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(tab.value)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-medium transition border border-transparent',
                isActive ? 'bg-white/20 text-white shadow-lg border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {renderedChildren}
    </div>
  )
}

const TabsContent = ({ active, children, className }) => {
  if (!active) return null
  return <div className={cn('focus:outline-none', className)}>{children}</div>
}

Tabs.Content = TabsContent

export default Tabs
