
//Creating Messages class
export class Messages{

    static confirmReset(){
        const resetConfirmMsg = "Are you sure you wish to reset the game?";
        confirm(resetConfirmMsg);

    }

    static printPlayerTurn(playerId) {
        const playerTurnMsg = `Player ${playerId}'s Turn.`;
        alert(playerTurnMsg);
    }

    static printWinMsg(playerId)
    {
        const playerWinMsg = `Checkmate. Player ${playerId} Wins!`;
        alert(playerWinMsg);
    }
}
