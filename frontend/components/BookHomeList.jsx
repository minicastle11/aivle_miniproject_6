import BookHomeItem from './BookHomeItem';

function BookHomeList({ books }) {
  return (
    <section className="top-book-section">

      <div className="section-title">
        <h2 className="section-main-title">
          월간 인기 도서
        </h2>
      </div>

      <div className="book-list">

        {books.map((book) => (
          <BookHomeItem
            book={book}
            key={book.id}
          />
        ))}

      </div>

    </section>
  );
}

export default BookHomeList;
