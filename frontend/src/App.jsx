import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'
import Loader from './components/Loader'
import Hero from './pages/Hero'
import Dashboard from './pages/Dashboard'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) return <Loader />

  if (!user) return <Hero />

  return <Dashboard />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
