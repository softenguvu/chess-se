import { Piece } from './piece.js';

/**
 * Bishop chess piece class implementation
 */

export class Bishop extends Piece {
    /**
    * Instantiates an instance of Bishop with the provided position and piece
    * id. The new instance belongs to the player with the provided player id.
    * * 
    * @param {int} id Piece's id.
    * @param {int} rowPos Piece's row index..
    * @param {int} colPos Piece's column index.
    * @param {int} playerId Player id that the piece belongs to.
    */
    constructor(pieceId, rowPos, colPos, playerId) {
        super();
        this.pieceId = pieceId;
        this.rowPos = rowPos;
        this.colPos = colPos;
        this.playerId = playerId;
        this.unicodeChar = "&#9815;";
    }

    /**
     * Returns an array of all possible moves
     * for the Bishop chess piece from it's current position on the board. 
     * 
     */

    possibleMoves(board) {

        let possibleMoves = []; //holds possible moves for the Bishop 
        const diagonals = [-1, 1]; //moving Bishop piece in different diagonal directions. 

        for (const rowDiagonal of diagonals) {
            for (const colDiagonal of diagonals) {
                //calculate the new row and new columns based on current position of the Bishop. 
                let newRow = this.rowPos + rowDiagonal;
                let newCol = this.colPos + colDiagonal;
                while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    // check if the square contains opponent's piece 
                    if (board[newRow][newCol] && board[newRow][newCol].getPlayerId() !== playerId) {
                        possibleMoves.push([newRow, newCol]);
                        break;
                    }
                    // check if the square is occupied by same player's piece 
                    if (board[newRow][newCol] && board[newRow][newCol].getPlayerId() === playerId) {
                        break;
                    }
                    // check if the square is on the same diagonal path as the Bishop  
                    if (Math.abs(this.rowPos - newRow) === Math.abs(this.colPos - newCol)) {
                        possibleMoves.push([newRow, newCol]);
                    }
                    newRow += rowDiagonal;
                    newCol += colDiagonal;
                }
            }
        }

        return possibleMoves;
    }

}