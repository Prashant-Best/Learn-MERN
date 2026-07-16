import './dashboard.css'

function Dashboard({ user, onLogout }) {
  const name = user?.name || user?.email?.split('@')[0] || 'there'

  const stats = [
    { title: 'Active Users', value: '1,240' },
    { title: 'Revenue', value: '$24K' },
    { title: 'Growth', value: '+18%' },
  ]

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>Northstar</h2>
        <p className="sidebar-text">Analytics dashboard</p>
        <ul>
          <li className="active">Overview</li>
          <li>Reports</li>
          <li>Team</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>Hello, {name}</h1>
          </div>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </header>

        <section className="hero-panel">
          <div>
            <p className="hero-tag">Performance Overview</p>
            <h2>Your business is growing steadily.</h2>
            <p>Track your latest activity, conversions, and customer engagement in one place.</p>
          </div>
          <img src="/dashboard-illustration.svg" alt="Dashboard illustration" className="hero-image" />
        </section>

        <section className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.title}>
              <p>{item.title}</p>
              <h3>{item.value}</h3>
            </div>
          ))}
        </section>

        <section className="activity-card">
          <h3>Recent Activity</h3>
          <ul>
            <li>New client onboarding completed</li>
            <li>Weekly report shared with the team</li>
            <li>Customer retention improved this month</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
