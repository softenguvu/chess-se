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
     * Moves piece to {row}, {col} and updates board
     * @param row new row
     * @param col new column
     * @param board Board.board
     */
    movePiece(row, col, board) {
        let possibleMoves = this.possibleMoves(board);
        if (!this.validateMove(row, col, possibleMoves)) { // ignore invalid move
            return;
        }

        if (board[row][col]) { // taking a piece
            this.takenPiece = board[row][col];
            this.takenPiece.setTaken();
            board[row][col] = null;
        }
        else {
            this.takenPiece = null;
        }

        // Update board
        board[this.rowPos][this.colPos] = null;
        board[row][col] = this;

        // Update piece position
        this.rowPos = row;
        this.colPos = col;
    }

    /**
     * Gets a list of possible moves the rook piece can make including attack moves
     * @param board 8x8 board array
     * @returns {*[]}
     */
    possibleMoves(board) {
        let possibleMoves = [];
        for (let i = this.rowPos + 1; i < 8; i++) { // check below
            if (board[i][this.colPos] && board[i][this.colPos].getPlayerId() !== this.playerId) {
                possibleMoves.push([i, this.colPos]);
                break;
            }
            possibleMoves.push([i, this.colPos]);
        }
        for (let i = this.rowPos - 1; i >= 0; i--) { // check above
            if (board[i][this.colPos] && board[i][this.colPos].getPlayerId() !== this.playerId) {
                possibleMoves.push([i, this.colPos]);
                break;
            }
            possibleMoves.push([i, this.colPos]);
        }
        for (let i = this.colPos + 1; i < 8; i++) { // check to the right
            if (board[this.rowPos][i] && board[this.rowPos][i].getPlayerId() !== this.playerId) {
                possibleMoves.push([this.rowPos, i]);
                break;
            }
            possibleMoves.push([this.rowPos, i]);
        }
        for (let i = this.colPos - 1; i >= 0; i--) { // check to the left
            if (board[this.rowPos][i] && board[this.rowPos][i].getPlayerId() !== this.playerId) {
                possibleMoves.push([this.rowPos, i]);
                break;
            }
            possibleMoves.push([this.rowPos, i]);
        }
        return possibleMoves;
    }
}


