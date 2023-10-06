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
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = () => {
 
    const dataToSend = {
      name: this.state.name,
      email: this.state.email,
      score: this.calculateScore(this.props.questions, this.props.userAnswers),
    };
    
    axios.post('/api/submit-score', dataToSend)
      .then((response) => {
        
        console.log('Score submitted successfully:', response.data);
        this.setState({ submitted: true });
      })
      .catch((error) => {
        
        console.error('Error submitting score:', error);
      });
    

    
    this.setState({ submitted: true });
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
            <p>Submit your name and email address to save your score:</p>
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
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
    
    if (score === questions.length) {
      return 'Great job!';
    } else if (score >= questions.length * 0.75) {
      return 'You did alright.';
    } else if (score >= questions.length * 0.5) {
      return 'Better luck next time.';
    } else {
      return 'Maybe you should try a little harder.';
    }
  }
}

export default QuizResults;
