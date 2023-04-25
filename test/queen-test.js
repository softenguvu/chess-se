import { Queen } from "../js/queen.js";
import { Board } from "../js/board.js";

/**
 * Test suite for the Queen class.
 */
QUnit.module("Queen", hooks => {
    /**
     * Test constructor().
     */
    QUnit.test("constructor()", assert => {
        const pieceId = 0;
        const rowPos = 0;
        const colPos = 0;
        const playerId = 0;

        const queen = new Queen(pieceId, rowPos, colPos, playerId);
        assert.deepEqual(
            queen.getId(),
            pieceId,
            "Verify [id] member is initialized correctly."
        );

        assert.deepEqual(
            queen.getRowPos(),
            rowPos,
            "Verify [rowPos] member is initialized correctly."
        );

        assert.deepEqual(
            queen.getColPos(),
            colPos,
            "Verify [colPos] member is initialized correctly."
        );

        assert.deepEqual(
            queen.prevRowPos,
            rowPos,
            "Verify [prevRowPos] member is initialized correctly."
        );

        assert.deepEqual(
            queen.prevColPos,
            colPos,
            "Verify [prevColPos] member is initialized correctly."
        );

        assert.deepEqual(
            queen.lastTake,
            null,
            "Verify [lastTake] member is initialized as null."
        );

        assert.deepEqual(
            queen.getPlayerId(),
            playerId,
            "Verify [playerId] member is initialized correctly."
        );

        const blackQueenUnicode = "&#9819;";
        assert.deepEqual(
            queen.unicodeChar,
            blackQueenUnicode,
            "Verify [unicodeChar] member is initialized as black queen."
        );
    });

    /**
     * Test possibleMoves().
     */
    QUnit.test("possibleMoves()", assert => {
        const board = new Board();

        const pieceId = 0;
        const rowPos = 4;
        const colPos = 3;
        const playerId = 0;

        const queen = new Queen(pieceId, rowPos, colPos, playerId);

        const rangeOneThree = [...Array(3).keys()].map(i => i + 1);
        const rangeOneFour = [...Array(4).keys()].map(i => i + 1);

        const movesBelowCenter = rangeOneThree.map(i => [rowPos + i, colPos]);
        const movesAboveCenter = rangeOneFour.map(i => [rowPos - i, colPos]);
        const movesRightCenter = rangeOneFour.map(i => [rowPos, colPos + i]);
        const movesLeftCenter = rangeOneThree.map(i => [rowPos, colPos - i]);
        const movesSouthEastCenter = rangeOneThree.map(i => [rowPos + i, colPos + i]);
        const movesNorthWestCenter = rangeOneThree.map(i => [rowPos - i, colPos - i]);
        const movesSouthWestCenter = rangeOneThree.map(i => [rowPos + i, colPos - i]);
        const movesNorthEastCenter = rangeOneFour.map(i => [rowPos - i, colPos + i]);
        assert.deepEqual(
            queen.possibleMoves(board.board),
            [
                ...movesBelowCenter,
                ...movesAboveCenter,
                ...movesRightCenter,
                ...movesLeftCenter,
                ...movesSouthEastCenter,
                ...movesNorthWestCenter,
                ...movesSouthWestCenter,
                ...movesNorthEastCenter
            ],
            "Verify [possibleMoves] detects moves in all directions to board's edges."
        );

        const posDiffs = [
            [1, 0], [-1, 0], [0, 1], [0, -1],  // S., N., E., W.
            [1, 1], [-1, -1], [1, -1], [-1, 1]  // SE., NW., SW., NE.
        ];

        const enemyPlayerId = 1;
        const enemyLocations = [];
        posDiffs.forEach(([rowDiff, colDiff]) => {
            board.board[rowPos + rowDiff][colPos + colDiff] = new Queen(
                0, rowPos + rowDiff, colPos + colDiff, enemyPlayerId
            );
            enemyLocations.push([rowPos + rowDiff, colPos + colDiff]);
        });
        assert.deepEqual(
            queen.possibleMoves(board.board),
            enemyLocations,
            "Verify [possibleMoves] detects enemies and stops in all directions."
        );

        posDiffs.forEach(([rowDiff, colDiff]) =>
            board.board[rowPos + rowDiff][colPos + colDiff] = new Queen(
                0, rowPos + rowDiff, colPos + colDiff, playerId
            )
        );
        const friendLocations = [];
        assert.deepEqual(
            queen.possibleMoves(board.board),
            friendLocations,
            "Verify [possibleMoves] detects friends and stops in all directions."
        );
    });
});
