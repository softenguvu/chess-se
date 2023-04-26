import { Board } from './board.js';
import { King } from './king.js';
import { Messages } from './messages.js';

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
    for (let i = 0; i < board.board.length; i++) {
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

function squareStringConverter(squareString) {
    const numRow = 8 - parseInt(squareString[1]);
    const numCol = squareString.charCodeAt(0) - 97;
    return [numRow, numCol];
}


/*
Determines if a DOM element's classList contains any of the CSS classes
in the {cssClasses} collection. 
*/

function containsCssClass(cssClassList, cssClasses) {
    let classFound = false;
    for (const cssClass of cssClasses){
        if (cssClassList.contains(cssClass)){
            classFound = true;
            break;
        }
    }
    return classFound; 
}



/*
Add functionality to the event listeners for when 
a piece is clicked on the chessboard.
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



/*
Function to mark the possible moves on the chessboard that 
a player can move to. 
*/
function handleSquareClick(squareString) {
    const markedSquares = ["bg-primaryGrey", "bg-primaryRedBlack"];
    const squareEl = document.getElementById(squareString);
    const piece = getPiece(squareString); //get the Piece on the square 
    if (piece && piece.getPlayerId() == currentPlayer) { //if piece belongs to current player 
        activePiece = piece; //sets activePiece to piece
        colorAllSquares(); //resets the colors of the squares
        const potentialMoves = piece.possibleMoves(board.board); //potential moves that the piece can go
        board.markPossibleMoves(potentialMoves); //Marking the possible squares a piece can move to 
    } else if (containsCssClass(squareEl.classList, markedSquares)) {
        const [row, col] = squareStringConverter(squareString);
        //move the piece, update board, reset board colors and active piece variable.
        activePiece.movePiece(row, col, board);
        board.lastPieceMoved = activePiece;
        board.renderPieces();
        colorAllSquares();
        activePiece = null;

        //Get opposing player Id: 
        const enemyPlayerId = (currentPlayer === 0) ? 1 : 0;
        const kingPiece = getKingPiece(enemyPlayerId);

        //Check for check/checkmate state 
        if (kingPiece) {
            if (detectCheck(kingPiece, board.board)[0].length > 0) {
                console.log("The opposing King has been placed in check.");
                if (detectCheckmate(kingPiece, board.board)) {
                    console.log("The opposing King is in checkmate, game over.");
                    Messages.printWinMsg(currentPlayer);
                }
            }
            currentPlayer = (currentPlayer === 0) ? 1 : 0;
        }

    }
}

initBoardEvListener();

/*
Helper function for getting the King piece 
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
    if (Messages.confirmReset()) {
        board.reset();
        board.initBoard();
        colorAllSquares();
        board.renderPieces();
        playerOnePieces = [];
        playerTwoPieces = [];
        getPlayerPieces();
        currentPlayer = 0;
    }
});

// Add 'click' event-listener to the 'Undo' button.
const undoButton = document.getElementById("undo-move");
undoButton.addEventListener("click", () => {
        if (board.lastPieceMoved !== null) {
            board.lastPieceMoved.undo(board);
            board.renderPieces();
            if (currentPlayer == 0) {
                currentPlayer = 1;
            } else {
                currentPlayer= 0;
            }
        }
    }
);

// This function get's run once, at the very beginning
function getPlayerPieces() {
    // Row zero and one go to player one
    for(let i = 0; i < board.board[0].length; ++i) {
        playerTwoPieces.push(board.board[0][i]);
    }
    for(let i = 0; i < board.board[1].length; ++i) {
        playerTwoPieces.push(board.board[1][i]);
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

    let maxRows = board.length;
    let maxCols = board[0].length;
    let minRows = 0;
    let minCols = 0;

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
                if (harmsWay(kingPiece, currClosestEnemy.possibleMoves(board))) {
                    attackingEnemies.push(currClosestEnemy);
                }
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
        if (board[i][kingPiece.colPos] !== null && board[i][kingPiece.colPos].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][kingPiece.colPos];
        }
        if (board[i][kingPiece.colPos] !== null && board[i][kingPiece.colPos].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[i][kingPiece.colPos] !== null && board[i][kingPiece.colPos].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][kingPiece.colPos];
        }
        if (board[i][kingPiece.colPos] !== null && board[i][kingPiece.colPos].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[kingPiece.rowPos][i] !== null && board[kingPiece.rowPos][i].getPlayerId() == kingPiece.playerId  && currClosestFriend == null) {
            currClosestFriend = board[kingPiece.rowPos][i];
        }
        if (board[kingPiece.rowPos][i] !== null && board[kingPiece.rowPos][i].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[kingPiece.rowPos][i] !== null && board[kingPiece.rowPos][i].getPlayerId() == kingPiece.playerId  && currClosestFriend == null) {
            currClosestFriend = board[kingPiece.rowPos][i];
        }
        if (board[kingPiece.rowPos][i] !== null && board[kingPiece.rowPos][i].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[i][y] !== null && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== null && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[i][y] !== null && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== null && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[i][y] !== null && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== null && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if (board[i][y] !== null && board[i][y].getPlayerId() == kingPiece.playerId && currClosestFriend == null) {
            currClosestFriend = board[i][y];
        }
        if (board[i][y] !== null && board[i][y].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
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
        if ((0 <= row && row <= 7) && (0 <= col && col <= 7) && board[row][col] !== null && board[row][col].constructor.name === 'Knight' && board[row][col].getPlayerId() != kingPiece.playerId) {
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
    let possibleMoveSet = kingPiece.possibleMoves(board);
    let acceptableMoves = [];
    let attackingPieces = [];

    possibleMoveSet.forEach(([newRow, newCol]) => {
        const oldRow = kingPiece.getRowPos();
        const oldCol = kingPiece.getColPos();

        kingPiece.setRowPos(newRow);
        kingPiece.setColPos(newCol);

        let res = detectCheck(kingPiece, board);

        if (res[0].length == 0) {
            acceptableMoves.push([newRow, newCol]);
        }
        else {
            res[0].forEach((attackingPiece) => {
                console.log(attackingPiece)
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
            let tempVectors = currPiece.possibleMoves(board);
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
                if (!piece.isTaken) {
                    const pieceMoves = piece.possibleMoves(board);
                    for(let i = 0; i < pieceMoves.length; ++i) {
                        for(let j = 0; j < attackVectors.length; ++j) {
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
                if (!piece.isTaken) {
                    const pieceMoves = piece.possibleMoves(board);
                    for(let i = 0; i < pieceMoves.length; ++i) {
                        for(let j = 0; j < attackVectors.length; ++j) {
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
