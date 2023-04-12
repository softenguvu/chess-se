import {Board} from './board.js';
const board = new Board();

let activePiece = null; //global variable to keep track of active piece

function initBoardEvListener() {
    const rows = 8;
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

    //loop through rows and cols, to get the squares of the chessboard.
    for (let i = 1; i <= rows; i++) {
        for (let j = 0; j < cols.length; j++) {
            const element = document.getElementById(cols[j] + i);
            element.addEventListener("click", function (event) {
                //const col = cols[j];
                //const row = i;
                //console.log(`You clicked on the square: ${col}${row}`); //for testing purposes to ensure I simplified the OG code correctly.
                const boardSquare = event.target.id; //get the square that was clicked
                const position = boardSquare.match(/([a-h][1-8])/)[0]; // extract the position string using a regex. 
                const piece = getPiece(position); //get the piece from the boardsquare
                if (piece !== null) { //ensure clicked square actually has a piece 
                    activePiece = piece; //update active piece to the piece clicked 
                    colorAllSquares(); //color all squares back to black and white, remove highlights. 
                    const potentialMoves = piece.possibleMoves(board); //get the possible moves for the piece 
                    board.markPossibleMoves(potentialMoves); // mark possible moves on the board 
                }
            });
        }
    }
}

initBoardEvListener();

/* 
Helper function to "reset" the colors of the board 
by making all the squares on the chessboard white and black again,
removes the highlights.
*/

function colorAllSquares() {

    const rows = 8;
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

    //loop through rows and cols, to get the squares of the chessboard.
    for (let i = 1; i <= rows; i++) {
        for (let j = 0; j < cols.length; j++) {
            const allSquares = document.getElementById(cols[j] + i);
            for (let k = 0; k < allSquares.children.length; k++) {
                const isEven = (Math.floor(k / 8) + k) % 2 == 0;
                allSquares[k].classList.toggle('bg-white', isEven); //if square position is even, it's a white square
                allSquares[k].classList.toggle('bg-black', !isEven); //if square position is odd, it's a black square
                allSquares[k].classList.remove('bg-primaryRedBlack', 'bg-primaryRed'); //remove square highlights
            }
        }
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