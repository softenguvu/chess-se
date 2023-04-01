import { Piece } from "./piece.js"

export class Pawn extends Piece{

    constructor(pieceId, rowIndex, colIndex, playerId) {
        super()

        this.id = pieceId;
        this.rowPos = rowIndex
        this.colPos = colIndex;
        this.prevRowPos = 0;
        this.prevColPos = 0;
        this.moved = false;
        this.playerId = playerId;
        this.lastTake = null;
        this.unicodeChar = "&#9817;";
    }

    /**
     * Undo previous action
     */
    undo(board) {
        // Remove the piece from its current location
        board[this.rowPos][this.colPos] = null;

        // See if we took a piece during that last move
        if (this.lastTake != null) {
            this.lastTake.taken = false;

            board[this.rowPos][this.colPos] = this.lastTake;
        }

        // Set the current location to the previous location and put the piece in its new current location
        this.rowPos = this.prevRowPos;
        this.colPos = this.prevColPos;

        board[this.rowPos][this.colPos] = this;
    }

    /**
     * Move piece to new location and sets piece location property
     */
    movePiece(row, col, board) {
        // Make sure the move is valid
        const possMoves = this.possibleMoves(board);
        if (!this.validateMove(row, col, possMoves)) {
            return;
        }

        // Remove piece from its previous place
        board[this.rowPos][this.colPos] = null;

        // Update piece position
        this.prevColPos = this.colPos;
        this.prevRowPos = this.rowPos;
        this.rowPos = row;
        this.colPos = col;

        // Update board
        if (board[this.rowPos][this.colPos]) {
            this.lastTake = board[this.rowPos][this.colPos];
            this.lastTake.setTaken();
        }
        else {
            this.lastTake = null;
        }
        board[this.rowPos][this.colPos] = this;
    }

    possibleMoves(board) {
        let possibleMoves = [];
        var moveDir = 0;

        if (this.playerId == 0) { // Check which direction the piece can move
            moveDir = 1;
        }
        else {
            moveDir = -1;
        }
        
        if (!this.moved &&
                board[this.rowPos+(moveDir*2)][this.colPos] === undefined &&
                board[this.rowPos+moveDir][this.colPos] === undefined) { // Check 'in front' of the piece if it hasn't moved yet
            possibleMoves.push([this.rowPos+(moveDir*2), this.colPos]);
        }

        if (0 <= this.rowPos+moveDir <= 7) {
            if (board[this.rowPos+moveDir][this.colPos] === undefined) { // Check 'in front' of the piece
                possibleMoves.push([this.rowPos+moveDir, this.colPos]);
            }

            if (0 <= this.colPos+moveDir <= 7 && board[this.rowPos+moveDir][this.colPos+moveDir] !== undefined) { // Check the pieces attackable locations for pieces
                possibleMoves.push([this.rowPos+moveDir, this.colPos+moveDir]);
            }

            if (0 <= this.colPos-moveDir <= 7 && board[this.rowPos+moveDir][this.colPos-moveDir] !== undefined) { // Check the pieces attackable locations for pieces
                possibleMoves.push([this.rowPos+moveDir, this.colPos-moveDir]);
            }
        }

        return possibleMoves;
    }
}
