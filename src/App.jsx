import {useState} from "react"
import "./styles.css"


function Square({value, onSquareClick}){
  return(
    <button className="square my-button" onClick = {onSquareClick}>
        {value}
    </button>
  )

}

function Board({xIsNext, squares, onPlay}){
  function handleClick(i){
    console.log('next move')
    if(squares[i] === null && !calculateWinner(squares)){
      console.log('checked')
      const newSquares = squares.slice()
      if(xIsNext)
        newSquares[i] = "X"
      else newSquares[i] = "O"
      onPlay(newSquares)
    }
  }

  function calculateWinner(squares){
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for(let i = 0; i < line.length; i++){
      const [a, b, c] = line[i]
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
    }
    return null;
  }

  const winner = calculateWinner(squares)
  let status;
  if(winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return(
    <>
      <div> {status} </div>
      <div className = "board-row">
        <Square value = {squares[0]} onSquareClick = {() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareClick = {() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick = {() => handleClick(2)}/>
      </div>
      <div className = "board-row">
        <Square value = {squares[3]} onSquareClick = {() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick = {() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick = {() => handleClick(5)}/>
      </div>
      <div className = "board-row">
        <Square value = {squares[6]} onSquareClick = {() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick = {() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick = {() => handleClick(8)}/>
      </div>
    </>
  )
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentmove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currenSquares = history[currentMove]
  

  function handlePlay(nextSquares) {
    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, nextSquares]);
    setCurrentmove(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextmove) {
    const nextHistory = history.slice(0, nextmove + 1);
    setHistory(nextHistory);
    setCurrentmove(nextHistory.length - 1)
    setXIsNext(nextmove % 2 === 0)
  }

  const move = history.map((squares, move) => {
    const desc = move ?
      'Move #' + move :
      'Restart Game'
    return (
      <li key = {move}>
        <button onClick = {() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return(
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext = {xIsNext} squares = {currenSquares} onPlay = {handlePlay}/>
        </div>
        <div className="game-info">
          <ol> {move} </ol>
        </div>
      </div>
    </>
  );
}


