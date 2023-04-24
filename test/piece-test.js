import { Piece } from  "../js/piece.js";
import { Rook } from "../js/rook.js";
import {Board} from "../js/board.js";

/**
 * Test suite for the Piece class.
 */

QUnit.module("Piece", hooks => {
    let board;
    let testPiece;

    hooks.beforeEach(() => {
        board = new Board();
        testPiece = new Rook();
    });

    hooks.afterEach(() => {
        board.reset();
    });

/**
 * Test constructor for the Piece class.
 */

QUnit.test("constructor()", assert => {
    assert.ok(testPiece instanceof Piece, 'Rook should be an instance of Piece');
    assert.strictEqual(testPiece.id, undefined, 'Piece Id should be set to undefined');
    assert.strictEqual(testPiece.rowPos, undefined, 'Piece row position should be set to undefined');
    assert.strictEqual(testPiece.colPos, undefined, 'Piece column position should be set to undefined');
    assert.strictEqual(testPiece.prevRowPos, null, 'Piece previous row position should be set to null');
    assert.strictEqual(testPiece.prevColPos, null, 'Piece previous column position should be set to null');
    assert.strictEqual(testPiece.unicodeChar, "&#9820;", 'Unicode character for piece should be set to &#9820');
    assert.strictEqual(testPiece.playerId, null, 'Piece player ID should be set to null');
    assert.strictEqual(testPiece.lastTake, null, 'Piece Last take attribute should be set to null');
});

/**
 * Test getter methods for the Piece class.
 */

QUnit.test("getters", assert => {
    let testPiece = new Rook(1, 3, 3, 0);
    assert.ok(testPiece instanceof Piece, 'Rook should be an instance of Piece');
    assert.equal(testPiece.getId(), 1, 'Piece id should return correct value');
    assert.equal(testPiece.getRowPos(), 3, 'Piece row position should return correct value');
    assert.equal(testPiece.getColPos(), 3, 'Piece column position should return correct value');
    assert.equal(testPiece.getPlayerId(), 0, 'Piece player id should return correct value');
});

/**
 * Test setter methods for the Piece class.
 */

QUnit.test("setters", assert => {

    testPiece.setId(123);
    assert.strictEqual(testPiece.getId(), 123, 'Piece ID should be set correctly');

    testPiece.setRowPos(0);
    assert.strictEqual(testPiece.getRowPos(), 0, 'Piece Row Position should be set correctly');

    testPiece.setColPos(7);
    assert.strictEqual(testPiece.getColPos(), 7, 'Piece Row Position should be set correctly');

    testPiece.setPlayerId(1);
    assert.strictEqual(testPiece.getPlayerId(), 1, 'Player Id for the piece should be set correctly');
});

/**
 * Test undo()
 */

QUnit.test("undo()", assert => {

    // Set piece position, call movePiece()
    testPiece.setRowPos(0);
    testPiece.setColPos(7);
    testPiece.movePiece(6, 7, board);

    // Store previous position for the piece 
    testPiece.prevRowPos = 0;
    testPiece.prevColPos = 7;

    // Undo the previous action
    testPiece.undo(board);

    // Assert that the piece is back at its previous position
    assert.equal(testPiece.getRowPos(), 0, 'Piece should be at previous row position');
    assert.equal(testPiece.getColPos(), 7, 'Piece should be at previous column position');

    // Assert that the board reflects the undo action
    assert.equal(board.board[0][7], testPiece, 'Piece should be back on the board');
    assert.equal(board.board[6][7], null, 'Previous position should be empty on the board');
  });


/**
 * Test movePiece()
 */

QUnit.test('movePiece', assert => {

    // Set piece position, call movePiece()
    testPiece.setRowPos(0);
    testPiece.setColPos(0);
    testPiece.movePiece(7, 0, board);

    // Assert that the new position of the piece is correct
    assert.equal(testPiece.getRowPos(), 7, 'Piece row position should be 1');
    assert.equal(testPiece.getColPos(), 0, 'Piece column position should be 1');

    // Assert that the board has been updated correctly to reflect the move
    assert.equal(board.board[0][0], null, 'Previous board position should be null');
    assert.equal(board.board[7][0], testPiece, 'New board position should contain the moved piece');
});

});
