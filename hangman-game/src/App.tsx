import { useState, useEffect, useCallback } from "react";
import words from "./words";
import "./index.css";

import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function App() {
  const [wordToGuess, SetWordToGuess] = useState(
    words[Math.floor(Math.random() * words.length)],
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter),
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((current) => [...current, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [guessedLetters]);

  const newGameHandler = () => {
    SetWordToGuess(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
  };

  return (
    <div className="game-container">
      <h1>Hangman!</h1>
      <h2 className="game-results">
        {isWinner && "You won!"}
        {isLoser && "You lose!"}
      </h2>
      {(isWinner || isLoser) && (
        <button onClick={newGameHandler}>New Game</button>
      )}

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord 
        guessedLetters={guessedLetters} 
        wordToGuess={wordToGuess} 
        isEndGame={isLoser || isWinner}
      />
      <Keyboard
        activeLetters={guessedLetters.filter((letter) =>
          wordToGuess.includes(letter),
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        isEndGame={isLoser || isWinner}
      />
    </div>
  );
}

export default App;
