import { Board } from "./board.js";

// Create an instance of the board class
const board = new Board()

// Add 'click' event-listener to the 'New Game' button.
const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", () =>
    console.log(
        "New Game button: Click Event Triggered"
    )
);

// Add 'click' event-listener to the 'Undo' button.
const undoButton = document.getElementById("undo-move");
undoButton.addEventListener("click", () => {
        if (board.lastPieceMoved !== null) {
            board.lastPieceMoved.undo(board);
            board.renderPieces();
        }
    }
);
