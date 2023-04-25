import { Pawn } from "../js/pawn.js"
import { Board } from "../js/board.js"

// Create the pawn piece and the board object
var testingPawn = new Pawn(1, 0, 0, 0); // The piece ID doesn't matter, and the row/col positions as well as playerID will change based on test
var testingBoard = new Board();

QUnit.module("pawn", function() {
    QUnit.hooks.beforeEach(function() {
        testingBoard.reset();
        testingPawn = new Pawn(1, 0, 0, 0);
    })

    QUnit.test("possibleMoves() after never having moved", function(assert) {
        var movesReturn = testingPawn.possibleMoves(testingBoard.board); // This is the piece as white
        assert.equal(movesReturn[0][0] == 2 && movesReturn[0][1] == 0, true, 'White piece at [0, 0], two spots ahead');
        assert.equal(movesReturn[1][0] == 1 && movesReturn[1][1] == 0, true, 'White piece at [0, 0], one spot ahead');

        testingPawn = new Pawn(1, 7, 7, 1); // Now try the piece as black
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[0][0] == 5 && movesReturn[0][1] == 7, true, 'Black piece at [7, 7], two spots ahead');
        assert.equal(movesReturn[1][0] == 6 && movesReturn[1][1] == 7, true, 'Black piece at [7, 7], one spot ahead');
    });

    QUnit.test("possibleMoves() after being moved once", function(assert) {
        testingPawn.moved = true; // Make it so the pawn has been moved
        var movesReturn = testingPawn.possibleMoves(testingBoard.board); // This is the piece as white
        assert.equal(movesReturn.length == 1, true, 'There should only be 1 possible move, since its been "moved"');
        assert.equal(movesReturn[0][0] == 1 && movesReturn[0][1] == 0, true, 'White piece at [0, 0], one spot ahead');

        testingPawn = new Pawn(1, 7, 7, 1); // Now try the piece as black
        testingPawn.moved = true; // Make it so the pawn has been moved
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 1, true, 'There should only be 1 possible move, since its been "moved"');
        assert.equal(movesReturn[0][0] == 6 && movesReturn[0][1] == 7, true, 'Black piece at [7, 7], one spot ahead');
    });

    QUnit.test("possibleMoves() if there is a piece on one side", function(assert) {
        var testingEnemy = new Pawn(2, 1, 1, 1); // Create a enemy pawn to current testing pawn
        var testingFriend = new Pawn(3, 1, 1, 0); // Create a friendly pawn to current testing pawn
        
        testingBoard.board[1][1] = testingEnemy; // Place enemy on board
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 1 && movesReturn[2][1] == 1, true, 'Enemy piece at [1, 1], which is diagonal to test piece');
        
        testingBoard.board[1][1] = testingFriend; // Replace enemy with friend
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 2, true, 'There should only be two possible moves, since a friend is now occupying the diagonal space');

        testingPawn = new Pawn(1, 7, 7, 1); // Now try as a black piece
        testingEnemy = new Pawn(3, 6, 6, 0); // Recreate enemy and friend to match team switch of testing
        testingFriend = new Pawn(2, 6, 6, 1);
        
        testingBoard.board[6][6] = testingEnemy;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 6 && movesReturn[2][1] == 6, true, 'Enemy piece at [6, 6], which is diagonal to test piece');
        
        testingBoard.board[6][6] = testingFriend;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 2, true, 'There should only be two possible moves, since a friend is now occupying the diagonal space');
    });

    QUnit.test("possibleMoves() if there is a piece on other side", function(assert) {
        testingPawn = new Pawn(1, 0, 2, 0); // Need to move the pawn so we can test the other side
        var testingEnemy = new Pawn(2, 1, 1, 1); // Create a enemy pawn to current testing pawn
        var testingFriend = new Pawn(3, 1, 1, 0); // Create a friendly pawn to current testing pawn
        
        testingBoard.board[1][1] = testingEnemy; // Place enemy on board
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 1 && movesReturn[2][1] == 1, true, 'Enemy piece at [1, 1], which is diagonal to test piece');
        
        testingBoard.board[1][1] = testingFriend; // Replace enemy with friend
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 2, true, 'There should only be two possible moves, since a friend is now occupying the diagonal space');

        testingPawn = new Pawn(1, 7, 5, 1); // Now try as a black piece
        testingEnemy = new Pawn(3, 6, 6, 0); // Recreate enemy and friend to match team switch of testing
        testingFriend = new Pawn(2, 6, 6, 1);
        testingBoard.board[6][6] = testingEnemy;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 6 && movesReturn[2][1] == 6, true, 'Enemy piece at [6, 6], which is diagonal to test piece');
        
        testingBoard.board[6][6] = testingFriend;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 2, true, 'There should only be two possible moves, since a friend is now occupying the diagonal space');
    });

    QUnit.test("possibleMoves() if there is a piece on both sides at once", function(assert) {
        testingPawn = new Pawn(1, 0, 2, 0); // Need to move the pawn so we can test the other side
        var testingEnemy1 = new Pawn(2, 1, 1, 1); // Create a enemy pawn to current testing pawn
        var testingEnemy2 = new Pawn(4, 1, 3, 1); // Create a enemy pawn to current testing pawn
        var testingFriend1 = new Pawn(3, 1, 1, 0); // Create a friendly pawn to current testing pawn
        var testingFriend2 = new Pawn(5, 1, 3, 0); // Create a friendly pawn to current testing pawn

        // Place enemies on board
        testingBoard.board[1][1] = testingEnemy1; 
        testingBoard.board[1][3] = testingEnemy2;
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 1 && movesReturn[2][1] == 3 && movesReturn[3][0] == 1 && movesReturn[3][1] == 1, true, 'Enemy pieces on both diagonal');
        
        // Replace one enemy with friend
        testingBoard.board[1][1] = testingFriend1; 
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 1 && movesReturn[2][1] == 3 && movesReturn.length == 3, true, 'Enemy pieces on one diagonal with a friend on the other');
        
        // Replace enemy with friend, and friend with enemy so the previous test has switched results
        testingBoard.board[1][3] = testingFriend2; 
        testingBoard.board[1][1] = testingEnemy1;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 1 && movesReturn[2][1] == 1 && movesReturn.length == 3, true, 'Enemy pieces on one diagonal with a friend on the other, but swapped from previous test');

        // Replace both enemies with friends
        testingBoard.board[1][1] = testingFriend1; 
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 2, true, 'Friends occupy both diagonals');

        // Now try as a black piece
        testingPawn = new Pawn(1, 7, 5, 1); 
        var testingEnemy1 = new Pawn(2, 6, 6, 0); // Create a enemy pawn to current testing pawn
        var testingEnemy2 = new Pawn(4, 6, 4, 0); // Create a enemy pawn to current testing pawn
        var testingFriend1 = new Pawn(3, 6, 6, 1); // Create a friendly pawn to current testing pawn
        var testingFriend2 = new Pawn(5, 6, 4, 1); // Create a friendly pawn to current testing pawn
        
        // Place enemies on board
        testingBoard.board[6][6] = testingEnemy1;
        testingBoard.board[6][4] = testingEnemy2;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 6 && movesReturn[2][1] == 4 && movesReturn[3][0] == 6 && movesReturn[3][1] == 6, true, 'Enemy pieces on both diagonals');
        
        // Now replace one enemy with a friend
        testingBoard.board[6][6] = testingFriend1;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 6 && movesReturn[2][1] == 4 && movesReturn.length == 3, true, 'Enemy piece on one diagonal with a friend on the other');

        // Now replace the enemy with a friend, and the friend with an enemy to try the other possible case
        testingBoard.board[6][6] = testingEnemy1;
        testingBoard.board[6][4] = testingFriend2;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[2][0] == 6 && movesReturn[2][1] == 6 && movesReturn.length == 3, true, 'Enemy piece on one diagonal with a friend on the other, inverse from previous case');

        // Now put a friend on each diagonal
        testingBoard.board[6][6] = testingFriend1;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 2, true, 'Friends occupy both diagonals'); 
    })

    QUnit.test("possibleMoves() if there is a piece blocking forward movement", function(assert) {
        // Create more testing pieces
        var testingEnemy = new Pawn(2, 1, 0, 1);
        var testingFriend = new Pawn(3, 1, 0, 0);

        // Place enemy piece directly in front
        testingBoard.board[1][0] = testingEnemy;
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 0, true, 'Enemy piece directly in front of pawn');

        // Place friend piece directly in front
        testingBoard.board[1][0] = testingFriend;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 0, true, 'Friendly piece directly in front of pawn');

        // Remove preivous piece
        testingBoard.board[1][0] = undefined;

        // Create testing pieces two squares in front
        var testingEnemy = new Pawn(2, 2, 0, 1)
        var testingFriend = new Pawn(3, 2, 0, 0);

        // Place enemy piece directly in front
        testingBoard.board[2][0] = testingEnemy;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 1, true, 'Enemy piece one space in front of pawn');

        // Place friend piece directly in front
        testingBoard.board[2][0] = testingFriend;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 1, true, 'Friendly piece one space in front of pawn');

        // Now try as a black piece
        testingPawn = new Pawn(1, 7, 7, 1)
        // Create more testing pieces
        var testingEnemy = new Pawn(2, 6, 7, 0);
        var testingFriend = new Pawn(3, 6, 7, 1);

        // Place enemy piece directly in front
        testingBoard.board[6][7] = testingEnemy;
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 0, true, 'Enemy piece directly in front of pawn');

        // Place friend piece directly in front
        testingBoard.board[6][7] = testingFriend;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 0, true, 'Friendly piece directly in front of pawn');

        // Remove preivous piece
        testingBoard.board[6][7] = undefined;

        // Create testing pieces two squares in front
        var testingEnemy = new Pawn(2, 5, 7, 0)
        var testingFriend = new Pawn(3, 5, 7, 1);

        // Place enemy piece directly in front
        testingBoard.board[5][7] = testingEnemy;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 1, true, 'Enemy piece one space in front of pawn');

        // Place friend piece directly in front
        testingBoard.board[5][7] = testingFriend;
        movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn.length == 1, true, 'Friendly piece one space in front of pawn');
    });

    QUnit.test("possibleMoves() if there is a piece blocking forward movement, but there is a piece that is attackable", function(assert) {
        // In this test, I only test one possible outcome for each color since the other tests will catch any failure that would pop up if there was one
        // So the other tests minimize the tests needed here
        
        // Create more testing pieces
        var testingEnemy = new Pawn(2, 1, 1, 1);
        var testingFriend = new Pawn(3, 1, 0, 0);

        // Place enemy piece directly in front
        testingBoard.board[1][0] = testingFriend;
        testingBoard.board[1][1] = testingEnemy;
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[0][0] == 1 && movesReturn[0][1] == 1 && movesReturn.length == 1, true, 'Friend blocking move, but attackable piece');

        // Now try as a black piece
        testingPawn = new Pawn(1, 7, 7, 1)
        // Create more testing pieces
        var testingEnemy = new Pawn(2, 6, 6, 0);
        var testingFriend = new Pawn(3, 6, 7, 1);

        // Place enemy piece directly in front
        testingBoard.board[6][7] = testingFriend;
        testingBoard.board[6][6] = testingEnemy;
        var movesReturn = testingPawn.possibleMoves(testingBoard.board);
        assert.equal(movesReturn[0][0] == 6 && movesReturn[0][1] == 6 && movesReturn.length == 1, true, 'Friend blocking move, but attackable piece');
    });
});