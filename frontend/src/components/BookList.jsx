import './BookList.css'

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty-state">No books found. Add one to get started.</p>
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-card">
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <div className="book-meta">
              {book.genre && <span>{book.genre}</span>}
              {book.year && <span>{book.year}</span>}
              {book.isbn && <span>ISBN: {book.isbn}</span>}
            </div>
          </div>
          <div className="book-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(book)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BookList
