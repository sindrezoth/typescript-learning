import { useState, useEffect } from "react";
import words from "./words";
import "./index.css";

function App() {
  const [wordToGuess, SetWordToGuess] = useState("Test");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const newWordHandle = () => {
    SetWordToGuess(words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => {
    newWordHandle();
  }, []);

  return (
    <div className="game-container">
      <h1>Hangman!</h1>
      <h2 className="game-results">Win/Lose</h2>


      <p>Some word: {wordToGuess}</p>
      <button onClick={newWordHandle}>new word</button>
    </div>
  );
}

export default App;
