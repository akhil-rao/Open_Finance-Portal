import aiAgents from '../../data/aiAgents.json'
import Card from '../../components/Card'
import { BrainCircuit } from 'lucide-react'

const AIAgents = () => {
  return (
    <section className="space-y-8 pb-12">
      <div className="glass-card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            AI Agents <span className="text-sm font-medium text-sky-300">(In Development)</span>
          </h2>
          <p className="text-sm text-white/70 mt-2 max-w-2xl">
            Explore the upcoming suite of intelligent copilots designed to accelerate compliance reviews, fraud
            detection, and data quality analysis. Request beta access to collaborate on the roadmap.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {aiAgents.map((agent) => (
          <div
            key={agent.id}
            title="In Development"
            className="relative p-[1px] rounded-3xl bg-gradient-to-br from-[#15b1d7] to-[#023d69] shadow-2xl"
          >
            <Card hoverable className="rounded-3xl h-full" onClick={(event) => event.preventDefault()}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-blue via-brand-teal to-brand-orange">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{agent.name}</h3>
                  <p className="text-sm text-white/60 mt-2">{agent.tagline}</p>
                  <p className="text-xs text-white/40 mt-4">{agent.status}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AIAgents
