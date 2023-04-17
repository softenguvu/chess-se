import { Board } from  "../js/board.js";

/**
 * Test suite for the Board class.
 */
QUnit.module("Board", hooks => {
    let board;

    hooks.beforeEach(() => {
        board = new Board();
    });

    hooks.afterEach(() => {
        board.reset();
    });

    /**
     * Test constructor().
     */
    QUnit.test("constructor()", assert => {
        const anotherBoard = new Board();
        assert.deepEqual(
            anotherBoard,
            board,
            "Verify singleton constructor produces singleton."
        );

        assert.deepEqual(
            board.board,
            Array.from(new Array(8), () => Array(8)),
            "Verify [board] member is an empty 8x8 Array."
        );

        assert.deepEqual(
            board.takenPieces,
            new Map(),
            "Verify [takenPieces] member is an empty Map."
        );

        assert.deepEqual(
            board.lastPieceMoved,
            null,
            "Verify [lastPieceMoved] member is null."
        );
    });

    /**
     * Test reset().
     */
    QUnit.test("reset()", assert => {
        assert.deepEqual(
            board.board,
            Array.from(new Array(8), () => Array(8)),
            "Verify [board] member is now an empty 8x8 Array."
        );

        assert.deepEqual(
            board.takenPieces,
            new Map(),
            "Verify [takenPieces] member is now an empty Map."
        );

        assert.deepEqual(
            board.lastPieceMoved,
            null,
            "Verify [lastPieceMoved] member is now null."
        );
    });
});
