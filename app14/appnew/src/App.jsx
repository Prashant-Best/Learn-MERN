import { useEffect, useState } from 'react'
import Login from './login.jsx'
import SignUp from './sign-up.jsx'
import Dashboard from './dashboard.jsx'

const USERS_STORAGE_KEY = 'northstar-users'
const SESSION_STORAGE_KEY = 'northstar-session'

function App() {
  const [view, setView] = useState('login')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(() => {
    if (typeof window === 'undefined') return []
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
    return storedUsers ? JSON.parse(storedUsers) : []
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }

    if (storedSession) {
      const sessionUser = JSON.parse(storedSession)
      setUser(sessionUser)
      setView('dashboard')
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY)
    }
  }, [user])

  const handleLogin = (email, password) => {
    const foundUser = users.find(
      (savedUser) =>
        savedUser.email.toLowerCase() === email.toLowerCase() && savedUser.password === password
    )

    if (!foundUser) {
      return false
    }

    setUser(foundUser)
    setView('dashboard')
    return true
  }

  const handleSignUp = (name, email, password) => {
    const alreadyExists = users.some(
      (savedUser) => savedUser.email.toLowerCase() === email.toLowerCase()
    )

    if (alreadyExists) {
      return false
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    }

    setUsers((currentUsers) => [...currentUsers, newUser])
    setUser(newUser)
    setView('dashboard')
    return true
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
