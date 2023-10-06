import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    
    axios.get('/api/high-scores')
      .then((response) => {
        setHighScores(response.data);
      })
      .catch((error) => {
        console.error('Error fetching high scores:', error);
      });
  }, []);

  return (
    <div>
      <h1>High Scores</h1>
      <ul>
        {highScores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighScores;
