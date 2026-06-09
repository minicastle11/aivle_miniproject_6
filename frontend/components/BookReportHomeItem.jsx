function BookReportHomeItem({ review, bookTitle }) {
  return (
    <div className="review-card">

      <div className="review-top">

        <div>

          <h3>
            {review.nickname}
          </h3>
          <span>
            {bookTitle}
          </span>

        </div>

        <div className="review-like">
          ❤️ {review.likes}
        </div>

      </div>

      <p>
        {review.content}
      </p>

    </div>
  );
}

export default BookReportHomeItem;
