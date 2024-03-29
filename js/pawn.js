import { Piece } from "./piece.js";

export class Pawn extends Piece{

    constructor(pieceId, rowIndex, colIndex, playerId) {
        super();

        this.id = pieceId;
        this.prevRowPos = rowIndex;
        this.prevColPos = colIndex;
        this.rowPos = rowIndex;
        this.colPos = colIndex;
        this.moved = 0;
        this.playerId = playerId;
        this.lastTake = null;
        this.unicodeChar = "&#9823;";
    }

    possibleMoves(board) {
        let possibleMoves = [];
        var moveDir = 0;

        if (this.playerId == 0) { // Check which direction the piece can move
            moveDir = -1;
        }
        else {
            moveDir = 1;
        }
        
        if (this.moved == 0 &&
                !board[this.rowPos+(moveDir*2)][this.colPos] &&
                !board[this.rowPos+moveDir][this.colPos]) { // Check 'in front' of the piece if it hasn't moved yet
            possibleMoves.push([this.rowPos+(moveDir*2), this.colPos]);
        }

        if (0 <= this.rowPos+moveDir && this.rowPos+moveDir <= 7) {
            if (!board[this.rowPos+moveDir][this.colPos]) { // Check 'in front' of the piece
                possibleMoves.push([this.rowPos+moveDir, this.colPos]);
            }

            if (0 <= this.colPos+moveDir && this.colPos+moveDir <= 7 && board[this.rowPos+moveDir][this.colPos+moveDir] != null && board[this.rowPos+moveDir][this.colPos+moveDir].getPlayerId() != this.playerId) { // Check the pieces attackable locations for pieces
                possibleMoves.push([this.rowPos+moveDir, this.colPos+moveDir]);
            }

            if (0 <= this.colPos-moveDir && this.colPos-moveDir <= 7 && board[this.rowPos+moveDir][this.colPos-moveDir] != null && board[this.rowPos+moveDir][this.colPos-moveDir].getPlayerId() != this.playerId) { // Check the pieces attackable locations for pieces
                possibleMoves.push([this.rowPos+moveDir, this.colPos-moveDir]);
            }
        }

        return possibleMoves;
    }

    movePiece(row, col, board) {
        super.movePiece(row, col, board);
        this.moved += 1;
    }
}
