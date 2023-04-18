import { Board } from  "../js/board.js";
import { Rook } from "../js/rook.js";
import { Pawn } from "../js/pawn.js";
import { King } from "../js/king.js";
import { Queen } from "../js/queen.js";
import { Knight } from "../js/knight.js";
import { Bishop } from "../js/bishop.js";

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

    /**
     * Test _initPlayerPieces().
     */
    QUnit.test("_initPlayerPieces()", assert => {
        assert.deepEqual(
            board._initPlayerPieces(0, 1, 0, 1),
            16,
            "Verify piece id is 16 after initializing a player's pieces."
        );

        assert.deepEqual(
            board.board[0][4],
            new King(4, 0, 4, 1),
            "Verify [board] member contains black King at E8."
        );

        assert.deepEqual(
            board.board[0][3],
            new Queen(3, 0, 3, 1),
            "Verify [board] member contains black Queen at D8."
        );

        assert.deepEqual(
            board.board[1][0],
            new Pawn(8, 1, 0, 1),
            "Verify [board] member contains black Pawn at A7."
        );
    });

    /**
     * Test _initPawnRow().
     */
    QUnit.test("_initPawnRow()", assert => {
        assert.deepEqual(
            board._initPawnRow(0, 0, 0),
            8,
            "Verify piece id is 8 after initializing a row of Pawns."
        );

        const pawnRow = Array(8);
        for (let i = 0; i < 8; ++i) {
            pawnRow[i] = new Pawn(i, 0, i, 0);
        }
        assert.deepEqual(
            board.board[0],
            pawnRow,
            "Verify row contains only Pawns after initialization."
        );
    });

    /**
     * Test _initPowerRow().
     */
    QUnit.test("_initPowerRow()", assert => {
        assert.deepEqual(
            board._initPowerRow(0, 0, 0),
            8,
            "Verify piece id is 8 after initializing a row of power pieces."
        );

        const powerPieces = [
            Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook
        ];
        const powerRow = powerPieces.map(
            (pieceType, i) => new pieceType(i, 0, i, 0)
        );
        assert.deepEqual(
            board.board[0],
            powerRow,
            "Verify row contains power pieces in correct order after initialization."
        );
    });

    /**
     * Test _initPiece().
     */
    QUnit.test("_initPiece()", assert => {
        board._initPiece(King, 0, 0, 0, 0);
        assert.true(
            !!board.board[0][0],
            "Verify [board] member contains piece after initializing piece."
        );

        assert.deepEqual(
            board.board[0][0],
            new King(0, 0, 0, 0),
            "Verify [board] member contains correct piece after initializing piece."
        );
    });
});
