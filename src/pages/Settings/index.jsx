import Card from '../../components/Card'

const Settings = () => {
  return (
    <section className="space-y-6 pb-12">
      <Card hoverable={false} className="space-y-4">
        <h2 className="text-2xl font-semibold">Portal Settings</h2>
        <p className="text-sm text-white/70">
          Configuration tools for theme preferences, API key management, and notification routing will live here.
          Customize the developer workspace to match your enterprise controls and governance policies.
        </p>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          'Theme Modes',
          'API Key Management',
          'Access Controls',
          'Audit Logs'
        ].map((item) => (
          <Card key={item} hoverable={false} className="text-sm text-white/60">
            <p className="font-semibold text-white mb-2">{item}</p>
            Coming soon — configure advanced options tailored to your organization.
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Settings
