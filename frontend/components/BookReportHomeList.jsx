import BookReportHomeItem from './BookReportHomeItem';

function BookReportHomeList({ reviews, books }) {
  return (
    <section className="review-section">

      <div className="review-title-wrap">

        <h2 className="section-main-title">
          인기 리뷰
        </h2>

      </div>

      <div className="review-list">

        {reviews.map((review) => {
          const bookTitle = books.find(
            (b) => String(b.id) === String(review.bookId)
          )?.title;

          return (
            <BookReportHomeItem
              review={review}
              bookTitle={bookTitle}
              key={review.id}
            />
          );
        })}

      </div>

    </section>
  );
}

export default BookReportHomeList;
