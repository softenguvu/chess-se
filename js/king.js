import {Piece} from "./piece.js";

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
     * Gets a list of possible moves the king piece can make including attack moves
     * @param board Board singleton instance
     * @returns {*[]}
     */
    possibleMoves(board) {
        let possibleMoves = [];
        const moveOffsets = [
            [-1, -1], [-1, +1], [+1, -1], [+1, +1], //corners
            [+1, 0], [-1, 0], [0, +1], [0, -1]
        ];
        moveOffsets.forEach(([rowDiff, colDiff]) => {
            const row = this.rowPos + rowDiff;
            const col = this.colPos + colDiff;
            if (this._possibleMove(row, col, board)) {
                possibleMoves.push([row, col]);
            }
        });
        return possibleMoves;
    }

    /**
     * Determines if the provided position is a valid possible move.
     * @param {int} row Row position.
     * @param {int} col Column position.
     * @param {[[Piece]]} board Chess board (2D array of chess pieces).
     * @returns Whether the provided position is a valid possible move.
     */
    _possibleMove(row, col, board) {
        return this._withinBounds(row, col, board) && (
            (board[row][col]) ?  // Check if chess piece is present at position.
                board[row][col].getPlayerId() !== this.playerId :
                true
        );
    }

    /**
     * Determines if the provided position is within boundaries of the provided
     * chess board.
     * @param {int} row Row position.
     * @param {int} col Column position.
     * @param {[[Piece]]} board Chess board (2D array of chess pieces).
     * @returns Whether the provided position is within boundaries of the
     * provided chess board.
     */
    _withinBounds(row, col, board) {
        return row >= 0 && row < board.length && col >= 0 && col < board.length;
    }
}
