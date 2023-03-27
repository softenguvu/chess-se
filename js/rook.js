import {Piece} from "./piece.js";

export class Rook extends Piece {
    /**
     * Constructor: inherits from abstract Piece class
     * @param id piece id
     * @param rowPos current row position
     * @param colPos current column position
     * @param playerId player id
     */
    constructor(id, rowPos, colPos, playerId) {
        super();
        this.id = id;
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.playerId = playerId;
        this.unicodeChar = "&#9814;";
    }

    /**
     * Moves piece to cell {id}, updates frontend and Board.board with piece position
     * @param id desired cell id
     * @param board Board.board
     */
    movePiece(id, board) {
        //Convert position and id
        let curPos = this.convertPos();
        let movePos = this.convertId(id);

        // Update piece position
        this.rowPos = movePos[0];
        this.colPos = movePos[1];

        // Update frontend
        document.getElementById(curPos).innerHTML = null;
        document.getElementById(id).innerHTML = this.unicodeChar;

        // Update board
        board[this.rowPos][this.colPos] = null;
        board[this.rowPos][this.colPos] = this;
    }

    /**
     * Gets a list of possible moves the rook piece can make including attack moves
     * @param board Board singleton instance
     * @returns {*[]}
     */
    possibleMoves(board) {
        let possibleMoves = [];
        for (let i = this.rowPos + 1; i < 8; i++) { // check below
            if (board[i][this.colPos]) {
                possibleMoves.push([i, this.colPos]);
                break;
            }
            possibleMoves.push([i, this.colPos]);
        }
        for (let i = this.rowPos - 1; i >= 0; i--) { // check above
            if (board[i][this.colPos]) {
                possibleMoves.push([i, this.colPos]);
                break;
            }
            possibleMoves.push([i, this.colPos]);
        }
        for (let i = this.colPos + 1; i < 8; i++) { // check to the right
            if (board[this.rowPos][i]) {
                possibleMoves.push([this.rowPos, i]);
                break;
            }
            possibleMoves.push([this.rowPos, i]);
        }
        for (let i = this.colPos - 1; i >= 0; i--) { // check to the left
            if (board[this.rowPos][i]) {
                possibleMoves.push([this.rowPos, i]);
                break;
            }
            possibleMoves.push([this.rowPos, i]);
        }
        return possibleMoves;
    }
}

