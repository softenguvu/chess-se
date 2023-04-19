import { Board } from "../js/board.js";
import { Bishop } from "../js/bishop.js";

/**
 * QUnit Module for Bishop class testing. 
 */
QUnit.module("Bishop", hooks => {
    let board;

    //Create a new Board before each test.
    hooks.beforeEach(() => {
        board = new Board();
    });

    //Reset the board after each test. 
    hooks.afterEach(() => {
        board.reset();
    });

    /**
     * Test cases for the Bishop constructor. 
     */

    //PlayerId test 
    QUnit.test('Test getPlayerId()', function (assert) {
        let testPiece = new Bishop(1, 3, 3, 1);
        assert.strictEqual(testPiece.getPlayerId(), 1, 'PlayerId is correct.');
    });

    //Row position test
    QUnit.test('Test getRowPos()', function (assert) {
        let testPiece = new Bishop(0, 5, 0, 0);
        assert.strictEqual(testPiece.getRowPos(), 5, 'RowPos is correct.');
    });

    //Column position test
    QUnit.test('Test getColPos()', function (assert) {
        let testPiece = new Bishop(0, 3, 3, 1);
        assert.strictEqual(testPiece.getColPos(), 3, 'ColPos is correct.');
    });

    //Piece Id test
    QUnit.test('Test getId()', function (assert) {
        let testPiece = new Bishop(15, 0, 0, 0);
        assert.strictEqual(testPiece.getId(), 15, 'PieceId is correct.');
    });

    //Unicode Character test 
    QUnit.test('Test unicodeChar', function (assert) {
        let testPiece = new Bishop(0, 1, 1, 1);
        assert.strictEqual(testPiece.unicodeChar, "&#9821;", 'unicodeChar is correct.');
    });

    //lastTake test
    QUnit.test('Test lastTake', function (assert) {
        let testPiece = new Bishop(0, 5, 0, 0);
        assert.strictEqual(testPiece.lastTake, null, 'lastTake is null.');
    });



    /**
     * Test that possibleMoves() is empty for Bishop when board is initialized.
     */
    QUnit.test("Test possibleMoves() with init board", assert => {
        let bishop = new Bishop(0, 0, 2, 1);
        board.initBoard();
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves = [];
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves is empty for the Bishop at position 0, 2."
        );
    });

    /**
     * Test for the Bishop possibleMoves function when at position 3, 4 on empty chessboard. 
     */
    QUnit.test("Test possibleMoves() at position {3, 4}", assert => {
        let bishop = new Bishop(1, 3, 4, 1);
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves =
            [[0, 1], [0, 7], [1, 2], [1, 6], [2, 3], [2, 5], [4, 3], [4, 5], [5, 2], [5, 6], [6, 1], [6, 7], [7, 0]]
            ;
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves were correctly calculated for the Bishop at position 3,4."
        );
    });


    /**
     * Test for the Bishop possibleMoves function when at position 0, 0 on empty chessboard. 
     */
    QUnit.test("Test possibleMoves() at position {0, 0}", assert => {
        let bishop = new Bishop(1, 0, 0, 1);
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves =
            [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
            ;
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves were correctly calculated for the Bishop at position 0, 0."
        );
    });



    /**
     * Test for the Bishop possibleMoves function when at position 7, 7 on empty chessboard. 
     */
    QUnit.test("Test possibleMoves() at position {7, 7}", assert => {
        let bishop = new Bishop(1, 7, 7, 1);
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves =
            [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]];
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves were correctly calculated for the Bishop at position 7, 7."
        );
    });


    /**
     * Test for the Bishop possibleMoves function when at position 7, 0 on empty chessboard. 
     */
    QUnit.test("Test possibleMoves() at position {7, 0}", assert => {
        let bishop = new Bishop(1, 7, 0, 1);
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves =
            [[0, 7], [1, 6], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1]]
            ;
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves were correctly calculated for the Bishop at position 7, 0."
        );
    });

    /**
     * Test for the Bishop possibleMoves function when at position 0, 7 on empty chessboard. 
     */
    QUnit.test("Test possibleMoves() at position {0, 7}", assert => {
        let bishop = new Bishop(1, 0, 7, 1);
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves =
            [[1, 6], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1], [7, 0]]
            ;
        possibleMoves.sort();
        actualMoves.sort();
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves were correctly calculated for the Bishop at position 0, 7."
        );
    });


    /**
    *Test that possibleMoves() ensures that the attack moves are included, and does not add moves past the piece to be attacked.
    */
    QUnit.test("Test possibleMoves() with attack moves", assert => {
        let bishop = new Bishop(4, 0, 4, 0);
        let enemy1 = new Bishop(1, 1, 3, 1);
        let enemy2 = new Bishop(1, 1, 5, 1);
        board.board[1][3] = enemy1;
        board.board[1][5] = enemy2;
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves = [
            [1, 3], [1, 5]
        ];
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves function does include attack move, does not add moves past the piece blocking path."
        );
    });


    /**
    *Test that possibleMoves() does not include pieces in it's path that have the same player id. 
    */
    QUnit.test("possibleMoves() with same player id", assert => {
        let bishop = new Bishop(2, 1, 4, 1);
        let teammate1 = new Bishop(4, 3, 2, 1);
        let teammate2 = new Bishop(6, 3, 6, 1);
        board.board[3][2] = teammate1;
        board.board[3][6] = teammate2;
        let possibleMoves = bishop.possibleMoves(board.board);
        let actualMoves = [[0, 3], [0, 5], [2, 3], [2, 5]];
        assert.deepEqual(
            possibleMoves,
            actualMoves,
            "Possible moves function does not include moves to squares with pieces that belong to the player."
        );
    });
});