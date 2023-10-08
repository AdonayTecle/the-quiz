import React, { Component } from 'react';
import axios from 'axios';
import '../../css/app.css';

class QuizResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      submitted: false,
      nameError: '',
      emailError: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = () => {
    const { name, email } = this.state;

      //email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (name.trim() === '') {
      this.setState({ nameError: 'Name is required' });
      return;
    }

    if (email.trim() === '') {
      this.setState({ emailError: 'Email is required' });
      return;
    }

    if (!email.match(emailPattern)) {
      this.setState({ emailError: 'Invalid email' });
      return;
    }

    const dataToSend = {
      name,
      email,
      score: this.calculateScore(this.props.questions, this.props.userAnswers),
    };

    //send a POST request to submit the score
    axios
      .post('/api/submit-score', dataToSend)
      .then((response) => {
        console.log('Score submitted successfully:', response.data);
        this.setState({ submitted: true });
        
        //redirect to high-scores route
        this.props.navigate('/high-scores');
        
      })
      .catch((error) => {
        alert('There was a problem submitting the score');
        console.error('Error submitting score:', error);
      });
  };

  render() {
    const { questions, userAnswers } = this.props;
    const score = this.calculateScore(questions, userAnswers);

    return (
      <div className="quiz-results">
        <p className="quiz-results-message">{this.getResultMessage(score, questions)}</p>
        <p className="quiz-results-score">
          Your score is <b>{score}</b>.
        </p>
        {this.state.submitted ? (
          <p>Thank you for submitting your score!</p>
        ) : (
          <div>
            <div className="input-group">
      <div>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
      <div>
        <span className="error-message">{this.state.nameError}</span>
      </div>
    </div>
    <div className="input-group">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
      </div>
      <div>
        <span className="error-message">{this.state.emailError}</span>
      </div>
    </div>
    <button onClick={this.handleSubmit}>Submit</button>

          </div>
        )}
      </div>
    );
  }

  calculateScore(questions, userAnswers) {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      score += userAnswers[i];
    }

    return score;
  }

  getResultMessage(score, questions) {

    let totalHighestScores = 0;

    questions.forEach(item => {
    let highestScore = -Infinity;
  
    item.scores.forEach(score => {
      const scoreValue = score[1];
      if (scoreValue > highestScore) {
        highestScore = scoreValue;
      }
    });

    totalHighestScores += highestScore;
  });

    if (score === totalHighestScores) {
      return 'Great job!';
    } else if (score >= totalHighestScores * 0.75) {
      return 'You did ok.';
    } else if (score >= totalHighestScores * 0.5) {
      return 'Better luck next time.';
    } else {
      return 'Today was not your day.';
    }
  }
}

export default QuizResults;
