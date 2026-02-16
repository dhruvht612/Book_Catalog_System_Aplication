import { useState, useEffect } from 'react'
import './BookForm.css'

function BookForm({ book, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    year: '',
  })

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genre: book.genre,
        year: book.year ? String(book.year) : '',
      })
    } else {
      setForm({ title: '', author: '', isbn: '', genre: '', year: '' })
    }
  }, [book])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      year: form.year ? parseInt(form.year, 10) : null,
    }
    if (book) payload.id = book.id
    onSubmit(payload)
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? 'Edit Book' : 'Add Book'}</h2>
      <div className="form-row">
        <label>
          Title <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Author <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
        </label>
      </div>
      <div className="form-row two-cols">
        <label>
          ISBN <input type="text" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
        </label>
        <label>
          Year <input type="number" min="1000" max="2100" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="e.g. 2020" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Genre <input type="text" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="e.g. Fiction, Science Fiction" />
        </label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{book ? 'Save' : 'Add Book'}</button>
      </div>
    </form>
  )
}

export default BookForm
