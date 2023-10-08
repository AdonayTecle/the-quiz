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
      <table>
      <caption>High Scores</caption>
        <tr>
          <th>Name</th>
          <th>Score</th>
      </tr>
        {
        highScores.length > 0 ? (
          highScores.map((score, index) => (
            <tr>
            <td key={index}>{score.name}</td>
            <td>{score.score}</td>
            </tr>
          ))
          ):(
            <p>No scores to show.</p>
          )
        } 
        </table>
    </div>
  );
}

export default HighScores;
