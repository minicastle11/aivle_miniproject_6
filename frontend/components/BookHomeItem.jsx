import { Link } from 'react-router-dom';

function BookHomeItem({ book }) {
  return (
    <div className="book-card">

      <Link
        to={`/detail/${book.id}`}
        className="image-link"
      >

        <div className="image-wrap">

          <img
            src={book.coverImageUrl}
            alt={book.title}
          />

        </div>

      </Link>

      <div className="book-content">

        <div className="top-row">

          <h2>
            {book.title}
          </h2>

          <div className="book-like">
            ❤️ {book.likes}
          </div>

        </div>

        <span className="author">
          {book.author}
        </span>

      </div>

    </div>
  );
}

export default BookHomeItem;
