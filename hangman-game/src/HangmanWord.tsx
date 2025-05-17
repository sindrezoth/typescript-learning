type HangmanWordProps = {
  guessedLetters: string[],
  wordToGuess: string,
  isEndGame: boolean
}

const HangmanWord = ({ guessedLetters, wordToGuess, isEndGame}: HangmanWordProps) => {
  return (
    <div className="hangman-word">
      {wordToGuess.split("").map((letter, i) => <span className="word-letter" key={i+letter}>
        <span className={ guessedLetters.includes(letter) ? "" : isEndGame ? "non-guessed-letter" : "word-letter-hidden"}>
          {letter}
        </span>
      </span>
      )}
    </div>
  );
};

export default HangmanWord;
