import { Bishop } from "./bishop";
import { King } from "./king";
import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { Piece } from "./piece";
import { Queen } from "./queen";
import { Rook } from "./rook";

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
