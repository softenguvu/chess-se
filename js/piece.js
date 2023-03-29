/**
 * Abstract Piece class
 */
export class Piece {

    constructor() {
        if (this.constructor === Piece) {
            throw new Error("Error: cannot instantiate abstract Piece class");
        }
        this.id = undefined;
        this.rowPos = undefined
        this.colPos = undefined;
        this.active = false;
        this.taken = false;
        this.playerId = undefined;
        this.unicodeChar = undefined;
        this.takenPiece = undefined;
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
     * Sets the piece player owner
     * @param playerOwner 0 or 1
     */
    setPlayerId(playerOwner) {
        this.playerId = playerOwner;
    }

    /**
     * Undo previous action
     */
    undo() {
        throw new Error("Method 'undo()' must be implemented");
    }

    /**
     * Move piece to new location and sets piece location property
     */
    movePiece() {
        throw new Error("Method 'movePiece' must be implemented");
    }

    /**
     * Gets list of possible moves piece can make
     */
    possibleMoves()
    {
        throw new Error("Method 'possibleMoves()' must be implemented");
    }

    /**
     * Converts cell id into row and column number
     * @param id cell id
     * @returns {(number|number)[]}
     */
    convertId(id) {
        let row = id.charCodeAt(0) - 97;
        let col = parseInt(id.charAt(1));
        col = Math.abs(col - 8);
        return [row, col];
    }

    /**
     * Converts piece position into id
     * @returns {string}
     */
    convertPos() {
        return String.fromCharCode(this.rowPos + 97) + Math.abs(this.colPos - 8);
    }

    validateMove(row, col, possibleMoves) {
        for (let i = 0; i < possibleMoves.length; i++) {
            if (possibleMoves[i][0] === row && possibleMoves[i][1] === col) {
                return true;
            }
        }
        return false;
    }
}
