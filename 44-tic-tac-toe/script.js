const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.getElementById("statusText");
const resetBtn = document.getElementById("resetBtn");

const WINNING_COMBOS = [
  [0, 1, 2], // row
  [3, 4, 5], // row
  [6, 7, 8], // row
  [0, 3, 6], // column
  [1, 4, 7], // column
  [2, 5, 8], // column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player 1 (X) turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
    cell.disabled = false;
  });
}

function checkWinner() {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: [a, b, c] };
    }
  }
  if (board.every((cell) => cell !== null)) return { winner: "draw", combo: null };

  return null;
}

function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
  cells[index].classList.add(symbol.toLowerCase());
  cells[index].disabled = true;

  const result = checkWinner();

  if (result) {
    gameOver = true;

    cells.forEach((cell) => (cell.disabled = true));
    if (result.combo) result.combo.forEach((i) => cells[i].classList.add("win"));
    statusText.textContent =
      result.winner === "X"
        ? "Player 1 (X) wins 🎉!"
        : result.winner === "O"
          ? "Player 2 (O) wins 🎉!"
          : "It's a draw!";

    return true;
  }
  return false;
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameOver) return;

    const finished = makeMove(cell.dataset.index, currentPlayer);
    if (!finished) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer === "X" ? "1" : "2"} (${currentPlayer}) turn`;
    }
  });
});

resetBtn.addEventListener("click", resetGame);

resetGame();
