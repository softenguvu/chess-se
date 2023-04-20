/**
 * Abstract Piece class
 */
export class Piece {

    constructor() {
        if (this.constructor === Piece) {
            throw new Error("Error: cannot instantiate abstract Piece class");
        }
        this.id = undefined;
        this.rowPos = undefined;
        this.colPos = undefined;
        this.prevRowPos = null;
        this.prevColPos = null;
        this.unicodeChar = undefined;
        this.playerId = null;
        this.lastTake = null;
    }

    /**
     * Get piece Id
     * @returns {*}
     */
    getId(){
        return this.id;
    }

    /**
     * Sets piece Id
     * @param id new Id
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Gets the row position
     * @returns {*}
     */
    getRowPos() {
        return this.rowPos;
    }

    /**
     * Gets the column position
     * @returns {*}
     */
    getColPos() {
        return this.colPos;
    }

    /**
     * Sets the row position
     * @param rowPos new rowPos
     */
    setRowPos(rowPos) {
        this.rowPos = rowPos;
    }

    /**
     * Sets the column position
     * @param colPos new colPos
     */
    setColPos(colPos) {
        this.colPos = colPos;
    }

    /**
     * Gets the piece player owner
     * @returns {*}
     */
    getPlayerId() {
        return this.playerId;
    }

    /**
     * Sets the piece player id
     * @param id 0 or 1
     */
    setPlayerId(id) {
        this.playerId = id;
    }

    /**
     * Undo previous action
     */
    undo(board) {
        // Remove the piece from its current location
        board.board[this.rowPos][this.colPos] = null;

        // See if we took a piece during that last move
        if (this.lastTake != null) {
            board.board[this.rowPos][this.colPos] = this.lastTake;

            // Remove the taken piece from the graveyard
            let oppID;
            let retLoc;

            if (this.playerId == 1) {
                oppID = 0;
            }
            else {
                oppID = 1;
            }

            retLoc = board.takenPieces.get(oppID).indexOf(this.lastTake);

            board.takenPieces.get(oppID).splice(retLoc, 1);
        }

        // Set the current location to the previous location and put the piece in its new current location
        this.rowPos = this.prevRowPos;
        this.colPos = this.prevColPos;

        board.board[this.rowPos][this.colPos] = this;
    }

    /**
     * Moves piece to {row}, {col} and updates board
     * @param row new row
     * @param col new column
     * @param board Board.board
     */
    movePiece(row, col, board) {
        if (board.board[row][col]) { // taking a piece
            this.lastTake = board.board[row][col];
            this.lastTake.setTaken();
            board.board[row][col] = null;
        }
        else {
            this.lastTake = null;
        }

        // Update board
        board.board[this.rowPos][this.colPos] = null;
        board.board[row][col] = this;

        // Update piece position
        this.rowPos = row;
        this.colPos = col;
    }

    /**
     * Gets list of possible moves piece can make
     */
    possibleMoves()
    {
        throw new Error("Method 'possibleMoves()' must be implemented");
    }
}
