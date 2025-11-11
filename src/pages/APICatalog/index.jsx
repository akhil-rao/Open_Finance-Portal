import { useMemo } from 'react'
import { Stars, ArrowRight, BadgeCheck } from 'lucide-react'
import Card from '../../components/Card'
import Tabs from '../../components/Tabs'
import Drawer from '../../components/Drawer'
import useAppStore from '../../store/useAppStore'
import apiCatalog from '../../data/apiCatalog.json'
import apiDocs from '../../data/apiDocs.json'

const tabs = [
  { label: 'Retail Banking', value: 'retail' },
  { label: 'Corporate Banking', value: 'corporate' },
  { label: 'Investment Banking', value: 'investment' }
]

const categories = [
  { label: 'All', value: 'all' },
  { label: 'KYC/Identity', value: 'kyc' },
  { label: 'KYB', value: 'kyb' },
  { label: 'Risk & Fraud', value: 'risk' },
  { label: 'Lending', value: 'lending' },
  { label: 'Transaction Intelligence', value: 'transaction' },
  { label: 'Compliance', value: 'compliance' }
]

const APICatalog = () => {
  const { catalogTab, setCatalogTab, catalogCategory, setCatalogCategory, selectedApiId, setSelectedApiId } =
    useAppStore()

  const filteredApis = useMemo(() => {
    return apiCatalog.filter((api) => {
      const matchesTab = api.segment === catalogTab
      const matchesCategory = catalogCategory === 'all' || api.category === catalogCategory
      return matchesTab && matchesCategory
    })
  }, [catalogTab, catalogCategory])

  const selectedApi = selectedApiId ? apiDocs.find((doc) => doc.id === selectedApiId) : null

  return (
    <section className="space-y-8 pb-12">
      <Tabs tabs={tabs} value={catalogTab} onValueChange={setCatalogTab} />

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setCatalogCategory(category.value)}
            className={`glass-card px-4 py-2 text-sm font-medium transition border border-white/10 ${
              catalogCategory === category.value ? 'bg-white/20 text-white shadow-xl' : 'text-white/70 hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
        {filteredApis.map((api) => (
          <Card key={api.id} onClick={() => setSelectedApiId(api.id)}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wide text-white/60">{api.tag}</span>
                <h3 className="text-xl font-semibold mt-2">{api.title}</h3>
              </div>
              <div className="text-right text-sm text-white/60">
                <p>v{api.version}</p>
                <p className="mt-1">{api.pricing}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70">{api.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-brand-orange">
                <Stars className="h-4 w-4" />
                <span>{api.rating} / 5.0</span>
              </div>
              <p className="text-white/50">Published {api.published}</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25">
                View Details <ArrowRight className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10">
                Subscribe
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Drawer
        open={Boolean(selectedApi)}
        onOpenChange={(isOpen) => !isOpen && setSelectedApiId(null)}
        title={selectedApi?.title}
        description={selectedApi?.summary}
      >
        {selectedApi && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <p className="text-xs uppercase text-white/60">Version</p>
                <p className="text-lg font-semibold">{selectedApi.version}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase text-white/60">Pricing</p>
                <p className="text-lg font-semibold">{selectedApi.pricing}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase text-white/60">Rating</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Stars className="h-5 w-5 text-brand-orange" />
                  {selectedApi.rating} / 5.0
                </p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase text-white/60">Compliance</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-brand-teal" />
                  {selectedApi.compliance}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Endpoints</h4>
              <div className="space-y-3">
                {selectedApi.endpoints.map((endpoint) => (
                  <div key={endpoint.path} className="glass-card p-4 flex items-center justify-between text-sm">
                    <span className="px-3 py-1 rounded-lg bg-white/15 font-semibold uppercase tracking-wide text-xs">
                      {endpoint.method}
                    </span>
                    <code className="text-white/80">{endpoint.path}</code>
                    <span className="text-white/50">{endpoint.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Sample Request</h4>
              <pre className="glass-card p-4 text-sm whitespace-pre-wrap text-white/80">
                {JSON.stringify(selectedApi.sampleRequest, null, 2)}
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Sample Response</h4>
              <pre className="glass-card p-4 text-sm whitespace-pre-wrap text-white/80">
                {JSON.stringify(selectedApi.sampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Drawer>
    </section>
  )
}

export default APICatalog
