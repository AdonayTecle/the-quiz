import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import Quiz from './components/Quiz';
import HighScores from './components/HighScores';
import QuizResults from './components/QuizResults';
import '../css/app.css';

function App() {
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('api/quiz-data')
      .then((response) => {
        setQuizData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  if (!quizData) {
    return <div>Loading...</div>;
  }  

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="high-scores">High Scores</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Quiz quizData={quizData} navigate={navigate} />}
        />
        <Route path="high-scores" element={<HighScores />} />
      </Routes>
    </div>
  );
}

export default App;
