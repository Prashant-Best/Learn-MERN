import './login.css'

function Dashboard() {
  const stats = [
    { title: 'Total Users', value: '1,240' },
    { title: 'Revenue', value: '$24K' },
    { title: 'Orders', value: '320' },
    { title: 'Feedback', value: '85' },
  ]

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li>Overview</li>
          <li>About US</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>Here’s your summary</h1>
          </div>
          <button type="button" className="primary-btn">+ New Report</button>
        </header>

        <section className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.title}>
              <p>{item.title}</p>
              <h3>{item.value}</h3>
            </div>
          ))}
        </section>

        <section className="content-card">
          <h3>Recent Activity</h3>
          <ul>
            <li>New user signed up 10 minutes ago</li>
            <li>Payment processed successfully</li>
            <li>Weekly report generated</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
