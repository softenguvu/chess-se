import { Board } from "./board.js"
/*
* Queen class
*/

export class Queen extends Piece{
    /**
     * Constructor
     */
    constructor(pieceId, rowIndex, colIndex, playerId) {
        super();
        id = pieceId;
        rowPos = rowIndex;
        colPos = colIndex;
        playerOwner = playerId;
    }


    /**
     * Move piece to new location and sets piece location property
     */
    movePiece() {
        
    }

    /**
     * Gets list of possible moves piece can make
     */
    possibleMoves() {
        let possibleMoves = [];
        let moveToAdd = [];
        /**
         * Get row increasing moves
         */
        for (let i = rowPos + 1; i <= 7; i++) {
            if (Board[i][colPos] !== null && Board[i][colPos].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [i, colPos];
            possibleMoves.push(moveToAdd);
        }
        /**
         * Get row decreasing moves
         */
        for (let i = rowPos - 1; i >= 0; i--) {
            if (Board[i][colPos] !== null && Board[i][colPos].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [i, colPos];
            possibleMoves.push(moveToAdd);
        }
        /**
         * Get col increasing moves
         */
        for (let i = colPos + 1; i <= 7; i++) {
            if (Board[rowPos][i] !== null && Board[rowPos][i].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [rowPos, i];
            possibleMoves.push(moveToAdd);
        }
        /**
         * Get col decreasing moves
         */
        for (let i = colPos - 1; i >= 0; i--) {
            if (Board[rowPos][i] !== null && Board[rowPos][i].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [rowPos, i];
            possibleMoves.push(moveToAdd);
        }
        /**
         * Get row and col increasing moves
         */
        let i = rowPos + 1;
        let y = colPos + 1;
        while (i <= 7 && y <= 7) {
            if (Board[i][y] !== null && Board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [i, y];
            possibleMoves.push(moveToAdd);
            i++;
            y++;
        }
        /**
         * Get row and col decreasing moves
         */
        i = rowPos - 1;
        y = colPos - 1;
        while (i >= 0 && y >= 0) {
            if (Board[i][y] !== null && Board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [i, y];
            possibleMoves.push(moveToAdd);
            i--;
            y--;
        }
        /**
         * Get row increasing and col decreasing moves
         */
        i = rowPos + 1;
        y = colPos - 1;
        while (i <= 7 && y >= 0) {
            if (Board[i][y] !== null && Board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [i, y];
            possibleMoves.push(moveToAdd);
            i++;
            y--;
        }
        /**
         * Get row decreasing and col increasing moves
         */
        i = rowPos - 1;
        y = colPos + 1;
        while (i >= 0 && y <= 7) {
            if (Board[i][y] !== null && Board[i][y].getPlayerOwner() == playerOwner) {
                break;
            }
            moveToAdd = [i, y];
            possibleMoves.push(moveToAdd);
            i--;
            y++;
        }
        return possibleMoves;
    }
}