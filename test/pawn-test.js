import { Pawn } from "../js/pawn.js"
import { Board } from "../js/board.js"

// Create the pawn piece and the board object
var testingPawn = new Pawn(1, 0, 0, 0); // The piece ID doesn't matter, and the row/col positions as well as playerID will change based on test
var testingBoard = new Board();

QUnit.module("pawn", function() {
    QUnit.hooks.beforeEach(function() {
        console.log("In here, there should be 7 of me!");
        testingBoard.reset();
        testingPawn = new Pawn(1, 0, 0, 0);
    })

    QUnit.test("possibleMoves() after never having moved", function(assert) {
        var movesReturn = testingPawn.possibleMoves(testingBoard.board); // This is the piece as white
        assert.equal(movesReturn[0][0] == 2 && movesReturn[0][1] == 0, true, 'White piece at 0, 0, two spots ahead');
        assert.equal(movesReturn[1][0] == 1 && movesReturn[1][1] == 0, true, 'White piece at 0, 0, one spot ahead');

        testingPawn = new Pawn(1, 7, 7, 1); // Now try the piece as black
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[0][0] == 5 && movesReturn[0][1] == 7, true, 'Black piece at 7, 7, two spots ahead');
        assert.equal(movesReturn[1][0] == 6 && movesReturn[1][1] == 7, true, 'Black piece at 7, 7, one spot ahead');
    });

    QUnit.test("possibleMoves() after being moved once", function(assert) {
        testingPawn.moved = true; // Make it so the pawn has been moved
        var movesReturn = testingPawn.possibleMoves(testingBoard.board); // This is the piece as white
        assert.equal(movesReturn.length == 1, true, 'There should only be 1 possible move, since its been "moved"');
        assert.equal(movesReturn[0][0] == 1 && movesReturn[0][1] == 0, true, 'White piece at 0, 0, one spot ahead');

        testingPawn = new Pawn(1, 7, 7, 1); // Now try the piece as black
        testingPawn.moved = true; // Make it so the pawn has been moved
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 1, true, 'There should only be 1 possible move, since its been "moved"');
        assert.equal(movesReturn[0][0] == 6 && movesReturn[0][1] == 7, true, 'Black piece at 7, 7, one spot ahead');
    });

    QUnit.test("possibleMoves() if there is a piece to the front right", function(assert) {
        assert.equal()
    });

    QUnit.test("possibleMoves() if there is a piece to the front left", function(assert) {
        assert.equal()
    });

    QUnit.test("possibleMoves() if there is a piece blocking forward movement", function(assert) {
        assert.equal()
    });

    QUnit.test("possibleMoves() if there is a piece blocking forward movement, but there is a piece that is attackable", function(assert) {
        assert.equal()
    });
});