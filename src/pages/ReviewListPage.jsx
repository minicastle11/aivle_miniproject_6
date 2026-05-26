import { Link } from 'react-router-dom';

function ReviewListPage({ reviews, books }) {
    const sortedReviews = [...reviews]
        .sort((a, b) => b.likes - a.likes);

    return (
        <div className="review-page">

        <h1 className="review-page-title">
            전체 리뷰
        </h1>

        <div className="review-list-page">

            {sortedReviews.map((review) => {

            const book = books.find(
                (b) =>
                String(b.id) ===
                String(review.bookId)
            );

            return (

                <Link
                key={review.id}
                to={`/detail/${review.bookId}`}
                className="review-card-link"
                >
            <div className="review-card" style={{'--book-cover': `url(${book?.coverImageUrl})`}}>
                <div className="review-top">
                    <div>
                        <h3>
                        {review.nickname}
                        </h3>
                        <span>
                        {book?.title}
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
                </Link>
            );
            })}

        </div>
        </div>
    );
    }

export default ReviewListPage;