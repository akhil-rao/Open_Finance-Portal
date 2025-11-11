import { ChevronDown, ExternalLink } from 'lucide-react'
import useAppStore from '../../store/useAppStore'
import apiDocs from '../../data/apiDocs.json'
import Card from '../../components/Card'

const methodColors = {
  GET: 'text-emerald-300 bg-emerald-500/10',
  POST: 'text-sky-300 bg-sky-500/10',
  PUT: 'text-amber-300 bg-amber-500/10',
  DELETE: 'text-rose-300 bg-rose-500/10'
}

const APIDocs = () => {
  const { docsExpanded, toggleDocsExpanded } = useAppStore()

  return (
    <section className="space-y-6 pb-12">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25">
          Swagger <ExternalLink className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {apiDocs.map((doc) => {
          const isOpen = Boolean(docsExpanded[doc.id])
          return (
            <div key={doc.id} className="overflow-hidden rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => toggleDocsExpanded(doc.id)}
                className="glass-card flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/12"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase ${methodColors[doc.method]}`}>
                    {doc.method}
                  </span>
                  <div>
                    <p className="font-semibold">{doc.path}</p>
                    <p className="text-sm text-white/60">{doc.summary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>v{doc.version}</span>
                  <span>{doc.pricing}</span>
                  <span className="text-brand-orange">⭐ {doc.rating}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </div>
              </button>
              <div
                className={`bg-slate-950/60 transition-[max-height,opacity] duration-300 ease-out ${
                  isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {isOpen && (
                  <div className="mt-4 grid gap-6 px-6 pb-6 md:grid-cols-2">
                    <Card hoverable={false}>
                      <h4 className="mb-3 text-lg font-semibold">Request</h4>
                      <pre className="text-sm text-white/80 whitespace-pre-wrap">
                        {JSON.stringify(doc.requestExample, null, 2)}
                      </pre>
                    </Card>
                    <Card hoverable={false}>
                      <h4 className="mb-3 text-lg font-semibold">Response</h4>
                      <pre className="text-sm text-white/80 whitespace-pre-wrap">
                        {JSON.stringify(doc.responseExample, null, 2)}
                      </pre>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default APIDocs
