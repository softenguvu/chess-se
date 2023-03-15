
//Creating Messages class
class Messages{

    static confirmReset(){
        const resetConfirmMsg = "Are you sure you wish to reset the game?";
        confirm(resetConfirmMsg);

    }
    
    static printPlayer1Turn()
    {
        const player1TurnMsg = "White's Turn."
        alert(player1TurnMsg);
    }
    
    static printPlayer2Turn()
    {
        const player2TurnMsg = "Black's Turn."
        alert(player2TurnMsg);
    }
    
    static stalemateMsg()
    {
        const stalemateMessage = "Stalemate, it's a draw!"
        alert(stalemateMessage);
    }
    
    static printWinMsg1()
    {
        const winMsg1 = "Checkmate, White wins!"
        alert(winMsg1);
    }
    
    static printWinMsg2()
    {
        const winMsg2 = "Checkmate, Black wins!"
        alert(winMsg2);
    }
    }