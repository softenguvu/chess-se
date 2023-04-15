import {Board} from './board.js';
const board = new Board();

let activePiece = null; //global variable to keep track of active piece
let currentPlayer = 0; //global variable to keep track of currentPlayer turn- set to white piece initially. 
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
Function for event handlers that resets the colors of the chess squares,
and then proceeds to mark the possible squares a chess piece can 
move to if the piece is there. Active piece variable is then updated.
*/
function initBoardEvListener() {
    const rows = 8;
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let i = 1; i <= rows; i++) {
        for (let j = 0; j < cols.length; j++) {
            const squareString = cols[j] + i.toString();
            const element = document.getElementById(squareString);
            element.addEventListener("click", () => {
                const piece = getPiece(squareString);
                if (piece && piece.pieceId == currentPlayer) {
                    activePiece = piece;
                    colorAllSquares();
                    const potentialMoves = piece.possibleMoves(board);
                    board.markPossibleMoves(potentialMoves);
                }

                currentPlayer = currentPlayer === 0 ? 1 : 0; //update currentPlayer after turn is up 
            }
            );
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

//function movePiece {
    //check that piece is not null. 
    //check that piece belongs to current player who's turn it is.
    //check that it's a valid move. 
    //if it's a valid move, then we can call movePiece. 
    //set the active piece to the piece that was clicked. 
    //move piece to clicked on square.
    //call my colorAllSquares function.
    //call detectCheckmate after piece is moved.
    //do it after you move a piece. 
//}

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