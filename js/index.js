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
Function to determine if a square is marked. 
*/

function isMarkedSquare(squareString) {
    //Convert the square string to row/col 
    const [row, col] = squareStringConverter(squareString);
    return board.markPossibleMoves[row][col];
}

/*
Function to help with converting string to row col. 
*/

function squareStringConverter(squareString){
    const numRow = parseInt(squareString[1]) - 1; //get row number from squarestring
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"]; //array for cols 
    const numCol = cols.indexOf(squareString[0]);  //get the col number from squarestring
    return [numRow, numCol];
}


/*
Function for event handlers that will resets the colors of the chess squares,
marks the possible squares a chess piece can move to, 
and will then proceed to move the piece to the selected square. 
Active piece variable is then updated.
*/

function initBoardEvListener() {
    const rows = 8;
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let i = 1; i <= rows; i++) {
        for (let j = 0; j < cols.length; j++) {
                const squareString = cols[j] + i.toString();
                const element = document.getElementById(squareString);
                element.addEventListener("click", () => {
                    handleClick(squareString);
                });
            }
        }
    }

initBoardEvListener();

function handleClick(squareString){
    const piece = getPiece(squareString);
    if (piece && piece.getPlayerId() == currentPlayer) {
        activePiece = piece;
        colorAllSquares();
        const potentialMoves = piece.possibleMoves(board);
        board.markPossibleMoves(potentialMoves);
        //Register the event listener for handling when the marked square is selected
        const handleInnerClick = () => {
            if (isMarkedSquare(squareString)) {
                const [row, col] = squareStringConverter(squareString);
                activePiece.movePiece(row, col, board);
                colorAllSquares();
                    //Now that piece has moved, make the check for if opposing player is in check/checkmate:
                    const enemyPlayerID = (currentPlayer === 0) ? 1 : 0;
                    const kingPiece = getKingPiece(enemyPlayerID);
                    if (kingPiece) {
                        if (detectCheck(kingPiece, board)) {
                            console.log("The opposing King has been placed in check.");
                            if (detectCheckmate(kingPiece, board)) {
                                console.log("The opposing King is in checkmate, game over.")
                            } else {
                                currentPlayer = (currentPlayer === 0) ? 1 : 0; //switch turns if opposing King isn't in checkmate. 
                            }
                        }
                    }
            }
        };
        const element = document.getElementById(squareString);
        element.removeEventListener("click", handleInnerClick); 
        element.addEventListener("click", handleInnerClick);
    }

}

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

/*
Function for getting the King piece 
in order to perform
the check/checkmate checks.
*/
function getKingPiece(playerId) {
    //loop through all rows and cols to find King piece
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board.board[row][col];
            //Once we find piece, return it 
            if (piece instanceof King && piece.getPlayerId() === playerId) {
                return piece;
            }
        }
    }
    return null;  // Return null if King piece not found
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