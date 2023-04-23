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
            knight.playerId,
            0,
            "Verify {playerId} is 0."
        );
        assert.deepEqual(
            knight.unicodeChar,
            "U+265E",
            "Verify {unicodeChar} is correct."
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
     * Test possibleMoves() with friendly pieces
     */
    QUnit.test("possibleMoves() with friendly pieces", assert => {
        let knight = new Knight(0, 3, 3, 0);
        let knight1 = new Knight(1, 2, 1, 0);
        let knight2 = new Knight(2, 1, 2, 0);
        let knight3 = new Knight(3, 1, 4, 0);
        let knight4 = new Knight(4, 2, 5, 0);
        let knight5 = new Knight(5, 4, 1, 0);
        let knight6 = new Knight(6, 5, 2, 0);
        let knight7 = new Knight(7, 5, 4, 0);
        let knight8 = new Knight(8, 4, 5, 0);
        board.board[2][1] = knight1;
        board.board[1][2] = knight2;
        board.board[1][4] = knight3;
        board.board[2][5] = knight4;
        board.board[4][1] = knight5;
        board.board[5][2] = knight6;
        board.board[5][4] = knight7;
        board.board[4][5] = knight8;
        let possibleMoves = knight.possibleMoves(board.board);
        let expectedMoves = [];
        possibleMoves.sort();
        expectedMoves.sort();
        assert.deepEqual(
            JSON.stringify(possibleMoves),
            JSON.stringify(expectedMoves),
            "Verify {possibleMoves()} with friendly pieces"
        );

    });

    /**
     * Test possibleMoves() with enemy pieces
     */
    QUnit.test("possibleMoves() with enemy pieces", assert => {
        let knight = new Knight(0, 3, 3, 0);
        let knight1 = new Knight(1, 2, 1, 1);
        let knight2 = new Knight(2, 1, 2, 1);
        let knight3 = new Knight(3, 1, 4, 1);
        let knight4 = new Knight(4, 2, 5, 1);
        let knight5 = new Knight(5, 4, 1, 1);
        let knight6 = new Knight(6, 5, 2, 1);
        let knight7 = new Knight(7, 5, 4, 1);
        let knight8 = new Knight(8, 4, 5, 1);
        board.board[2][1] = knight1;
        board.board[1][2] = knight2;
        board.board[1][4] = knight3;
        board.board[2][5] = knight4;
        board.board[4][1] = knight5;
        board.board[5][2] = knight6;
        board.board[5][4] = knight7;
        board.board[4][5] = knight8;
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
            "Verify {possibleMoves()} with enemy pieces"
        );
    });
});
