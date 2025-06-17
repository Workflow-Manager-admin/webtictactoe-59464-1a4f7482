/* eslint-disable react/prop-types */
import { useState } from "react";

/**
 * Main container component for WebTicTacToe.
 * Features:
 * - 3x3 game board
 * - Player turn indicator
 * - Game status/result display
 * Color palette:
 *   Primary: #4CAF50 (green), Secondary: #FFC107 (amber), Accent: #2196F3 (blue)
 * Light theme, simple/clear grid layout.
 */

// PUBLIC_INTERFACE
export default function WebTicTacToe() {
  // Game state: 0-8 board positions, 'X' or 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Calculate winner and status
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell);
  const currentPlayer = xIsNext ? "X" : "O";
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = `It's a draw!`;
  } else {
    status = "Game in progress";
  }

  // Handler for when a square is clicked
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (board[idx] || winner) return; // Ignore if already filled or game ended
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // Render a single square
  function Square({ value, onClick }) {
    return (
      <button
        className="w-20 h-20 flex items-center justify-center border border-gray-300 text-3xl font-bold transition-all bg-white hover:bg-[#2196F311] rounded-md"
        style={{
          color:
            value === "X"
              ? "#4CAF50"
              : value === "O"
              ? "#2196F3"
              : "#333",
        }}
        onClick={onClick}
        aria-label={value ? `Cell: ${value}` : "Empty cell"}
      >
        {value}
      </button>
    );
  }
  // Removed PropTypes validation due to ES6 build errors. Type safety can be handled via TypeScript if needed.

  // Render the 3x3 board grid
  function Board() {
    return (
      <div className="grid grid-cols-3 gap-3 bg-[#f8f9fa] p-4 rounded-2xl shadow-sm">
        {board.map((value, idx) => (
          <Square key={idx} value={value} onClick={() => handleClick(idx)} />
        ))}
      </div>
    );
  }

  // Main render
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="flex flex-col items-center gap-8 p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
        <h1
          className="text-3xl font-black mb-2 tracking-wide"
          style={{ color: "#4CAF50" }}
        >
          Web Tic Tac Toe
        </h1>

        {/* Player turn indicator */}
        {!winner && !isDraw && (
          <div
            className="text-lg font-semibold flex items-center"
            style={{
              color: "#2196F3",
              backgroundColor: "#E3F2FD",
              borderRadius: "8px",
              padding: "4px 14px",
            }}
          >
            <span className="mr-2" style={{ color: "#FFC107" }}>
              ●
            </span>
            Player Turn:{" "}
            <span className="ml-2" style={{ color: currentPlayer === "X" ? "#4CAF50" : "#2196F3" }}>
              {currentPlayer}
            </span>
          </div>
        )}

        {/* Game board */}
        <Board />

        {/* Game status display */}
        <div
          className="mt-4 text-base font-medium"
          style={{
            color: winner
              ? "#4CAF50"
              : isDraw
              ? "#FFC107"
              : "#2196F3",
            padding: "8px 32px",
            backgroundColor: "#F1F8E9",
            borderRadius: 10,
          }}
        >
          {status}
        </div>

        {/* Reset button, only after game is done */}
        {(winner || isDraw) && (
          <button
            className="mt-4 px-5 py-2 rounded-lg text-white font-semibold"
            style={{
              backgroundColor: "#2196F3",
              boxShadow: "0 1px 3px #2196F344",
            }}
            onClick={() => {
              setBoard(Array(9).fill(null));
              setXIsNext(true);
            }}
          >
            Restart Game
          </button>
        )}

        <div className="mt-4 text-xs text-gray-500">
          <span>
            Powered by <span style={{ color: "#2196F3" }}>Remix</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /*
    Checks for a winner in a 3x3 tic-tac-toe board.
    Returns 'X', 'O', or null.
  */
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
