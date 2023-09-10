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