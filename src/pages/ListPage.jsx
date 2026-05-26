import { Link } from 'react-router-dom';
import db from '../../db.json';

function ListPage() {

  const books = db.books;

  return (
    <div className="list-page">

      <div className="page-title">


      </div>

      <div className="book-list">

        {books.map((book) => (

          <div className="book-card" key={book.id}>

            <div className="image-wrap">

              <img
                src={book.coverImageUrl}
                alt={book.title}
              />

            </div>

            <div className="book-content">

              <h2>{book.title}</h2>

              <span className="author">
                {book.author}
              </span>

              <div className="book-like">
                ❤️ {book.likes}
              </div>

              <Link
                to={`/detail/${book.id}`}
                className="detail-link"
              >

                자세히 보기

              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ListPage;