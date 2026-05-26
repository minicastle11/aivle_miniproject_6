import { useEffect, useMemo, useState } from "react";
import BookHomeItem from "./BookHomeItem";

const API_BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function BookHomeList() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const [bookData, reviewData] = await Promise.all([
        request("/books"),
        request("/reviews"),
      ]);

      setBooks(bookData || []);
      setReviews(reviewData || []);
    } catch (error) {
      alert("인기 도서를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const topBooks = useMemo(() => {
    return [...books]
      .sort((a, b) => Number(b.likes || 0) - Number(a.likes || 0))
      .slice(0, 10);
  }, [books]);

  function getReviewCount(bookId) {
    return reviews.filter((review) => Number(review.bookId) === Number(bookId))
      .length;
  }

  async function handleLike(book) {
    try {
      const updatedBook = await request(`/books/${book.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          likes: Number(book.likes || 0) + 1,
          updatedAt: new Date().toISOString(),
        }),
      });

      setBooks((prev) =>
        prev.map((item) => (item.id === updatedBook.id ? updatedBook : item))
      );
    } catch (error) {
      alert("도서 좋아요 처리에 실패했습니다.");
    }
  }

  if (loading) {
    return <p className="empty-text">인기 도서를 불러오는 중...</p>;
  }

  return (
    <section className="section">
      <h2>인기 도서</h2>

      <div className="home-book-row">
        {topBooks.map((book) => (
          <BookHomeItem
            key={book.id}
            book={book}
            reviewCount={getReviewCount(book.id)}
            onLike={handleLike}
          />
        ))}
      </div>
    </section>
  );
}

export default BookHomeList;
