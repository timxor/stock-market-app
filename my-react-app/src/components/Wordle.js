import React, { useState, useEffect } from 'react';
import './Wordle.css';

const WORDS = ['APPLE', 'LEMON', 'ORANGE', 'BANANA', 'GRAPE', 'MANGO']; // Sample list of words

const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

const Wordle = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(Array(5).fill(null)); // Feedback for each letter
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setTargetWord(getRandomWord());
  }, []);

  const handleInputChange = (event) => {
    setGuess(event.target.value.toUpperCase().substring(0, 5));
  };

  const handleSubmitGuess = () => {
    if (guess.length === 5 && !gameOver) {
      let newFeedback = [];
      let correct = 0;
      for (let i = 0; i < 5; i++) {
        if (guess[i] === targetWord[i]) {
          newFeedback.push('correct');
          correct++;
        } else if (targetWord.includes(guess[i])) {
          newFeedback.push('close');
        } else {
          newFeedback.push('incorrect');
        }
      }
      setFeedback(newFeedback);
      setTries(tries + 1);
      if (correct === 5 || tries === 5) {
        setGameOver(true);
      }
    }
  };

  const renderFeedback = () => {
    return feedback.map((item, index) => (
      <div key={index} className={`feedback-item ${item || ''}`}></div>
    ));
  };

  const renderInput = () => {
    return (
      <input
        type="text"
        value={guess}
        maxLength={5}
        onChange={handleInputChange}
        disabled={gameOver}
      />
    );
  };

  return (
    <div className="wordle-container">
      <h1>Wordle</h1>
      <div className="target-word">{targetWord}</div>
      <div className="feedback">{renderFeedback()}</div>
      <div className="input-container">
        {renderInput()}
        <button onClick={handleSubmitGuess} disabled={gameOver}>
          Guess
        </button>
      </div>
      {gameOver && <div className="game-over">{tries === 5 ? 'You lose!' : 'You win!'}</div>}
    </div>
  );
};

export default Wordle;
