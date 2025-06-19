import React, { useState } from 'react';
import './Board.css';

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // الصفوف
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // الأعمدة
  [0, 4, 8], [2, 4, 6]             // الأقطار
];

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  const calculateWinner = (squares) => {
    const winningLineResult = lines.find(([a, b, c]) => 
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
    );
    if (winningLineResult) {
      setWinningLine(winningLineResult);
      return squares[winningLineResult[0]];
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setWinningLine([]);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Player: ${currentPlayer}`;
  }

  return (
    <div className="board-container">
      <h2 className="board-title">Tic Tac Toe</h2>
      <div className="board-status">{status}</div>
      
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className={`cell ${winningLine.includes(index) ? 'winning-cell' : ''}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      
      <button onClick={resetGame} className="reset-button">Reset</button>
    </div>
  );
};

export default Board;