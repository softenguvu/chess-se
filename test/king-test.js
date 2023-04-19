import { Board } from  "../js/board.js";
import { King } from "../js/king.js";

QUnit.module("King", hooks => {
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
        let king = new King(1234, 0, 0, 0);

        assert.deepEqual(
            king.getId(),
            1234,
            "Verify {id} is 1234."
        );
        assert.deepEqual(
            king.getRowPos(),
            0,
            "Verify {row} is 0."
        );
        assert.deepEqual(
            king.getColPos(),
            0,
            "Verify {column} is 0."
        );
        assert.deepEqual(
            king.getPlayerId(),
            0,
            "Verify {playerId} is 0."
        );
        assert.deepEqual(
            king.prevRowPos,
            null,
            "Verify {prevRowPos} is null"
        )
        assert.deepEqual(
            king.prevColPos,
            null,
            "Verify {prevColPos} is null"
        )
        assert.deepEqual(
            king.lastTake,
            null,
            "Verify {taken} is false."
        );
        assert.deepEqual(
            king.unicodeChar,
            "&#9818;",
            "Verify {unicodeChar} is correct."
        );
        assert.deepEqual(
            king.lastTake,
            null,
            "Verify {lastTake} is null."
        );
    });

    /**
     * Test possibleMoves() with king at {0, 0} on empty board.
     */
    QUnit.test("possibleMoves() at {0, 0}", assert => {
        let king = new King(1234, 0, 0, 0);
        let possibleMoves = king.possibleMoves(board.board);
        let actualMoves = [
            [0, 1], [1, 0], [1, 1]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves contains valid moves."
        );
    });

    /**
     * Test possibleMoves() with king at {7, 7} on empty board.
     */
    QUnit.test("possibleMoves() at {7, 7}", assert => {
        let king = new King(1234, 7, 7, 0);
        let possibleMoves = king.possibleMoves(board.board);
        let actualMoves = [
            [7, 6], [6, 7], [6, 6]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves contains valid moves."
        );
    });

    /**
     * Test possibleMoves() with king at {3, 3} on empty board.
     */
    QUnit.test("possibleMoves() at {3, 3}", assert => {
        let king = new King(1234, 3, 3, 0);
        let possibleMoves = king.possibleMoves(board.board);
        let actualMoves = [
            [2, 2],[2, 3],[2, 4],[3, 2],
            [3, 4],[4, 2],[4, 3],[4, 4]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves contains valid moves."
        );
    });

    /**
     * Test possibleMoves() with init board.
     */
    QUnit.test("possibleMoves() with init board", assert => {
        let king = new King(1234, 0, 0, 1);
        board.initBoard();
        let possibleMoves = king.possibleMoves(board.board);
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
        let king = new King(1234, 0, 0, 0);
        let king2 = new King(1, 1, 0, 1);
        let king3 = new King (12, 0, 1, 1);
        board.board[1][0] = king2;
        board.board[0][1] = king3;
        let possibleMoves = king.possibleMoves(board.board);
        let actualMoves = [
            [1, 0], [0, 1], [1, 1]
        ];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(actualMoves),
            "Verify possibleMoves includes attack moves."
        );
    });
});
