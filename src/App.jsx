import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Overview from './pages/Overview'
import APICatalog from './pages/APICatalog'
import APIDocs from './pages/APIDocs'
import APIPlayground from './pages/APIPlayground'
import TrustCenter from './pages/TrustCenter'
import AIAgents from './pages/AIAgents'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 -z-10 opacity-80 brand-gradient" />
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto px-6 pb-12">
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/api-catalog" element={<APICatalog />} />
              <Route path="/api-docs" element={<APIDocs />} />
              <Route path="/api-playground" element={<APIPlayground />} />
              <Route path="/trust-center" element={<TrustCenter />} />
              <Route path="/ai-agents" element={<AIAgents />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
