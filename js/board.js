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
}
