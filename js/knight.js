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
}
