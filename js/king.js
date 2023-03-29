import {Piece} from "./piece.js";
import {Board} from "./board.js";

export class King extends Piece {
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
        this.unicodeChar = "&#9812;";
    }

    /**
     * Moves piece to {row}, {col} and updates board
     * @param row new row
     * @param col new column
     * @param board Board.board
     */
    movePiece(row, col, board) {
    }

    /**
     * Gets a list of possible moves the rook piece can make including attack moves
     * @param board Board singleton instance
     * @returns {*[]}
     */
    possibleMoves(board) {
        let possibleMoves = [];

        if (this.rowPos + 1 <= 7) {  // check below
            possibleMoves.push([this.rowPos + 1, this.colPos]);
        }

        if (this.rowPos - 1 >= 0) { // check above
            possibleMoves.push([this.rowPos - 1, this.colPos]);
        }

        if (this.colPos + 1 <= 7) { // check right
            possibleMoves.push([this.rowPos, this.colPos + 1]);
        }

        if (this.colPos - 1 >= 0) { // check left
            possibleMoves.push([this.rowPos, this.colPos - 1]);
        }

        if (this.rowPos - 1 >= 0 && this.colPos - 1 >= 0) {
            possibleMoves.push([this.rowPos - 1, this.colPos - 1]);
        }


        return possibleMoves;
    }
}

let board = new Board();
let k = new King(1, 3, 3, 0);

console.log("Test")
let pMoves = k.possibleMoves(board.board);
console.log(pMoves)