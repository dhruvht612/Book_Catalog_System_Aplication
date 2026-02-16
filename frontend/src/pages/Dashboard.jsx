import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import SearchBar from '../components/SearchBar'
import './Dashboard.css'

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', genre: 'Fiction', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', genre: 'Fiction', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', genre: 'Science Fiction', year: 1949 },
]

function Dashboard() {
  const { user, signOut } = useAuth()
  const [books, setBooks] = useState(initialBooks)
  const [search, setSearch] = useState('')
  const [editingBook, setEditingBook] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }])
    setShowForm(false)
  }

  const handleUpdateBook = (updated) => {
    setBooks(books.map((b) => (b.id === updated.id ? updated : b)))
    setEditingBook(null)
  }

  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id))
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setShowForm(false)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1>Book Catalog</h1>
          <p className="dashboard-welcome">Welcome back, {user?.name || 'User'}</p>
        </div>
        <button className="btn btn-signout" onClick={signOut}>
          Sign Out
        </button>
      </header>

      <main className="dashboard-main">
        <div className="controls">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by title, author, or genre..." />
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingBook(null) }}>
            + Add Book
          </button>
        </div>

        {(showForm || editingBook) && (
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onCancel={() => { setShowForm(false); setEditingBook(null) }}
          />
        )}

        <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDeleteBook} />
      </main>
    </div>
  )
}

export default Dashboard
