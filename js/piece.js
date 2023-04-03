/**
 * Abstract Piece class
 */
export class Piece {

    constructor() {
        if (this.constructor === Piece) {
            throw new Error("Error: cannot instantiate abstract Piece class");
        }
        this.id = null;
        this.rowPos = null
        this.colPos = null;
        this.active = false;
        this.taken = false;
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
     * Check if piece is active
     * @returns {boolean}
     */
    isActive() {
        return this.active;
    }

    /**
     * Set piece to active state
     */
    setActive() {
        this.active = true;
    }

    /**
     * Set piece to inactive state
     */
    setInactive() {
        this.active = false;
    }

    /**
     * Check if piece is taken
     * @returns {boolean}
     */
    isTaken() {
        return this.taken;
    }

    /**
     * Set piece to taken state
     */
    setTaken() {
        this.taken = true;
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
    undo() {
        throw new Error("Method 'undo()' must be implemented");
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