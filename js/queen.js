import { Piece } from "./piece.js";

/*
* Represents a queen chess piece that is used with the Board class
*/
export class Queen extends Piece{
    /**
     * Instantiates a queen piece with the given position and piece ID.
     * The piece belongs to the player with the given player ID.
     * 
     * @param {int} id Piece's ID.
     * @param {int} rowPos Piece's row position.
     * @param {int} colPos Piece's column position.
     * @param {int} playerId
     * 
     */
    constructor(id, rowPos, colPos, playerId) {
        super();
        this.id = id;
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.playerId = playerId;
        this.unicodeChar = "&#9813;";
    }

    /**
     * Gets list of possible moves that the queen piece can make.
     * It looks in every direction the queen can move and continues to
     * add moves to the possible moves array unless another piece or
     * the end of the board in encountered. If another piece is encountered,
     * the queen can only move there if it belongs to the other player.
     * 
     * @param {Array.<Array.<int>>} board A 2D array representation of the board.
     * @returns {Array.<Array.<int>>} Returns a 2D array of the possible moves.
     */
    possibleMoves(board) {
        let possibleMoves = [];

        let maxRows = board.length;
        let maxCols = board[0].length;
        let minRows, minCols = 0;
        /**
         * Get row increasing moves
         */
        for (let i = this.rowPos + 1; i < maxRows; i++) {
            if (board[i][this.colPos] !== undefined && board[i][this.colPos].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([i, this.colPos]);
        }
        /**
         * Get row decreasing moves
         */
        for (let i = this.rowPos - 1; i >= minRows; i--) {
            if (board[i][this.colPos] !== undefined && board[i][this.colPos].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([i, this.colPos]);
        }
        /**
         * Get col increasing moves
         */
        for (let i = this.colPos + 1; i < maxCols; i++) {
            if (board[this.rowPos][i] !== undefined && board[this.rowPos][i].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([this.rowPos, i]);
        }
        /**
         * Get col decreasing moves
         */
        for (let i = this.colPos - 1; i >= minCols; i--) {
            if (board[this.rowPos][i] !== undefined && board[this.rowPos][i].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([this.rowPos, i]);
        }
        /**
         * Get row and col increasing moves
         */
        for (let i = this.rowPos + 1, y = this.colPos + 1; i < maxRows && y < maxCols; i++, y++) {
            if (board[i][y] !== undefined && board[i][y].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([i, y]);
        }

        /**
         * Get row and col decreasing moves
         */
        for (let i = this.rowPos - 1, y = this.colPos - 1; i >= minRows && y >= minCols; i--, y--) {
            if (board[i][y] !== undefined && board[i][y].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([i, y]);
        }
        /**
         * Get row increasing and col decreasing moves
         */
        for (let i = this.rowPos + 1, y = this.colPos - 1; i < maxRows && y >= minCols; i++, y--) {
            if (board[i][y] !== undefined && board[i][y].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([i, y]);
        }
        /**
         * Get row decreasing and col increasing moves
         */
        for (let i = this.rowPos - 1, y = this.colPos + 1; i >= minRows && y < maxCols; i--, y++) {
            if (board[i][y] !== undefined && board[i][y].getPlayerId() == this.playerId) {
                break;
            }
            possibleMoves.push([i, y]);
        }
        return possibleMoves;
    }
}
