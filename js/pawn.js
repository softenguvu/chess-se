import { Piece } from "./piece.js"

export class Pawn extends Piece{

    constructor(pieceId, rowIndex, colIndex, playerId) {
        super()

        this.id = pieceId;
        this.rowPos = rowIndex
        this.colPos = colIndex;
        this.active = true;
        this.taken = false;
        this.moved = false;
        this.playerOwner = playerId;
        this.unicodeChar = "&#9817;";
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
    movePiece(id, board) {
        //Convert position and id
        let curPos = String.fromCharCode(this.rowPos + 97) + (this.colPos+1);
        let movePos = [(id.charCodeAt(0)-97), parseInt(id.charAt(1))-1]

        board[this.rowPos][this.colPos] = null;

        // Update piece position
        this.rowPos = movePos[0];
        this.colPos = movePos[1];

        // Update frontend
        document.getElementById(curPos).innerHTML = null;
        document.getElementById(id).innerHTML = this.unicodeChar;

        // Update board
        
        board[this.rowPos][this.colPos] = this;
        console.log(board)
    }

    possibleMoves(board) {
        let possibleMoves = [];
        var moveDir = 0;

        if (this.playerOwner == 0) { // Check which direction the piece can move
            moveDir = 1;
        }
        else {
            moveDir = -1;
        }
        
        if (!this.moved && board[this.rowPos+(moveDir*2)][this.colPos] === undefined && board[this.rowPos+moveDir][this.colPos] === undefined) { // Check 'in front' of the piece if it hasn't moved yet
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
