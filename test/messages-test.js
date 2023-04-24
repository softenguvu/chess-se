import { Messages } from "../js/messages.js"; 

//Add test suite for Messages
QUnit.module("Messages", function() {

//Test confirmReset() game message:
QUnit.test("confirmReset() Test", function(assert) {
    const expectedResetConfirmMsg = "Are you sure you wish to reset the game?";
    let confirmCalled = false;
    window.confirm = function(message) {
      assert.strictEqual(message, expectedResetConfirmMsg, "confirm() function should be called with correct message");
      confirmCalled = true;
    };
    Messages.confirmReset();
    assert.ok(confirmCalled, "confirm() function should be called");
  });

// Test the method to print out message for who's turn it is
QUnit.test('printPlayerTurn() should show correct player turn message', function(assert) {
    const playerId = 0;
    const expectedMsg = `Red's Turn.`;
    let alertCalled = false;
    window.alert = function(msg) {
        assert.strictEqual(msg, expectedMsg, 'Player turn message should display correctly');
        alertCalled = true;
    };
    Messages.printPlayerTurn(playerId);
    assert.ok(alertCalled, 'alert() function should be called');
});


// Test the method to print out the winning message
QUnit.test('printWinMsg() should show correct message when player wins', function(assert) {
    const playerId = 1;
    const expectedMsg = `Checkmate. Black Wins!`;
    let alertCalled = false;
    window.alert = function(msg) {
        assert.strictEqual(msg, expectedMsg, 'Player win message should be displayed correctly');
        alertCalled = true;
    };
    Messages.printWinMsg(playerId);
    assert.ok(alertCalled, 'alert() function should be called');
});
});