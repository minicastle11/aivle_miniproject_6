import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function ListPage({ books }) {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';
  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );
  const [sortType, setSortType] = useState('latest');

  const sortedBooks = [...filteredBooks].sort((a, b) => {

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
          {keyword && (

            <div className="search-result-title">

              "{keyword}" 검색 결과

              ({sortedBooks.length}권)

            </div>

          )}
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
      <div className="book-list">

        {sortedBooks.length === 0 ? (

          <div className="empty-result">
            검색 결과가 없습니다.
          </div>

        ) : (

          sortedBooks.map((book) => (
            <div
              className="book-card"
              key={book.id}
            >
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
                <h2>
                  {book.title}
                </h2>
                <span className="search-author">
                  {book.author}
                </span>
                <div className="book-like">
                  ❤️ {book.likes}
                </div>
              </div>
            </div>
          ))

        )}

      </div>

    </div>
  );
}

export default ListPage;