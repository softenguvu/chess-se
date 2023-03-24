import { Piece } from "./piece.js"

export class Pawn extends Piece{

    constructor(pieceId, rowIndex, colIndex, playerId) {
        this.id = pieceId;
        this.rowPos = rowIndex
        this.colPos = colIndex;
        this.active = true;
        this.taken = false;
        this.moved = false;
        this.playerOwner = playerId;
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

    possibleMoves(board) {
        let possibleMoves = [];
        var moveDir = 0

        if (playerOwner == 0) { // Check which direction the piece can move
            moveDir = 1
        }
        else {
            moveDir = -1
        }
        
        if (!this.moved && !board[this.rowPos][this.colPos+(moveDir*2)]) { // Check 'in front' of the piece if it hasn't moved yet
            possibleMoves.push([this.rowPos, this.colPos+(moveDir*2)])
        }

        if (0 < this.colPos+moveDir < 7 && !board[this.rowPos][this.colPos+moveDir]) { // Check 'in front' of the piece
            possibleMoves.push([this.rowPos, this.colPos+moveDir])
        }
    }
}
