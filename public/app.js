function CellState() {
    let state = ' ';
    const setState = (newState) => {
        state = newState;
    };

    const getState = () => {
        return state;
    };

    return {
        setState,
        getState
    }
}


function GameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++)
            board[i].push(CellState());
    
    }

    
    const makeMove = (row, column, playerSymbol) => {
        board[row][column].setState(playerSymbol);
    };

    const printBoard = () => {
        for (let i = 0; i < row; i++) {
            let row = '';
            for (let j = 0; j < column; j++){
                row += board[i][j].getState() + ' ';
            }
            console.log(row);
        }
    };

    const deadBoard = () => {
        for (let i = 0; i < row; i++)
            for (let j = 0; j < column; j++)
                if (board[i][j].getState() === ' ') 
                    return false;
        return true;
    };

    const isGameOver = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getState() != ' ' && board[i][0].getState() === board[i][1].getState() && board[i][1].getState() === board[i][2].getState()) return true;
            if (board[0][i].getState() != ' ' && board[0][i].getState() === board[1][i].getState() && board[1][i].getState() === board[2][i].getState()) return true;
        }
        if (board[0][0].getState() != ' ' && board[0][0].getState() === board[1][1].getState() && board[1][1].getState() === board[2][2].getState()) return true;
        if (board[0][2].getState() != ' ' && board[0][2].getState() === board[1][1].getState() && board[1][1].getState() === board[2][0].getState()) return true;
        return false;
    };


    const getBoard = () => board;

    return {
        makeMove,
        printBoard,
        getBoard,
        isGameOver,
        deadBoard
    };
}


function Game(playerOne,playerTwo) {

    const board = GameBoard();


    const players = [
        {
            name: playerOne,
            symbol: 'X'
        },
        {
            name: playerTwo,
            symbol: 'O'
        }
    ]

    let currentPlayer = players[0];
    
    const changePlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const play = (row, column) => {
        board.makeMove(row, column, currentPlayer.symbol);
        changePlayer();
    };



    const getWinner = () => {
        if (board.isGameOver())
            return currentPlayer === players[0] ? players[1] : players[0];
        return null;
    };

    const checkDraw = () => {
        if (board.deadBoard())
            return true;
        return false;
    };

    const printBoard = () => {  
        board.printBoard();
    };

    const getBoard = () => board.getBoard();

    const resetPlayer = () => {
        currentPlayer = players[0];
    };

    return {
        play,
        getCurrentPlayer,
        printBoard,
        getWinner,
        getBoard,
        checkDraw,
        resetPlayer
    };
}


function GameUI(){

    const game = Game('player 1', 'player 2');
    const board = game.getBoard();

    const player = document.querySelector('.player-name');

    const render = () => {
        player.innerHTML = `${game.getCurrentPlayer().symbol}'s turn`;
        for (let i = 0; i < board.length; i++)
            for (let j = 0; j < board.length; j++)
                document.getElementById(`${i}${j}`).innerHTML = board[i][j].getState();
        
    };

    const play = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const id = cell.id;
                const row = parseInt(id[0]);
                const column = parseInt(id[1]);
                if (board[row][column].getState() != ' ' || game.getWinner() != null || game.checkDraw())
                    return;
                game.play(row, column);
                render();
                if (game.getWinner() != null) {
                    const winner = game.getWinner();
                    player.innerHTML = `${winner.symbol}'s wins!`;
                    
                }
                
                else if (game.checkDraw())
                    player.innerHTML = `It's a draw!`;        
            
            });
        });
    };

    const reset = () => {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++){
                board[i][j].setState(' ');
                document.getElementById(`${i}${j}`).innerHTML = ' ';
            }
        game.resetPlayer();
        render();
    };

    
    return {
        play,
        reset,
    };

}

const game = GameUI();

const reset = document.querySelector('.reset');
const play = document.querySelector('.play');

reset.addEventListener('click', () => {
    game.reset();
});

play.addEventListener('click', () => {
    game.reset();
    game.play();
});