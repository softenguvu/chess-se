export class Messages{

/**
 * Displays messages on the screen
 */

    static confirmReset(){
        const resetConfirmMsg = "Are you sure you wish to reset the game?";
        return confirm(resetConfirmMsg);
    }

    static getPlayerColor(playerId) {
        return (playerId === 0) ? 'Red' : 'Black';
    }

    static printPlayerTurn(playerId) {
        const playerTurnMsg = `${Messages.getPlayerColor(playerId)}'s Turn.`;
        alert(playerTurnMsg);
    }

    static printWinMsg(playerId)
    {
        const playerWinMsg = `Checkmate. ${Messages.getPlayerColor(playerId)} Wins!`;
        alert(playerWinMsg);
    }
}