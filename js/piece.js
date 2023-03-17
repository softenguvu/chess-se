/**
 * Abstract Piece class
 */
export class Piece {

    constructor() {
        if (this.constructor === Piece) {
            throw new Error("Error: cannot instantiate abstract Piece class");
        }
        this.location = "";
        this.active = false;
        this.taken = false;
        this.imgPath = "";
        this.playerOwner = -1;
    }

    /**
     * Gets location of piece on the board
     */
    getLocation() {
        throw new Error("Method 'getLocation()' must be implemented");
    }

    /**
     * Sets the location of the piece on the board
     */
    setLocation() {
        throw new Error("Method 'setLocation()' must be implemented");
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