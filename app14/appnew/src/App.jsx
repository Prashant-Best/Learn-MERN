import { useState } from 'react'
import Login from './login.jsx'
import SignUp from './sign-up.jsx'
import Dashboard from './dashboard.jsx'

function App() {
  const [view, setView] = useState('login')
  const [user, setUser] = useState(null)

  const handleLogin = (email) => {
    setUser({ email })
    setView('dashboard')
  }

  const handleSignUp = (name, email) => {
    setUser({ name, email })
    setView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setView('login')
  }

  return (
    <div className="app-shell">
      {view === 'login' ? (
        <Login onLoginSuccess={handleLogin} onSwitchToSignUp={() => setView('signup')} />
      ) : null}

      {view === 'signup' ? (
        <SignUp onSignUpSuccess={handleSignUp} onSwitchToLogin={() => setView('login')} />
      ) : null}

      {view === 'dashboard' ? <Dashboard user={user} onLogout={handleLogout} /> : null}
    </div>
  )
}

export default App
