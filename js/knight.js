import { Piece } from "./piece.js";

/**
 * Represents a knight chess piece that is used with the Board class.
 */
export class Knight extends Piece {
    /**
     * Instantiates an instance of Knight with the provided position and piece
     * id. The new instance belongs to the player with the provided player id.
     * 
     * @param {int} id Piece's id.
     * @param {int} rowPos Piece's row position.
     * @param {int} colPos Piece's column position.
     * @param {int} playerId Player id that the piece belongs to.
     */
    constructor(id, rowPos, colPos, playerId) {
        super();
        this.id = id;
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.playerId = playerId;
        this.unicodeChar = "&#9816;";  // White knight chess piece.
    }

    /**
     * Determines all possible moves of knight at current position.
     * 
     * @param {[[Piece]]} board Chess board (2D array of chess pieces).
     * @returns List of row-column indices on the chess board that indicate all
     * possible moves of knight at current position.
     */
    possibleMoves(board) {
        // Row-column offsets from knight's current position that yield
        // potential moves.
        const moveOffsets = [
            [-1, -2], [-2, -1], [-2, +1], [-1, +2],  // Moves above knight.
            [+1, -2], [+2, -1], [+2, +1], [+1, +2]  // Moves below knight.
        ];

        let possibleMoves = [];
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
     * 
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
     * 
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
