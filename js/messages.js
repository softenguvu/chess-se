//Make it static class 
//instead 
// Message.stalemateMessage

class Messages{

    constructor() {

        if (this instanceof Messages){
            throw Error ("This class can't be instantiated.");
        }
    }

static confirmReset(){
    const resetConfirmMsg = "Are you sure you wish to reset the game?";
    confirm(resetConfirmMsg);
}

static printPlayerTurn(){
    var playerTurnMsg = "Player's turn.";
    alert(playerTurnMsg);
}


static stalemateMsg(){
    var stalemateMessage = "Stalemate, it's a draw!";
    alert(resetconfirmMsg);
}

static printWinMsg(){
    var winMsg = "Checkmate, Player wins!"; 
    return playerTurnMsg;
}
}