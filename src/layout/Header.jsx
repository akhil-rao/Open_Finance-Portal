import { useLocation } from 'react-router-dom'
import { Search, Bell, UserCircle2 } from 'lucide-react'

const titleMap = {
  '/overview': 'Overview',
  '/api-catalog': 'API Catalog',
  '/api-docs': 'API Documentation',
  '/api-playground': 'API Playground',
  '/trust-center': 'Trust Center',
  '/ai-agents': 'AI Agents',
  '/settings': 'Settings'
}

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-6 px-6 py-6 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
      <div>
        <h1 className="text-3xl font-semibold gradient-text">{titleMap[pathname] || 'Open Finance Portal'}</h1>
        <p className="text-sm text-white/70 mt-2">
          Empowering developers with unified financial APIs from Nth Exception PaymentLabs.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 glass-card px-4 py-2">
          <Search className="h-4 w-4 text-white/60" />
          <input
            placeholder="Search APIs, endpoints, docs..."
            className="bg-transparent focus:outline-none text-sm placeholder:text-white/40 w-56"
          />
        </div>
        <button className="glass-card p-3 hover:bg-white/10">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 glass-card px-4 py-2">
          <UserCircle2 className="h-7 w-7" />
          <div>
            <p className="text-sm font-medium">Avery Quinn</p>
            <p className="text-xs text-white/60">Lead Developer</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
