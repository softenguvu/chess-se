import { Piece } from './piece.js';

/**
 * Bishop chess piece class implementation
 */

    /**
     * Instantiates an instance of Bishop with the provided indexes and piece
     * id. The new instance belongs to the player with the provided player id.
     * 
     * @param {int} id Piece's id.
     * @param {int} rowIndex Piece's row index..
     * @param {int} colIndex Piece's column index.
     * @param {int} playerId Player id that the piece belongs to.
     */

export class Bishop extends Piece {
    constructor(pieceId, rowIndex, colIndex, playerId) {
        super();
        this.pieceId = pieceId;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.playerId = playerId;
        this.unicodeChar = "&#9815;";
    }

    /**
     * Moves piece to the new Row and the new Column 
     * for the Bishop chess piece, takes opponent's piece, 
     * and updates board. 
     */

    movePiece(newRow, newCol, board) {
        //Function will be changing once map for graveyards are added
        let possibleMoves = this.possibleMoves(board);
        if (this.validateMove(newRow, newCol, possibleMoves)) {
            //Take piece if it's a valid move
            if (board[newRow][newCol] && board[newRow][newCol].playerId !== this.playerId) {
                this.takenPiece = board[newRow][newCol]
                this.takenPiece.setTaken();
                board[newRow][newCol] = null;
            } else{
                this.takenPiece = null; // Set takenPiece attribute to null if pieces isn't taken.
            }
            //Update board on back end
            board[this.rowIndex][this.colIndex] = null;
            board[newRow][newCol] = this;

            //Update piece's position 
            this.rowIndex = newRow;
            this.colIndex = newCol;
        }
    }


    /**
     * Returns an array of all possible moves
     * for the Bishop chess piece in the chess game. 
     * 
     */

    possibleMoves(board) {
        //simplify repeated code for the four different directions, can be thrown into nested for-loop
        //incorporate the validateMove and convertPos functions from Piece class 
        let possibleMoves = []; //holds possible moves for the Bishop 
        const diagonals = [-1, 1]; //moving Bishop piece in different directions. 

        for (const rowDiagonal of diagonals) {
            for (const colDiagonal of diagonals) {
                for (let i = 1; i < 8; i++) {
                    //calculate the new row and new columns based on current position of the Bishop. 
                    let newRow = this.rowIndex + rowDiagonal * i;
                    let newCol = this.colIndex + colDiagonal * i;
                    //out-of-bounds board checking
                    if (newRow < 0 || newCol < 0 || newRow > 7 || newCol > 7) {
                        break;
                    }
                    //if move isn't valid, break, don't add to possibleMoves 
                    if (!this.validateMove(newRow, newCol, possibleMoves)) {
                        break;
                    }
                    //if move is valid, push the move and convert the piece position into id.
                    possibleMoves.push(this.convertPos(newRow, newCol));

                    //unable to move past pieces in the bishop's path, so don't add to possibleMoves 
                    if (board[newRow][newCol]) {
                        break;
                    }
                }
            }
        }
        return possibleMoves;
    }
}


//const bishop = new Bishop(0, 0, 2, 1);
//console.log(bishop);