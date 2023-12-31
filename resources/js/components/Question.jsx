import React from 'react';
import '../../css/app.css';

function Question({ question, onAnswer }) {
  return (
    <div className="question">
      <h2 className="question-text">{question.name}</h2>
      {question.scores.map((choice, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`choice-${index}`}
            name="choices"
            value={choice[1]}
            onChange={() => onAnswer(choice[1])}
          />
          <label className="choice-label" htmlFor={`choice-${index}`}>
            {choice[0]}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question;
