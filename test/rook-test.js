import { Board } from  "../js/board.js";
import { Rook } from "../js/rook.js";

QUnit.module("Rook", hooks => {
    let board;

    hooks.beforeEach(() => {
        board = new Board();
    });

    hooks.afterEach(() => {
        board.reset();
    });

    /**
     * Test Constructor
     */
    QUnit.test("Constructor", assert => {
        let rook = new Rook(1234, 0, 0, 0);

        assert.deepEqual(
            rook.getId(),
            1234,
            "Verify {id} is 1234."
        );
        assert.deepEqual(
            rook.getRowPos(),
            0,
            "Verify {row} is 0."
        );
        assert.deepEqual(
            rook.getColPos(),
            0,
            "Verify {column} is 0."
        );
        assert.deepEqual(
            rook.getPlayerId(),
            0,
            "Verify {playerId} is 0."
        );
        assert.deepEqual(
            rook.prevRowPos,
            null,
            "Verify {prevRowPos} is null"
        )
        assert.deepEqual(
            rook.prevColPos,
            null,
            "Verify {prevColPos} is null"
        )
        assert.deepEqual(
            rook.lastTake,
            null,
            "Verify {taken} is false."
        );
        assert.deepEqual(
            rook.unicodeChar,
            "&#9820;",
            "Verify {unicodeChar} is correct."
        );
        assert.deepEqual(
            rook.lastTake,
            null,
            "Verify {lastTake} is null."
        );
    });

    /**
     * Test possibleMoves() with rook at {0, 0} on empty board.
     */
    QUnit.test("possibleMoves() at {0, 0}", assert => {
        let rook = new Rook(1234, 0, 0, 0);
        let possibleMoves = rook.possibleMoves(board.board);
        let actualMoves = [
            [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves contains all row 0 and all col 0."
        );
    });

    /**
     * Test possibleMoves() with rook at {7, 7} on empty board.
     */
    QUnit.test("possibleMoves() at {7, 7}", assert => {
        let rook = new Rook(1234, 7, 7, 0);
        let possibleMoves = rook.possibleMoves(board.board);
        let actualMoves = [
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
            [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves contains all row 7 and all col 7."
        );
    });

    /**
     * Test possibleMoves() with rook at {3, 3} on empty board.
     */
    QUnit.test("possibleMoves() at {3, 3}", assert => {
        let rook = new Rook(1234, 3, 3, 0);
        let possibleMoves = rook.possibleMoves(board.board);
        let actualMoves = [
            [3, 0], [3, 1], [3, 2], [3, 4], [3, 5], [3, 6], [3, 7],
            [0, 3], [1, 3], [2, 3], [4, 3], [5, 3], [6, 3], [7, 3]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves contains all row 3 and all col 3."
        );
    });

    /**
     * Test possibleMoves() with init board.
     */
    QUnit.test("possibleMoves() with init board", assert => {
        let rook = new Rook(1234, 0, 0, 1);
        board.initBoard();
        let possibleMoves = rook.possibleMoves(board.board);
        let actualMoves = [];
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves with init board returns nothing."
        );
    });

    /**
     * Test possibleMoves() attack moves.
     */
    QUnit.test("possibleMoves() with attack moves", assert => {
        let rook = new Rook(1234, 0, 0, 0);
        let rook2 = new Rook(1, 1, 0, 1);
        let rook3 = new Rook (12, 0, 1, 1);
        board.board[1][0] = rook2;
        board.board[0][1] = rook3;
        let possibleMoves = rook.possibleMoves(board.board);
        let actualMoves = [
            [1, 0], [0, 1]
        ];
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves includes attack moves."
        );
    });
});
