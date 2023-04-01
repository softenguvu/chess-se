// Add 'click' event-listener to the 'New Game' button.
const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", () =>
    console.log(
        "New Game button: Click Event Triggered"
    )
);

// Add 'click' event-listener to the 'Undo' button.
const undoButton = document.getElementById("undo-move");
undoButton.addEventListener("click", () =>
    this.board.lastPieceMoved.undo(this.board)
);
