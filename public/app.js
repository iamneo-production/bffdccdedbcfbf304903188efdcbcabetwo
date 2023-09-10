const cells = document.querySelectorAll('[data-cell]');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Add click event listeners to the cells
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const cellIndex = cell.dataset.cell;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWin() {
    // Check win conditions here
}

function isDraw() {
    return !gameBoard.includes('');
}

function endGame(draw) {
    if (draw) {
        result.textContent = "It's a Draw!";
    } else {
        result.textContent = `Player ${currentPlayer} Wins!`;
    }

    gameActive = false;
    resetButton.disabled = false;
}

resetButton.addEventListener('click', restartGame);

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    result.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    resetButton.disabled = true;
}