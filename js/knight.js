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
        return [
            ...this._movesLeftRight("left", board),
            ...this._movesLeftRight("right", board)
        ];
    }

    /**
     * Determines the possible moves to left or right of knight.
     *
     * @param {string} side Which side of knight to check for possible moves.
     * Valid args: "left" | "right"
     * @param {[[Piece]]} board Chess board (2D array of chess pieces).
     * @returns List of row-column indices on the chess board that indicate
     * possible moves to left or right of knight.
     */
    _movesLeftRight(side, board) {
        const validSides = ["left", "right"];
        if (!validSides.includes(side)) {
            throw new Error(`'${side}' is not a valid side`);
        }

        let possibleMoves = [];
        // Check moves below then above knight.
        const negateRowDiff = [false, false, true, true];
        // Check moves left or right of knight.
        const negateColDiff = (side === "left") ? true : false;
        for (
            // Offset from knight's current position.
            let i = 0, rowDiff = 2, colDiff = 1;
            i < 4;
            ++i, [rowDiff, colDiff] = [colDiff, rowDiff]
        ) {
            const row = this.rowPos + Math.pow(-1, negateRowDiff[i]) * rowDiff;
            const col = this.colPos + Math.pow(-1, negateColDiff) * colDiff;
            if (this._possibleMove(row, col, board)) {
                possibleMoves.push([row, col]);
            }
        }

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
