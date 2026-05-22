import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';

function App() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const booksRes = await fetch('http://localhost:3001/books');
        const reviewsRes = await fetch('http://localhost:3001/reviews');
        setBooks(await booksRes.json());
        setReviews(await reviewsRes.json());
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>도서관리</h1>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/list">도서목록</Link>
          <Link to="/create">새 도서</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage books={books} reviews={reviews} />} />
          <Route path="/list" element={<ListPage books={books} />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/detail/:id" element={<DetailPage books={books} reviews={reviews} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;