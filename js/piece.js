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
        this.playerOwner = undefined;
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
    getPlayerOwner() {
        return this.playerOwner;
    }

    /**
     * Sets the piece player owner
     * @param playerOwner 0 or 1
     */
    setPlayerOwner(playerOwner) {
        this.playerOwner = playerOwner;
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
}