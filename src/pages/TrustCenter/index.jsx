import Tabs from '../../components/Tabs'
import Card from '../../components/Card'
import MetricsCard from '../../components/MetricsCard'
import trustData from '../../data/trustCenter.json'
import { ShieldCheck, Activity, Users, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const TrustCenter = () => {
  const [tab, setTab] = useState('endpoints')
  const tabs = [
    { label: 'Endpoints', value: 'endpoints' },
    { label: 'Certifications', value: 'certifications' },
    { label: 'Security Features', value: 'security' },
    { label: 'Activity Log', value: 'activity' }
  ]

  return (
    <section className="space-y-8 pb-12">
      <div className="grid md:grid-cols-4 gap-4">
        <MetricsCard title="Status" value="Operational" icon={ShieldCheck} />
        <MetricsCard title="Uptime" value="99.98%" icon={Activity} />
        <MetricsCard title="Active Clients" value="2,847" icon={Users} />
        <MetricsCard title="Tokens Issued" value="1.2M" icon={CheckCircle} />
      </div>

      <Tabs tabs={tabs} value={tab} onValueChange={setTab} />

      <Tabs.Content value="endpoints">
        <div className="grid lg:grid-cols-2 gap-4">
          {trustData.endpoints.map((endpoint) => (
            <Card key={endpoint.name} hoverable={false} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{endpoint.name}</p>
                <p className="text-xs text-white/60">{endpoint.url}</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 text-xs font-semibold">
                Active
              </span>
            </Card>
          ))}
        </div>
      </Tabs.Content>

      <Tabs.Content value="certifications">
        <div className="grid md:grid-cols-2 gap-4">
          {trustData.certifications.map((item) => (
            <Card key={item.title} hoverable={false}>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-white/60 mt-1">Issued {item.issued}</p>
              <p className="text-sm text-white/60 mt-4">{item.summary}</p>
            </Card>
          ))}
        </div>
      </Tabs.Content>

      <Tabs.Content value="security">
        <div className="grid md:grid-cols-2 gap-4">
          {trustData.securityFeatures.map((feature) => (
            <Card key={feature.title} hoverable={false}>
              <p className="text-sm font-semibold">{feature.title}</p>
              <p className="text-sm text-white/60 mt-2">{feature.detail}</p>
            </Card>
          ))}
        </div>
      </Tabs.Content>

      <Tabs.Content value="activity">
        <div className="space-y-4">
          {trustData.activity.map((log) => (
            <Card key={log.id} hoverable={false} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{log.event}</p>
                <p className="text-xs text-white/60">{log.timestamp}</p>
              </div>
              <span className="text-xs text-white/60">{log.actor}</span>
            </Card>
          ))}
        </div>
      </Tabs.Content>
    </section>
  )
}

export default TrustCenter
