import {Board} from './board.js';
import { King } from './king.js';

let activePiece = null; //global variable to keep track of active piece
let currentPlayer = 0; //global variable to keep track of currentPlayer turn- set to white piece initially. 

/* 
Helper function to "reset" the colors of the board,
and makes the colors of the squares white and light brown, 
(if it's an even square, it's white; if it's odd, it's light brown.)
and removes the highlights. 
*/

function colorAllSquares() {
    const rowStr = "87654321";
    const colStr = "abcdefgh";
    for (let i = 0; i < board.board.length; i++){
        for (let j = 0; j < board.board[i].length; j++) {
            const squarePos = colStr[j] + rowStr[i];
            const evenSquare = (i + j) % 2 == 0;
            const color = evenSquare ? "white" : "light-brown";
            const getSquare = document.getElementById(squarePos);
            getSquare.classList.remove("bg-primaryGrey", "bg-primaryRedBlack");
            getSquare.classList.add("bg-" + color);
        }
    }
}

/*
Function to help with converting string to row col. 
*/

function squareStringConverter(squareString){
    const numRow = 8 - parseInt(squareString[1]);
    const numCol = squareString.charCodeAt(0) - 97;
    return [numRow, numCol];
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
                    handleSquareClick(squareString);
                });
            }
        }
    }

initBoardEvListener();


function handleSquareClick(squareString) {
    const piece = getPiece(squareString); //get the Piece on the square 
    if (piece && piece.getPlayerId() == currentPlayer) { //if piece belongs to current player 
        activePiece = piece; //sets activePiece to piece 
        colorAllSquares(); //resets the colors of the squares 
        const potentialMoves = piece.possibleMoves(board.board); //potential moves that the piece can go
        board.markPossibleMoves(potentialMoves); //Marking the possible squares a piece can move to 
        //Adding move piece functionality here. 
        const markedSquares = document.getElementsByClassName("markedSquare");
        for (let i = 0; i < markedSquares.length; i++) {
            markedSquares[i].addEventListener("click", handleMoveToSquare);
        }
    }

}

