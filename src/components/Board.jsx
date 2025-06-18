import React, { useState } from 'react';
import './Board.css';
const lines = [
    [0,1,2], [3,4,5], [6,7,8], // الصفوف
    [0,3,6], [1,4,7], [2,5,8], // الأعمدة
    [0,4,8], [2,4,6]           // الأقطار
  ];
const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const calculateWinner = (squares) => {
    const winnerLine = lines.find(([a, b, c]) => 
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      );
    
      return winnerLine ? squares[winnerLine[0]] : null;
    };

  const handleClick = (index) => {
    // توقف إذا كانت الخلية مشغولة، أو هناك فائز، أو تعادل
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (newBoard.every(cell => cell !== null)) {
      // تعادل إذا كانت جميع الخلايا ممتلئة ولا يوجد فائز
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
  };
  // تحديد الحالة للعرض
  let status;
  if (winner) {
    status = `winer!: ${winner}`;
  } else if (isDraw) {
    status = 'drow!';
  } else {
    status = `player: ${currentPlayer}`;
  }

  return (
    <div className="board-container">
      <h2 className="board-title">لوحة Tic Tac Toe</h2>
      <div className="board-status">{status}</div>
      
      <div className="board">
        {board.map((value, index) => (
          <div 
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
          
        ))}
        
      </div>
         {/* زر إعادة اللعبة */}
    <button onClick={resetGame} className="reset-button">إعادة اللعبة</button>
      
    </div>
  );
};

export default Board;