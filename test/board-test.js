import { Board } from  "../js/board.js";
import { Rook } from "../js/rook.js";
import { Pawn } from "../js/pawn.js";

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
        board.reset();
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

    /**
     * Test initBoard().
     */
    QUnit.test("initBoard()", assert => {
        board.initBoard();
        assert.deepEqual(
            board.board[0][0],
            new Rook(16, 0, 0, 1),
            "Verify [board] member contains black Rook at A8."
        );

        assert.deepEqual(
            board.board[7][7],
            new Rook(7, 7, 7, 0),
            "Verify [board] member contains white Rook at H1."
        );

        assert.deepEqual(
            board.board[1][1],
            new Pawn(25, 1, 1, 1),
            "Verify [board] member contains black Pawn at B7."
        );

        assert.deepEqual(
            board.board[6][6],
            new Pawn(14, 6, 6, 0),
            "Verify [board] member contains white Pawn at G2."
        );

        const playerOneId = 0;
        assert.true(
            board.takenPieces.has(playerOneId),
            "Verify [takenPieces] member has key for player one id."
        );

        assert.deepEqual(
            board.takenPieces.get(playerOneId),
            [],
            "Verify [takenPieces] member has empty array for player one."
        );

        const playerTwoId = 1;
        assert.true(
            board.takenPieces.has(playerTwoId),
            "Verify [takenPieces] member has key for player two id."
        );

        assert.deepEqual(
            board.takenPieces.get(playerTwoId),
            [],
            "Verify [takenPieces] member has empty array for player one."
        );

        assert.deepEqual(
            board.lastPieceMoved,
            null,
            "Verify [lastPieceMoved] member is still null."
        );
    });
});
