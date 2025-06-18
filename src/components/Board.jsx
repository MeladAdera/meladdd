// src/components/Board.jsx
import React from 'react';
import './Board.css'; // سننشئ ملف CSS منفصل

const Board = () => {
  return (
    <div className="board-container">
      <h2 className="board-title">لوحة Tic Tac Toe</h2>
      
      <div className="game-board">
        {[...Array(9)].map((_, index) => (
          <div 
            key={index}
            className="game-cell"
            data-cell-index={index}
          >
            {/* ستبقى الخلايا فارغة للآن */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