function handleMoveToSquare(event) {
    const clickedSquare = event.target; // get the clicked square element
    const clickedSquareId = clickedSquare.id; // get the id of the clicked square
    const [row, col] = squareStringConverter(clickedSquareId); // convert id to row and col
    activePiece.movePiece(row, col, board); // move the active piece to the clicked square
    board.renderPieces(); //render pieces on board  to reflect this
    colorAllSquares(); // reset colors of all squares
    activePiece = null; // reset active piece back to null
    //currentPlayer = (currentPlayer === 0) ? 1 : 0; testing that switching turns works properly.

    const enemyPlayerID = (currentPlayer === 0) ? 1 : 0;
    const kingPiece = getKingPiece(enemyPlayerID);
    if (kingPiece) {
         if (detectCheck(kingPiece, board)) {
             console.log("The opposing King has been placed in check.");
             if (detectCheckmate(kingPiece, board)) {
                 console.log("The opposing King is in checkmate, game over.")
             } else {
                 currentPlayer = (currentPlayer === 0) ? 1 : 0; // switch turns here if opposing King isn't in checkmate.
             }
         }
     }
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
newGameButton.addEventListener("click", () => {
    board.reset();
    board.initBoard();
    board.renderPieces();
    playerOnePieces = [];
    playerTwoPieces = [];
    getPlayerPieces();
});

// Add 'click' event-listener to the 'Undo' button.
const undoButton = document.getElementById("undo-move");
undoButton.addEventListener("click", () => {
        if (board.lastPieceMoved !== null) {
            board.lastPieceMoved.undo(board);
            board.renderPieces();
        }
    }
);

// This function get's run once, at the very beginning
function getPlayerPieces() {
    // Row zero and one go to player one
    for(let i = 0; i < board.board[0].length; ++i) {
        playerOnePieces.push(board.board[0][i]);
    }
    for(let i = 0; i < board.board[1].length; ++i) {
        playerOnePieces.push(board.board[1][i]);
    }

    // Row 6 and 7 go to player two
    for(let i = 0; i < board.board[6].length; ++i) {
        playerOnePieces.push(board.board[6][i]);
    }
    for(let i = 0; i < board.board[7].length; ++i) {
        playerOnePieces.push(board.board[7][i]);
    }
}

/**
 * This detects check at the beginning of someones turn
 * 
 */
function detectCheck(kingPiece, board) {
    /**
     * Define a function to check if pieces can attack each other
     */
    function harmsWay(underAttackPiece, possibleMoveSet) {
        let colPos = underAttackPiece.getColPos();
        let rowPos = underAttackPiece.getRowPos();

        for(let i = 0; i < possibleMoveSet.length; ++i) {
            if(possibleMoveSet[i][0] == rowPos && possibleMoveSet[i][1] == colPos) {
                return true;
            }
        }
        return false;
    }

    let defendingFriends = [];
    let attackingEnemies = [];

    let maxCols = board[0].length;
    let minRows, minCols = 0;

    /**
     * These are used to track the closest friendly piece and closest enemy pieces to see if king is actually under attack
     * and if a friendly piece moving would put the king in check.
     */
    let currClosestFriend = null;
    let currClosestEnemy = null;

    /**
     * Define a function that checks if the king is under attack, and resets the currClosest variables
     */
    function checkAndReset() {
        if (currClosestEnemy != null) {
            if (currClosestFriend == null) {
                attackingEnemies.push(currClosestEnemy);
            }
            else if (harmsWay(currClosestFriend, currClosestEnemy.possibleMoves(board))) {
                defendingFriends.push(currClosestFriend);
            }
        }
    
        currClosestFriend = null;
        currClosestEnemy = null;
    }

    /**
     * Get row increasing moves
     */
    for (let i = kingPiece.rowPos + 1; i < maxRows; i++) {
        if (board[i][kingPiece.colPos] !== undefined && board[i][kingPiece.colPos].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][kingPiece.colPos];
        }
        if (board[i][kingPiece.colPos] !== undefined && board[i][kingPiece.colPos].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][kingPiece.colPos];
        }
    }

    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Get row decreasing moves
     */
    for (let i = kingPiece.rowPos - 1; i >= minRows; i--) {
        if (board[i][kingPiece.colPos] !== undefined && board[i][kingPiece.colPos].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][kingPiece.colPos];
        }
        if (board[i][kingPiece.colPos] !== undefined && board[i][kingPiece.colPos].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][kingPiece.colPos];
        }
    }

     /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
     checkAndReset();

    /**
     * Get col increasing moves
     */
    for (let i = kingPiece.colPos + 1; i < maxCols; i++) {
        if (board[kingPiece.rowPos][i] !== undefined && board[kingPiece.rowPos][i].getPlayerId() == kingPiece.playerId  && currClosestFriend == null) {
            currClosestFriend = board[kingPiece.rowPos][i];
        }
        if (board[kingPiece.rowPos][i] !== undefined && board[kingPiece.rowPos][i].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[kingPiece.rowPos][i];
        }
    }

    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Get col decreasing moves
     */
    for (let i = kingPiece.colPos - 1; i >= minCols; i--) {
        if (board[kingPiece.rowPos][i] !== undefined && board[kingPiece.rowPos][i].getPlayerId() == kingPiece.playerId  && currClosestFriend == null) {
            currClosestFriend = board[kingPiece.rowPos][i];
        }
        if (board[kingPiece.rowPos][i] !== undefined && board[kingPiece.rowPos][i].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[kingPiece.rowPos][i];
        }
    }

    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Get row and col increasing moves
     */
    for (let i = kingPiece.rowPos + 1, y = kingPiece.colPos + 1; i < maxRows && y < maxCols; i++, y++) {
        if (board[i][y] !== undefined && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== undefined && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][y];
        }
    }
    
    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Get row and col decreasing moves
     */
    for (let i = kingPiece.rowPos - 1, y = kingPiece.colPos - 1; i >= minRows && y >= minCols; i--, y--) {
        if (board[i][y] !== undefined && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== undefined && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][y];
        }
    }

    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Get row increasing and col decreasing moves
     */
    for (let i = kingPiece.rowPos + 1, y = kingPiece.colPos - 1; i < maxRows && y >= minCols; i++, y--) {
        if (board[i][y] !== undefined && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== undefined && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][y];
        }
    }

    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Get row decreasing and col increasing moves
     */
    for (let i = kingPiece.rowPos - 1, y = kingPiece.colPos + 1; i >= minRows && y < maxCols; i--, y++) {
        if (board[i][y] !== undefined && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== undefined && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][y];
        }
    }

    /**
     * Now check if the king is under attack and if there is a friendly piece in the way
     */
    checkAndReset();

    /**
     * Now check the spaces that only knights could attack from
     */
    const moveOffsets = [
        [-1, -2], [-2, -1], [-2, +1], [-1, +2],
        [+1, -2], [+2, -1], [+2, +1], [+1, +2]
    ];

    moveOffsets.forEach(([rowDiff, colDiff]) => {
        const row = kingPiece.rowPos + rowDiff;
        const col = kingPiece.colPos + colDiff;
        if ((0 <= row && row <= 7) && (0 <= col && col <= 7) && board[row][col] && board[row][col].getPlayerId() != kingPiece.playerId) {
            attackingEnemies.push(board[row][col]);
        }
    });

    return [attackingEnemies, defendingFriends];

}

