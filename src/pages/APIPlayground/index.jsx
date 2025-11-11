import { useEffect, useMemo, useState } from 'react'
import { Play, Terminal, Loader2 } from 'lucide-react'
import Card from '../../components/Card'
import Tabs from '../../components/Tabs'
import useAppStore from '../../store/useAppStore'
import apiDocs from '../../data/apiDocs.json'

const APIPlayground = () => {
  const {
    playgroundSelectedApi,
    setPlaygroundSelectedApi,
    playgroundLogs,
    addPlaygroundLog,
    resetPlaygroundLogs
  } = useAppStore()
  const supportedApis = useMemo(() => apiDocs.filter((doc) => doc.playground), [])
  const [activeTab, setActiveTab] = useState('request')
  const [requestPayload, setRequestPayload] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!playgroundSelectedApi && supportedApis.length) {
      setPlaygroundSelectedApi(supportedApis[0].id)
    }
  }, [playgroundSelectedApi, supportedApis, setPlaygroundSelectedApi])

  const selectedDoc = useMemo(
    () => supportedApis.find((doc) => doc.id === playgroundSelectedApi) || null,
    [playgroundSelectedApi, supportedApis]
  )

  useEffect(() => {
    if (selectedDoc?.method === 'POST' && selectedDoc.sampleRequest) {
      setRequestPayload(JSON.stringify(selectedDoc.sampleRequest, null, 2))
    } else {
      setRequestPayload('')
    }
  }, [selectedDoc])

  const handleSend = async () => {
    if (!selectedDoc) return

    setIsLoading(true)
    setError(null)
    setResponse(null)
    const url = `http://localhost:4000/${selectedDoc.mockPath}`

    try {
      const options = { method: selectedDoc.method }
      if (selectedDoc.method !== 'GET' && requestPayload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = requestPayload
      }
      const res = await fetch(url, options)
      const data = await res.json()
      setResponse(data)
      addPlaygroundLog({
        type: 'success',
        message: `${selectedDoc.method} ${selectedDoc.path}`,
        timestamp: new Date().toISOString()
      })
      setActiveTab('response')
    } catch (err) {
      setError(err.message)
      addPlaygroundLog({
        type: 'error',
        message: err.message,
        timestamp: new Date().toISOString()
      })
      setActiveTab('logs')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { label: 'Request', value: 'request' },
    { label: 'Response', value: 'response' },
    { label: 'Logs', value: 'logs' }
  ]

  return (
    <section className="space-y-8 pb-12">
      <Card hoverable={false}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">API Playground</h3>
            <p className="text-sm text-white/70 mt-1">
              Simulate calls using live mock data from the json-server instance.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs uppercase text-white/60 block mb-2">Select API</label>
              <select
                value={playgroundSelectedApi || ''}
                onChange={(event) => setPlaygroundSelectedApi(event.target.value)}
                className="glass-card px-4 py-2 rounded-xl bg-transparent text-sm"
              >
                {supportedApis.map((doc) => (
                  <option key={doc.id} value={doc.id} className="bg-slate-900">
                    {doc.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange px-5 py-3 font-semibold shadow-xl disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Send Request
            </button>
          </div>
        </div>
      </Card>

      {selectedDoc && (
        <Tabs tabs={tabs} value={activeTab} onValueChange={setActiveTab} />
      )}

      {selectedDoc && (
        <div>
          {activeTab === 'request' && (
            <Card hoverable={false} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{selectedDoc.title}</p>
                  <p className="text-xs text-white/60">{selectedDoc.method} {selectedDoc.path}</p>
                </div>
                <span className="text-xs text-white/50">Mock Path: /{selectedDoc.mockPath}</span>
              </div>
              {selectedDoc.method === 'GET' ? (
                <p className="text-sm text-white/70">
                  This endpoint does not require a request body. Update query parameters in the path to test different
                  scenarios.
                </p>
              ) : (
                <textarea
                  value={requestPayload}
                  onChange={(event) => setRequestPayload(event.target.value)}
                  rows={12}
                  className="w-full rounded-2xl bg-slate-900/80 border border-white/10 p-4 font-mono text-sm"
                />
              )}
            </Card>
          )}

          {activeTab === 'response' && (
            <Card hoverable={false} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Mock Response</h4>
                {error && <span className="text-sm text-rose-300">{error}</span>}
              </div>
              {response ? (
                <pre className="text-sm whitespace-pre-wrap text-white/80">
                  {JSON.stringify(response, null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-white/60">Send a request to view the mock response.</p>
              )}
            </Card>
          )}

          {activeTab === 'logs' && (
            <Card hoverable={false} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Execution Logs</h4>
                <button className="text-sm text-white/60 hover:text-white" onClick={resetPlaygroundLogs}>
                  Clear
                </button>
              </div>
              <div className="space-y-3">
                {playgroundLogs.length === 0 && (
                  <p className="text-sm text-white/60">No logs yet. Execute a request to track activity.</p>
                )}
                {playgroundLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`glass-card p-4 text-sm flex items-center gap-3 border ${
                      log.type === 'success' ? 'border-emerald-400/40' : 'border-rose-400/40'
                    }`}
                  >
                    <Terminal className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="font-medium">{log.message}</p>
                      <p className="text-xs text-white/50">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </section>
  )
}

export default APIPlayground
