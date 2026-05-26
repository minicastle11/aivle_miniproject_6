import { formatDate, getLatestDate } from "./utils.js";

function ReviewItem({ review, bookTitle, onLike, onEdit, onDelete }) {

  return (
    <article >
      <div className="detail-review-item">
        <p className="review-nickname">{review.nickname}</p>
        <p className="review-content">{review.content}</p>
        <p className="review-date">
          최근 작성/수정:
        </p>
      </div>

      <div className="review-actions">
        <button className="mini-like-button" onClick={()=>{ onLike(review.id) }}>
          👍 {review.likes}
        </button>
        <button className="sub-button" onClick={onEdit}>
          수정
        </button>
        <button className="danger-button" onClick={()=>{onDelete(review.id)}}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default ReviewItem;
