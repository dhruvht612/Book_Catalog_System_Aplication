import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Hero.css'

function Hero() {
  const { signIn } = useAuth()
  const [showSignIn, setShowSignIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!password) {
      setError('Please enter your password')
      return
    }
    signIn(email.trim(), password)
  }

  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1 className="hero-title">Book Catalog</h1>
        <p className="hero-subtitle">Organize, discover, and manage your personal library</p>
        <p className="hero-description">
          Keep track of your favorite reads. Search, add, and browse your collection in one place.
        </p>
        {!showSignIn ? (
          <button className="btn btn-hero" onClick={() => setShowSignIn(true)}>
            Sign In
          </button>
        ) : (
          <form className="hero-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="hero-form-error">{error}</p>}
            <button type="submit" className="btn btn-hero">Sign In</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Hero
