import { NavLink, useLocation } from 'react-router-dom'
import { LayoutGrid, FolderKanban, FileText, FlaskConical, ShieldCheck, Bot, Settings } from 'lucide-react'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/overview', label: 'Overview', icon: LayoutGrid },
  { to: '/api-catalog', label: 'API Catalog', icon: FolderKanban },
  { to: '/api-docs', label: 'API Documentation', icon: FileText },
  { to: '/api-playground', label: 'API Playground', icon: FlaskConical },
  { to: '/trust-center', label: 'Trust Center', icon: ShieldCheck },
  { to: '/ai-agents', label: 'AI Agents', icon: Bot },
  { to: '/settings', label: 'Settings', icon: Settings }
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col w-72 p-6 border-r border-white/10 backdrop-blur-xl bg-slate-950/60',
        'shadow-2xl'
      )}
    >
      <div className="flex items-center gap-3 mb-10">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange flex items-center justify-center font-semibold">
          NE
        </div>
        <div>
          <p className="text-lg font-semibold">Nth Exception</p>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">PaymentLabs</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to
          return (
            <NavLink key={to} to={to} className="block">
              <div
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition glass-card hover:bg-white/15',
                  isActive ? 'bg-white/20 text-white shadow-xl' : 'text-white/70 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            </NavLink>
          )
        })}
      </nav>
      <div className="mt-10 glass-card p-4 text-sm text-white/70">
        <p className="font-medium text-white">Need help?</p>
        <p className="mt-1">Access the support hub or reach out to our integration specialists.</p>
        <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange py-2 text-sm font-semibold text-white shadow-lg">
          Contact Support
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
