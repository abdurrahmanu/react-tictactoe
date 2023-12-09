/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

function Square({ onSquareClick, currentPlayer }) {
  return (
    <>
      <button
        onClick={onSquareClick}
        className="p-3 text-2xl border bg-zinc-100 w-20 h-20">
        {currentPlayer}
      </button>
    </>
  )
}

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const fillCount = useRef(0)
  const [win, setWin] = useState(false)
  const [squares, setSquares] = useState(Array(9).fill(''))

  const rows = []

  for (let index = 0; index < 9; index++) {
    rows.push(
      <Square
      onSquareClick={() => changeCurrentPlayer(index)}
      currentPlayer={squares[index]}
      key={index}
      />
    )
  }

  function changeCurrentPlayer(index) {
    if (squares[index]) return
    const nextSquares = squares.slice()

    currentPlayer === 'X' ?
      setCurrentPlayer('O') :
        setCurrentPlayer('X')
    
    nextSquares[index] = currentPlayer
    setSquares(nextSquares)

    fillCount.current += 1
    
  }

  function checkWin(squares) {
    let winArray = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
    ];
    
    for (let index = 0; index < winArray.length; index++) {
      const [a, b, c] = winArray[index];

      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        setWin(true)
        return squares[a]
      }
    }

    return null
  }

  useEffect(() => {
        if (fillCount.current > 4) checkWin(squares)
  }, [fillCount, squares])

  return (
    <>
    <div className="bg-zinc-300 w-fit m-auto text-sm font-mono px-5 p-2 mt-3">
      {win ?
        (
          <div>won the match</div>
        ) : (
          <div>{currentPlayer} player turn</div>
      )}
    </div>
    <div className="p-2 bg-sky-300 w-fit h-fit m-32 mt-4 grid grid-rows-3 grid-cols-3 gap-1">
      {rows}
    </div>
		</>
  );
}



















