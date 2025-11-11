import Card from '../../components/Card'
import MetricsCard from '../../components/MetricsCard'
import { Rocket, Clock, Layers, Users } from 'lucide-react'

const Overview = () => {
  return (
    <section className="space-y-8 pb-12">
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-brand-blue/40" />
          <div className="relative z-10">
            <p className="uppercase text-xs tracking-[0.5em] text-white/60">Nth Exception PaymentLabs</p>
            <h2 className="text-4xl md:text-5xl font-semibold mt-4">Open Finance Developer Portal</h2>
            <p className="mt-4 text-white/70 text-lg max-w-2xl">
              Launch next-generation fintech experiences with our unified API suite. Build, test, and deploy using
              powerful tools, trusted security, and real-time intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange font-semibold shadow-xl">
                Explore APIs
              </button>
              <button className="px-6 py-3 rounded-xl border border-white/30 text-white/80 hover:bg-white/10 transition">
                View Roadmap
              </button>
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card hoverable={false}>
            <p className="text-sm text-white/70">Last Updated</p>
            <p className="text-2xl font-semibold mt-2">April 20, 2024</p>
            <p className="text-xs text-white/50 mt-2">All API endpoints refreshed with new fraud intelligence data.</p>
          </Card>
          <Card hoverable={false}>
            <p className="text-sm text-white/70">Portal Version</p>
            <p className="text-2xl font-semibold mt-2">v3.7.2-beta</p>
            <p className="text-xs text-white/50 mt-2">Includes AI-assisted API recommendations and guided onboarding.</p>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <MetricsCard title="APIs" value="128" sublabel="Unified across banking, payments, and identity" icon={Layers} />
        <MetricsCard title="Active Integrations" value="2,847" sublabel="Scaling across 58 markets" icon={Users} />
        <MetricsCard title="Avg. Time to Deploy" value="3.2 days" sublabel="With automated compliance checks" icon={Clock} />
        <MetricsCard
          title="New Feature Rollouts"
          value="8"
          sublabel="In the last 30 days"
          icon={Rocket}
          accent="from-brand-orange to-brand-teal"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="text-2xl font-semibold">Developer Journey</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {['Register', 'Discover', 'Test', 'Launch'].map((step, index) => (
              <div key={step} className="glass-card p-4 border-white/5 bg-white/5">
                <p className="text-xs uppercase tracking-wide text-white/60">Phase {index + 1}</p>
                <p className="text-lg font-semibold mt-2">{step}</p>
                <p className="text-sm text-white/60 mt-3">
                  {[
                    'Create a sandbox workspace and manage access keys.',
                    'Find APIs that match your product roadmap.',
                    'Run simulations using our advanced playground.',
                    'Push to production with compliance & monitoring.'
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Notifications</h3>
            <button className="text-sm text-brand-orange hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Risk & Fraud APIs refreshed',
                detail: 'New machine learning features reduce false positives by 27%.'
              },
              {
                title: 'PSD3 compliance toolkit',
                detail: 'Updated templates and references available for EU-based issuers.'
              },
              {
                title: 'KYC Copilot early access',
                detail: 'Request access to the AI assistant for automated onboarding reviews.'
              }
            ].map((item) => (
              <div key={item.title} className="glass-card p-4 border-white/5 bg-white/5">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-white/60 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Overview
