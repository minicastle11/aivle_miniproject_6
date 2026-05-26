import { formatDate, getLatestDate } from "./utils.js";
import { useState } from 'react';
function ReviewItem({ review, bookTitle, onLike, onEdit, onDelete }) {

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(review.nickname);
  const [content, setContent] = useState(review.content);

  const handleUpdate = async ()=>{

    if (!nickname.trim()) {
      alert("닉네임을 입력하세요.");
      return;
    }

    if (!content.trim()) {
      alert("리뷰 내용을 입력하세요.");
      return;
    }
    const updated = {
      nickname: nickname,
      content: content,
      updatedAt: formatDate(new Date())
    }
    try {
      const ret = await onEdit(review.id, updated);
      setIsEditing(false)
    }catch{
      alert('리뷰 업데이트 실패');
      setIsEditing(true);
    }
  }

  if (isEditing){
    return(
    <div>
       <input
        type="text"
        value={nickname}
        onChange={(event) => setNickname(event.target.value)}
      />
      <input
        type="text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button className="sub-button" onClick={handleUpdate}>
            수정하기
      </button>
      <button className="sub-button" onClick={()=>{setIsEditing(false)}}>
            취소
      </button>
    </div>
    )
  }
  else
    return (
      <article >
        <div className="detail-review-item">
          <p className="review-nickname">{nickname}</p>
          <p className="review-content">{content}</p>
          <p className="review-date">
            최근 작성/수정:
          </p>
        </div>

        <div className="review-actions">
          <button className="mini-like-button" onClick={()=>{ onLike(review.id) }}>
            👍 {review.likes}
          </button>
          <button className="sub-button" onClick={()=>{setIsEditing(true)}}>
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