/**
 * Detects checkmate using the previously defined check functions
 * 
 */
function detectCheckmate(kingPiece, board) {
    /**
     * See if the king has no possible moves
     */
    let possibleMoveSet = kingPiece.possibleMoves();
    let acceptableMoves = [];
    let attackingPieces = [];

    possibleMoveSet.forEach(([newRow, newCol]) => {
        const oldRow = kingPiece.getRowPos();
        const oldCol = kingPiece.getColPos();

        kingPiece.setRowPos(newRow);
        kingPiece.setColPos(newCol);

        res = detectCheck(kingPiece, board);

        if (res[0].length == 0) {
            acceptableMoves.push([newRow, newCol]);
            res[0].forEach((attackingPiece) => {
                attackingPieces.push(attackingPiece);
            });
        }

        kingPiece.setRowPos(oldRow);
        kingPiece.setColPos(oldCol);
    });

    if (acceptableMoves.length == 0) {
        console.log("King can't move out of his predicament");
    }

    /**
     * Now see if any of your pieces can block or take the attacking piece
     */
    if (attackingPieces.length == 1) {
        /**
         * Get the list of squares the piece attacks on
         */
        let attackVectors = [];
        attackingPieces.forEach((currPiece) => {
            let tempVectors = currPiece.possibleMoves();
            tempVectors.forEach((vectors) => {
                attackVectors.push(vectors);
            });
            attackVectors.push([currPiece.getRowPos(), currPiece.getColPos()]);
        });

        /**
         * Iterate through the list of friendly pieces seeing if any of their possible movesets include
         * the attacking piece, or can block it.
         */
        let powerPieces = [];
        if (kingPiece.playerId == 0) {
            // Use playerOnePieces
            playerOnePieces.forEach((piece) => {
                if (!piece.isTaken()) {
                    const pieceMoves = piece.possibleMoves();
                    for(i = 0; i < pieceMoves.length; ++i) {
                        for(j = 0; j < attackVectors.length; ++j) {
                            if(pieceMoves[i][0] == attackVectors[j][0] && pieceMoves[i][1] == attackVectors[j][1]) {
                                powerPieces.push(piece);
                            }
                        }
                    }
                }
            });
        }
        else {
            // Use playerTwoPieces
            playerTwoPieces.forEach((piece) => {
                if (!piece.isTaken()) {
                    const pieceMoves = piece.possibleMoves();
                    for(i = 0; i < pieceMoves.length; ++i) {
                        for(j = 0; j < attackVectors.length; ++j) {
                            if(pieceMoves[i][0] == attackVectors[j][0] && pieceMoves[i][1] == attackVectors[j][1]) {
                                powerPieces.push(piece);
                            }
                        }
                    }
                }
            });
        }
        return powerPieces;
    }
    else if (attackingPieces.length >= 2) {
        return true;
    }
    else {
        return false;
    }
}

let playerOnePieces = [];
let playerTwoPieces = [];
const board = new Board();
board.initBoard();
board.renderPieces();
getPlayerPieces();
