import { Bishop } from "./bishop.js";
import { King } from "./king.js";
import { Knight } from "./knight.js";
import { Pawn } from "./pawn.js";
import { Piece } from "./piece.js";
import { Queen } from "./queen.js";
import { Rook } from "./rook.js";

/**
 * Represents an 8x8 chess board that contains chess pieces.
 */
export class Board {
    /**
     * Retrieves the singleton instance of Board.
     * 
     * @returns The singleton instance of Board.
     */
    constructor() {
        // Create singleton instance if necessary.
        if (Board._instance) {
            return Board._instance;
        }
        Board._instance = this;

        // 2D array of Piece.
        this.board = Array.from(new Array(8), () => new Array(8));
    }

    /**
     * Initializes chess pieces on the board for a game of chess.
     */
    initBoard() {
        let currPieceId = 0;

        // Initialize white's pieces.
        const playerOneId = 0;
        const powerRowWhite = 0;  // Row index of white's power pieces.
        const pawnRowWhite = 1;  // Row index of white's pawns.
        currPieceId = this._initPlayerPieces(
            currPieceId, playerOneId, powerRowWhite, pawnRowWhite
        );

        // Initialize black's pieces.
        const playerTwoId = 1;
        const powerRowBlack = 6;  // Row index of black's power pieces.
        const pawnRowBlack = 7;  // Row index of black's pawns.
        currPieceId = this._initPlayerPieces(
            currPieceId, playerTwoId, powerRowBlack, pawnRowBlack
        );
    }

    /**
     * Initializes player's chess pieces.
     * 
     * @param {int} currPieceId Current piece id that will be updated.
     * @param {int} playerId Player's id.
     * @param {int} powerRow Row index of player's power pieces.
     * @param {int} pawnRow Row index of player's pawns.
     * @returns Updated piece id.
     */
    _initPlayerPieces(currPieceId, playerId, powerRow, pawnRow) {
        currPieceId = this._initPowerRow(powerRow, currPieceId, playerId);
        currPieceId = this._initPawnRow(pawnRow, currPieceId, playerId);

        return currPieceId;
    }

    /**
     * Initializes player's pawns.
     * 
     * @param {int} pawnRow Row index of player's pawns.
     * @param {int} currPieceId Current piece id that will be updated.
     * @param {int} playerId Player's id.
     * @returns Updated piece id.
     */
    _initPawnRow(pawnRow, currPieceId, playerId) {
        for (let col = 0; i < this.board.length; ++currPieceId, ++col) {
            this._initPiece(Pawn, currPieceId, pawnRow, col, playerId);
        }

        return currPieceId;
    }

    /**
     * Initializes player's power pieces.
     * 
     * @param {int} powerRow Row index of player's power pieces.
     * @param {int} currPieceId Current piece id that will be updated.
     * @param {int} playerId Player's id.
     * @returns Updated piece id.
     */
    _initPowerRow(powerRow, currPieceId, playerId) {
        const powerPiecesRow = [
            Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook
        ];
        for (let col = 0; col < this.board.length; ++currPieceId, ++col) {
            const pieceType = powerPiecesRow[col];
            this._initPiece(pieceType, currPieceId, powerRow, col, playerId);
        }

        return currPieceId;
    }

    /**
     * Initializes a chess piece on the board.
     * 
     * @param {Piece} pieceType Type of chess piece to initialize.
     * @param {int} pieceId Piece id to initiliaze piece with.
     * @param {int} rowIndex Row index of piece's position.
     * @param {int} colIndex Column index of piece's position.
     * @param {int} playerId Player id to initialize piece with.
     */
    _initPiece(pieceType, pieceId, rowIndex, colIndex, playerId) {
        this.board[rowIndex][colIndex] = new pieceType(
            pieceId, rowIndex, colIndex, playerId
        );
    }
}
