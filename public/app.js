let playerSymbol = "X";
let gameEnded = false

for (let i = 1; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener(
      "click", 
      function() {
              
      }
    );
  }

  if (this.innerHTML === "" && !gameEnded) {
    this.innerHTML = playerSymbol;
  }
  this.classList.add(playerSymbol.toLowerCase())

  if (playerSymbol === "X")
  playerSymbol = "O"
else
  playerSymbol = "X"
  
  for (let i = 0; i < winPos.length; i++) {
    if (
        document.getElementById(winPos[i][0]).innerHTML === playerSymbol &&
        document.getElementById(winPos[i][1]).innerHTML === playerSymbol &&
        document.getElementById(winPos[i][2]).innerHTML === playerSymbol
      ) {
      
      }
      document.getElementById(winPos[i][0]).classList.add("win");
document.getElementById(winPos[i][1]).classList.add("win");
document.getElementById(winPos[i][2]).classList.add("win"); 
gameEnded = true;

setTimeout(function() {
  alert(playerSymbol + " wins!");
}, 500);

  }
  for (let i = 1; i <= 9; i++) {
    // Whenever a player clicks on a cell
    document.getElementById(i.toString()).addEventListener(
      "click", 
      function() {
        if (this.innerHTML === "" && !gameEnded) {
          // Display either "X" or "O" in the cell, and style it
          this.innerHTML = playerSymbol;
          this.classList.add(playerSymbol.toLowerCase());
                  
          // Check if a player has won
          checkWin();
                  
          // Swap the symbol to the other one for the next turn
          if (playerSymbol === "X")
            playerSymbol = "O"
          else
            playerSymbol = "X"
        }
      }
    );
  }