import {Board} from './board.js';
const board = new Board();

let activePiece = null; //global variable to keep track of active piece

/* 
Helper function to "reset" the colors of the board,
and makes the colors of the squares black and white, 
(if it's an even square, it's white; if it's odd, it's black)
and removes the highlights. 
*/
function colorAllSquares() {
    const rowStr = "87654321";
    const colStr = "abcdefgh";
    for (let i = 0; i < board.board.length; i++){
        for (let j = 0; j < board.board[i].length; j++) {
            const squarePos = colStr[j] + rowStr[i];
            const evenSquare = (i + j) % 2 == 0;
            const color = evenSquare ? "white" : "black";
            const getSquare = document.getElementById(squarePos);
            getSquare.classList.remove("bg-primaryRed", "bg-primaryRedBlack");
            getSquare.classList.add("bg-" + color);
        }
    }
}


/*
This Event Listener function resets the colors of the chess squares,
and then proceeds. 
*/
function initBoardEvListener() {
    const rows = 8;
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let i = 1; i <= rows; i++) {
        for (let j = 0; j < cols.length; j++) {
            const squareString = cols[j] + i.toString();
            const element = document.getElementById(squareString);
            element.addEventListener("click", function (event) {
                const boardSquare = event.target.id; 
                const position = boardSquare.match(/([a-h][1-8])/)[0]; 
                const piece = getPiece(position); 
                if (piece !== null) { 
                    activePiece = piece; 
                    colorAllSquares();
                    const potentialMoves = piece.possibleMoves(board);
                    board.markPossibleMoves(potentialMoves); 
                }
            });
        }
    }
}

initBoardEvListener();


/* 
Helper function to get the piece on the board. 
*/
function getPiece(position) {
    //Convert the piece position to row-col indicies.
    const row = 8 - parseInt(position[1]);
    const col = position.charCodeAt(0) - 97;

    //Gets the piece at given position from board. 
    const piece = board.board[row][col];

    return piece;
}


// Add 'click' event-listener to the 'New Game' button.
const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", () =>
    console.log(
        "New Game button: Click Event Triggered"
    )
);

// Add 'click' event-listener to the 'Undo' button.
const undoButton = document.getElementById("undo-move");
undoButton.addEventListener("click", () =>
    console.log("Undo button: Click Event Triggered")
);