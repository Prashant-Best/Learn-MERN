import { useEffect, useMemo, useState } from 'react'
import './dashboard.css'

function Dashboard({ user, onLogout }) {
  const name = user?.name || user?.email?.split('@')[0] || 'there'
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskNote, setTaskNote] = useState('')
  const [message, setMessage] = useState('')
  const [activePage, setActivePage] = useState('overview')

  useEffect(() => {
    if (!user?.email) return

    const savedTasks = localStorage.getItem(`northstar-tasks-${user.email}`)
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks([])
    }
  }, [user?.email])

  useEffect(() => {
    if (!user?.email) return
    localStorage.setItem(`northstar-tasks-${user.email}`, JSON.stringify(tasks))
  }, [tasks, user?.email])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  const pendingCount = tasks.length - completedCount
  const pageContent = {
    overview: {
      title: 'Overview',
      tagline: 'Performance Snapshot',
      description: 'See your daily progress and stay focused on your priorities.',
      bullets: ['3 active tasks scheduled', '1 task completed today', 'Daily momentum is improving'],
    },
    reports: {
      title: 'Reports',
      tagline: 'Weekly Insights',
      description: 'Review the latest numbers and keep your work moving forward.',
      bullets: ['Weekly progress report ready', 'Customer response time improved', 'Next review scheduled for Friday'],
    },
    team: {
      title: 'Team',
      tagline: 'Collaboration',
      description: 'Share updates and keep everyone aligned on the same goals.',
      bullets: ['2 teammates online now', 'New project brief shared', 'Standup meeting at 10:30 AM'],
    },
    settings: {
      title: 'Settings',
      tagline: 'Preferences',
      description: 'Adjust your workspace preferences and manage account details.',
      bullets: ['Notifications enabled', 'Theme set to light mode', 'Security checks are up to date'],
    },
  }

  const currentPage = pageContent[activePage] || pageContent.overview

  const handleAddTask = (event) => {
    event.preventDefault()

    const title = taskTitle.trim()
    if (!title) {
      setMessage('Please enter a task title.')
      return
    }

    const newTask = {
      id: Date.now(),
      title,
      note: taskNote.trim(),
      completed: false,
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setTaskTitle('')
    setTaskNote('')
    setMessage('Task added successfully.')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>Northstar</h2>
        <p className="sidebar-text">Workspace dashboard</p>
        <ul>
          <li>
            <button
              type="button"
              className={activePage === 'overview' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage('overview')}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              type="button"
              className={activePage === 'reports' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage('reports')}
            >
              Reports
            </button>
          </li>
          <li>
            <button
              type="button"
              className={activePage === 'team' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage('team')}
            >
              Team
            </button>
          </li>
          <li>
            <button
              type="button"
              className={activePage === 'settings' ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage('settings')}
            >
              Settings
            </button>
          </li>
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
            <p className="hero-tag">{currentPage.tagline}</p>
            <h2>{currentPage.title}</h2>
            <p>{currentPage.description}</p>
          </div>
          <img src="/dashboard-illustration.svg" alt="Dashboard illustration" className="hero-image" />
        </section>

        <section className="detail-card">
          <h3>{currentPage.title} details</h3>
          <ul>
            {currentPage.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Tasks</p>
            <h3>{tasks.length}</h3>
          </div>
          <div className="stat-card">
            <p>Completed</p>
            <h3>{completedCount}</h3>
          </div>
          <div className="stat-card">
            <p>Pending</p>
            <h3>{pendingCount}</h3>
          </div>
        </section>

        <section className="task-section">
          <div className="task-panel">
            <h3>Today&apos;s Plan</h3>
            <form className="task-form" onSubmit={handleAddTask}>
              <input
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Add a task"
              />
              <input
                value={taskNote}
                onChange={(event) => setTaskNote(event.target.value)}
                placeholder="Optional note"
              />
              <button type="submit">Add Task</button>
            </form>
            {message ? <p className="task-message">{message}</p> : null}
          </div>

          <div className="task-panel">
            <h3>Task List</h3>
            <ul className="task-list">
              {tasks.length ? (
                tasks.map((task) => (
                  <li key={task.id} className={task.completed ? 'task-item completed' : 'task-item'}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span>
                        <strong>{task.title}</strong>
                        {task.note ? <small>{task.note}</small> : null}
                      </span>
                    </label>
                    <button type="button" className="delete-task-btn" onClick={() => deleteTask(task.id)}>
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="empty-task">No tasks yet. Add one to get started.</li>
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
