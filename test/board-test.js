import { Board } from  "../js/board.js";

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
});
