import React, { useState } from 'react';
import Question from './Question';
import QuizResults from './QuizResults';
import '../../css/app.css';

const Quiz = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(Object.keys(quizData.questions).length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const questions = Object.values(quizData.questions);

  const handleAnswer = (answerIndex) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = answerIndex;

    setUserAnswers(updatedUserAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz">
      <h1 className="quiz-name">{quizData.quiz_name}</h1>

      {showResults ? (
        <QuizResults questions={questions} userAnswers={userAnswers} />
      ) : (
        <div>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />

          <div className="quiz-navigation">
            <button className="quiz-button" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 && (
              <button className="quiz-button" onClick={handleNext}>Next</button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button className="quiz-button" onClick={handleShowResults}>Submit Answers</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
