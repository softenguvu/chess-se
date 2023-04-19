import { Queen } from "../js/queen.js";

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
            null,
            "Verify [prevRowPos] member is null."
        );

        assert.deepEqual(
            queen.prevColPos,
            null,
            "Verify [prevColPos] member is null."
        );

        assert.deepEqual(
            queen.lastTake,
            null,
            "Verify [lastTake] member is null."
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
});
