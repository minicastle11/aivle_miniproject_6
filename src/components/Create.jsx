import { useState } from 'react';

function Create({ onCreate }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !author.trim()) {
      alert('제목과 저자를 입력하세요');
      return;
    }
    onCreate({ title, author, content, likes: 0 });
  };

  return (
    <div className="create-form">
      <div className="form-group">
        <label>제목</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="책 제목" />
      </div>

      <div className="form-group">
        <label>저자</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="저자 이름" />
      </div>

      <div className="form-group">
        <label>내용</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="책 소개" rows={5} />
      </div>

      <button className="detail-btn" onClick={handleSubmit}>등록하기</button>
    </div>
  );
}

export default Create;