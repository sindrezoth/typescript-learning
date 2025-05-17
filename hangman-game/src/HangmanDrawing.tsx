const HEAD = (
  <div style ={{
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    border: "10px solid black",
    position: "absolute",
    top: "50px",
    right: "-30px"
  }}></div>
);

const BODY = (
  <div style ={{
    width: "10px",
    height: "100px",
    background: "black",
    position: "absolute",
    top: "120px",
    right: 0 
  }}></div>
)

const RIGHT_ARM = (
  <div style ={{
    width: "10px",
    height: "100px",
    background: "black",
    position: "absolute",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    top: "120px",
    right: "-30px", 
    rotate: "-30deg"
  }}></div>
)

const LEFT_ARM = (
  <div style ={{
    width: "10px",
    height: "100px",
    background: "black",
    position: "absolute",
    top: "120px",
    borderTopLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    right: "30px", 
    rotate: "30deg"
  }}></div>
)

const RIGHT_LEG = (
  <div style ={{
    width: "10px",
    height: "120px",
    background: "black",
    position: "absolute",
    borderRadius: "10px",
    top: "210px",
    right: "-30px", 
    rotate: "-30deg"
  }}></div>
)

const LEFT_LEG = (
  <div style ={{
    width: "10px",
    height: "120px",
    background: "black",
    position: "absolute",
    borderRadius: "10px",
    top: "210px",
    right: "30px", 
    rotate: "30deg"
  }}></div>
)

const HANGMAN = [ HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG ];

type HangmanDrawingProps = { numberOfGuesses: number };

const HangmanDrawing = ({numberOfGuesses}: HangmanDrawingProps ) => {
  return (
    <div className="hangman-drawing">
      {HANGMAN.slice(0, numberOfGuesses)}
      <div style={{ 
        height: "50px", 
        width: "10px",
        position: "absolute",
        top: 0,
        right: 0,
				background: "black"
      }}></div>
      <div style={{ 
        height: "10px",
				width: "250px",
				marginLeft: "120px",
				background: "black"
      }}></div>
      <div style={{ 
        height: "400px",
				width: "10px",
				marginLeft: "120px",
				background: "black"
      }}></div>
      <div style={{ 
        height: "10px",
				width: "250px",
				background: "black"
      }}></div>
    </div>);
};

export default HangmanDrawing;
