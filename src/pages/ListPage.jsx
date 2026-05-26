import { Link } from 'react-router-dom';
import { useState } from 'react';
import db from '../../db.json';

function ListPage() {

  const [sortType, setSortType] = useState('latest');

  const books = [...db.books];

  // 정렬
  const sortedBooks = books.sort((a, b) => {

    if (sortType === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortType === 'title') {
      return a.title.localeCompare(b.title);
    }

    if (sortType === 'likes') {
      return b.likes - a.likes;
    }

    return 0;
  });

  return (
    <div className="list-page">

      <div className="sort-menu">

        <button
          className={sortType === 'latest' ? 'active' : ''}
          onClick={() => setSortType('latest')}
        >
          최신순
        </button>

        <button
          className={sortType === 'title' ? 'active' : ''}
          onClick={() => setSortType('title')}
        >
          이름순
        </button>

        <button
          className={sortType === 'likes' ? 'active' : ''}
          onClick={() => setSortType('likes')}
        >
          좋아요순
        </button>

      </div>

      {/* 책 목록 */}
      <div className="book-list">

        {sortedBooks.map((book) => (

          <div
            className="book-card"
            key={book.id}
          >

            <div className="image-wrap">

              <img
                src={book.coverImageUrl}
                alt={book.title}
              />

            </div>

            <div className="book-content">

              <h2>
                {book.title}
              </h2>

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