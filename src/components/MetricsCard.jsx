import Card from './Card'

const MetricsCard = ({ title, value, sublabel, icon: Icon, accent = 'from-brand-teal to-brand-orange' }) => (
  <Card className="hover:bg-white/12">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-white/60">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
        {sublabel && <p className="text-sm text-white/60 mt-1">{sublabel}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${accent} text-white/90 shadow-lg`}> 
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  </Card>
)

export default MetricsCard
