import { Piece } from "./piece.js"

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
     * @param {int} playerOwner
     * 
     */
    constructor(id, rowPos, colPos, playerOwner) {
        super();
        this.id = id;
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.playerOwner = playerOwner;
        this.unicodeChar = "&#9813;";
    }


    /**
     * Move piece to new location and sets piece location property
     * @param {int} row New row position
     * @param {int} col New column position
     * @param {Array.<Array.<int>>} board 2D array representation of the board
     */
    movePiece(row, col, board) {
        
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
        for (let i = rowPos + 1; i < maxRows; i++) {
            if (board[i][colPos] !== null && board[i][colPos].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([i, colPos]);
        }
        /**
         * Get row decreasing moves
         */
        for (let i = rowPos - 1; i >= minRows; i--) {
            if (board[i][colPos] !== null && board[i][colPos].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([i, colPos]);
        }
        /**
         * Get col increasing moves
         */
        for (let i = colPos + 1; i < maxCols; i++) {
            if (board[rowPos][i] !== null && board[rowPos][i].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([rowPos, i]);
        }
        /**
         * Get col decreasing moves
         */
        for (let i = colPos - 1; i >= minCols; i--) {
            if (board[rowPos][i] !== null && board[rowPos][i].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([rowPos, i]);
        }
        /**
         * Get row and col increasing moves
         */
        for (let i = rowPos + 1, y = colPos + 1; i < maxRows && y < maxCols; i++, y++) {
            if (board[i][y] !== null && board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([i, y]);
        }

        /**
         * Get row and col decreasing moves
         */
        for (let i = rowPos - 1, y = colPos - 1; i >= minRows && y >= minCols; i--, y--) {
            if (board[i][y] !== null && board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([i, y]);
        }
        /**
         * Get row increasing and col decreasing moves
         */
        for (let i = rowPos + 1, y = colPos - 1; i < maxRows && y >= minCols; i++, y--) {
            if (board[i][y] !== null && board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([i, y]);
        }
        /**
         * Get row decreasing and col increasing moves
         */
        for (let i = rowPos - 1, y = colPos + 1; i >= minRows && y < maxCols; i--, y++) {
            if (board[i][y] !== null && board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            possibleMoves.push([i, y]);
        }
        return possibleMoves;
    }
}
