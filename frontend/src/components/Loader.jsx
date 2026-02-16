import './Loader.css'

function Loader() {
  return (
    <div className="loader-overlay" aria-label="Loading">
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading...</p>
    </div>
  )
}

export default Loader
