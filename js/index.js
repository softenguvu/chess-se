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

let playerOnePieces = [];
let playerTwoPieces = [];

// This function get's run once, at the very beginning
function getPlayerPieces() {
    // Row zero and one go to player one
    for(i = 0; i < BOARD.board[0].length; ++i) {
        playerOnePieces.push(BOARD.board[0][i]);
    }
    for(i = 0; i < BOARD.board[1].length; ++i) {
        playerOnePieces.push(BOARD.board[1][i]);
    }

    // Row 6 and 7 go to player two
    for(i = 0; i < BOARD.board[6].length; ++i) {
        playerOnePieces.push(BOARD.board[6][i]);
    }
    for(i = 0; i < BOARD.board[7].length; ++i) {
        playerOnePieces.push(BOARD.board[7][i]);
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

        for(i = 0; i < possibleMoveSet.length; ++i) {
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
            if (harmsWay(currClosestFriend, currClosestEnemy.possibleMoves())) {
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
            currClosestFriend = board[i][kingPiece.colPos]
        }
        if (board[i][kingPiece.colPos] !== null && board[i][kingPiece.colPos].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][kingPiece.colPos]
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
            currClosestFriend = board[i][kingPiece.colPos]
        }
        if (board[i][kingPiece.colPos] !== null && board[i][kingPiece.colPos].getPlayerId() != kingPiece.playerId && currClosestEnemy == null) {
            currClosestEnemy = board[i][kingPiece.colPos]
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
            })
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
            })
            attackVectors.push([currPiece.getRowPos(), currPiece.getColPos()]);
        })

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