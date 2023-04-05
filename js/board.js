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

        // Row labels indexed from top down.
        Board.rowStr = "87654321";
        // Column labels indexed from left to right.
        Board.colStr = "abcdefgh";
        // 2D array of Piece.
        this.board = Array.from(new Array(8), () => new Array(8));
        // Mapping between player id and list of taken pieces.
        this.takenPieces = new Map();
    }

    /**
     * Marks the possible moves of a chess piece on the board.
     * 
     * @param {[[int, int]]} possibleMoves List of row-column indices on
     * the board that indicate possible moves of a chess piece.
     */
    markPossibleMoves(possibleMoves) {
        possibleMoves.forEach(location => {
            const [rowIndex, colIndex] = location;
            const squarePos = Board.colStr[colIndex] + Board.rowStr[rowIndex];
            const color = this.board[rowIndex][colIndex] ?
                "primaryRed" :  // Red if contains piece.
                "primaryRedBlack";  // RedBlack if doesn't contain piece.

            this._markSquare(squarePos, color);
        });
    }

    /**
     * Clears the board of all chess pieces and taken pieces.
     */
    reset() {
        this.board = Array.from(new Array(8), () => new Array(8));
        this.takenPieces.clear();
    }

    /**
     * Initializes chess pieces on the board and taken pieces for a game of
     * chess.
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
        this.takenPieces.set(playerOneId, []);

        // Initialize black's pieces.
        const playerTwoId = 1;
        const powerRowBlack = 7;  // Row index of black's power pieces.
        const pawnRowBlack = 6;  // Row index of black's pawns.
        currPieceId = this._initPlayerPieces(
            currPieceId, playerTwoId, powerRowBlack, pawnRowBlack
        );
        this.takenPieces.set(playerTwoId, []);
    }

    /**
     * Renders all chess pieces in the frontend.
     */
    renderPieces() {
        this._renderLivePieces();
        const playerOneId = 0;
        this._renderTakenPieces(playerOneId, "left-graveyard");
        const playerTwoId = 1;
        this._renderTakenPieces(playerTwoId, "right-graveyard");
    }

    /**
     * Marks a square on the board with the given color.
     * 
     * @param {string} squarePos Position (e.g. "a8") of the square on the
     * board that will be marked with the given color.
     * @param {string} color Color to mark the square on the board.
     */
    _markSquare(squarePos, color) {
        const squareBgColors = [
            "bg-black", "bg-white", "bg-primaryRedBlack", "bg-primaryRed"
        ];
        const boardSquare = document.getElementById(squarePos);
        boardSquare.classList.remove(...squareBgColors);
        boardSquare.classList.add("bg-" + color);
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
        for (let col = 0; col < this.board.length; ++currPieceId, ++col) {
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

    /**
     * Renders all chess pieces in the frontend chess board that have not been taken.
     */
    _renderLivePieces() {
        this.board.forEach((row, rowIndex) =>
            row.forEach((col, colIndex) => {
                if (col) {  // Contains piece.
                    const squarePos = Board.colStr[colIndex] + Board.rowStr[rowIndex];
                    const boardSquare = document.getElementById(squarePos);
                    boardSquare.innerHTML = col.unicodeChar;
                }
            })
        );
    }

    /**
     * Renders taken chess pieces for the player with the given player id in the
     * corresponding frontend graveyard with the given element id.
     * 
     * @param {int} playerId Player's id.
     * @param {string} graveyardId Frontend graveyard's HTML element id.
     */
    _renderTakenPieces(playerId, graveyardId) {
        const takenPiecesHTML = [];
        this.takenPieces.get(playerId).forEach(takenPiece =>
            takenPiecesHTML.push(`<div class="col">${takenPiece.unicodeChar}</div>`)
        );

        const graveyard = document.getElementById(graveyardId);
        graveyard.innerHTML = takenPiecesHTML.join("");
    }
}
