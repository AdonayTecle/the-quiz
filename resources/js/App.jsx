import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Quiz from './components/Quiz';
import HighScores from './components/HighScores';
import '../css/app.css';

function App() {
  const [quizData, setQuizData] = useState(null);

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
    <Router>
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
          <Route path="/" element={<Quiz quizData={quizData} />} />
          <Route path="high-scores" element={<HighScores />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
