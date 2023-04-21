import { Board } from  "../js/board.js";
import { Knight } from "../js/knight.js";

/**
 * Test suite for the Knight class.
 */
QUnit.module("Knight", hooks => {
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
        let knight = new Knight(6969, 0, 0, 0);

        assert.deepEqual(
            knight.getId(),
            6969,
            "Verify {id} is 6969."
        );
        assert.deepEqual(
            knight.getRowPos(),
            0,
            "Verify {row} is 0."
        );
        assert.deepEqual(
            knight.getColPos(),
            0,
            "Verify {column} is 0."
        );
        assert.deepEqual(
            knight.unicodeChar,
            "U+265E",
            "Verify {unicodeChar} is correct."
        );
        assert.deepEqual(
            knight.playerId,
            0,
            "Verify {playerId} is 0."
        );
        assert.deepEqual(
            knight.lastTake,
            null,
            "Verify {lastTake} is null."
        );
    });

    /**
     * Test possibleMoves() with knight in the center of an empty board
     */
    QUnit.test("possibleMoves() at {3,3}", assert => {
        let knight = new Knight(420, 3, 3, 0);
        let possibleMoves = knight.possibleMoves(board.board);
        let expectedMoves = [
            [1,2], [1, 4], [2,1], [2,5],
            [4,1], [4, 5], [5,2], [5,4]
        ];
        possibleMoves.sort();
        expectedMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(expectedMoves),
            "Verify {possibleMoves()} in center of empty board."
        );
    })

    /**
     * Test possibleMoves() with knight at [0,0]
     */
    QUnit.test("possibleMoves() at {0,0}", assert => {
        let knight = new Knight(6969, 0, 0, 0)
        let possibleMoves = knight.possibleMoves(board.board);
        let expectedMoves = [[1,2], [2,1]];
        possibleMoves.sort();
        expectedMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(expectedMoves),
            "Verify {possibleMoves() at [0,0]"
        );
    });

    /**
    * Test possibleMoves() with knight at [7,7]
    */
    QUnit.test("possibleMoves() at {7,7}", assert => {
        let knight = new Knight(6969, 7, 7, 0)
        let possibleMoves = knight.possibleMoves(board.board);
        let expectedMoves = [[6,5], [5,6]];
        possibleMoves.sort();
        expectedMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(expectedMoves),
            "Verify {possibleMoves() at [7,7]"
        );
    });
    
    /**
     * Test possibleMoves() with other pieces
     */
    QUnit.test("possibleMoves() with other pieces", assert => {
        let knight = new Knight(0, 3, 3, 0);
        let knight1 = new Knight(1, 2, 1, 0);
        let knight2 = new Knight(2, 1, 2, 1);
        board.board[2][1] = knight1;
        board.board[1][2] = knight2;
        let possibleMoves = knight.possibleMoves(board.board);
        let expectedMoves = [
            [1,2], [1, 4], [2,5],
            [4,1], [4, 5], [5,2], [5,4]
        ];
        possibleMoves.sort();
        expectedMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(expectedMoves),
            "Verify {possibleMoves()} with other pieces on the board"
        );

    });

});