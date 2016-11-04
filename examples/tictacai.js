// JavaScript for Tic Tac Toe

// var board_position = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// var board_id = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]]
var BOARDTRANS = [[6, 1, 8], [7, 5, 3], [2, 9, 4]];
var REVTRANS = [null, [0, 1], [2, 0], [1, 2], [2, 2], [1, 1], [0, 0], [1, 0], [0, 2], [2, 1]];
var nummoves = 0;
var gameOver = false;

// Framework for jsboard
// create board
var myBoard = jsboard.board({attach:"game", size:"3x3"});
myBoard.cell("each").style({width:"75px", height:"75px"});

// setup pieces
var piece_x = jsboard.piece({text:"X", fontSize:"45px", textAlign:"center"});
var piece_o = jsboard.piece({text:"O", fontSize:"45px", textAlign:"center"});

function showBlurb(text) {
  document.getElementById("blurb").innerHTML = text;
}

// Get player's move
myBoard.cell("each").on("click", function() {
    // Check whether cell is occupied
    if (myBoard.cell(this).get()==null) {
        // Make player move
        myBoard.cell(this).place(piece_x.clone());
        // Increment move counter
        nummoves++;
        // Check whether player has won
        if (playerWon()) {
          showBlurb("You win!");
          gameOver = true;
        }
        // Check whether board is full
        else if (nummoves == 9) {
          showBlurb("Cat's game!  Thanks for playing!");
          gameOver = true;
        }
        // Otherwise, make a move for the computer
        else {
          compTurn()
        }

    }
});

// AI functions

// Helper function to pick random number
function r(n){
  return Math.floor((Math.random() * n) )
}

// Computer's turn
function compTurn() {
  // Check to see if cat's game (shouldn't see this)
  if(gameOver) {
    showBlurb("I can't move because the game is over!");
    return false;
  }
  // Make a move
  compMove().place(piece_o.clone());
  // Increment move counter
  nummoves++;
}

// CompMove
// Return intelligent move for the computer
function compMove() {
  var compCell = null;
  var centerCell = myBoard.cell([1, 1]);
  // Check for winning move
  compCell = checkWin();
  if(compCell != null) {
    showBlurb("I win!");
    gameOver = true;
    return compCell;
  }
  // Check for blocking move
  compCell = checkBlock();
  if(compCell != null) {
    showBlurb("I see what you're trying to do!");
    return compCell;
  }
  // Try to move in the middle
  if(centerCell.get() == null) {
    return centerCell;
  }
  // Make a random move
  return randomMove();
}

// Check whether the player has won
function playerWon() {
  return checkMove("X", "X");
}

// Check whether the computer can win
function checkWin() {
  return checkMove("O", null);
}

// Check whether the computer can block a player win
function checkBlock() {
  return checkMove("X", null);
}

// Checks all straight lines on board to try to find a formation
// Line must contain two cells with firstValue and one with secondValue
// i, j, k are board spaces in magic square notation
// checkMove returns cell with secondValue if formation is found
// otherwise returns null
function checkMove(firstValue, secondValue) {
  var k = 0;
  var foundMove = null;
  // Loop through every straight line on the board
  for(var i=1; i<=9; i++) {
    for(var j=1; j<=9; j++) {
      // Check for winning move in this line
      if(checkRow(i, j, firstValue, firstValue, secondValue)) {
        k = 15 - i - j;
        foundMove = myBoard.cell(REVTRANS[k]);
      }
    }
  }
  return foundMove;
}

// Check whether cells in a straight line contain specific values
// Line indicated by two cells with magic square values a and b
// Values to check for are in va, vb, vc
// null = blank, "O" = computer, "X" = player
function checkRow(a, b, va, vb, vc) {
  // Get third cell in line
  var c = 15 - a - b;
  // Is third cell out of bounds? (Shouldn't see this)
  if(a < 1 || a > 9  || b < 1 || b > 9) {
    showBlurb("Out of bounds error while checking row #{a} #{b}!");
    return false;
  }
  // Is third cell legal?
  if (c < 1 || c > 9 || c == a || c == b || a == b) {
    return false;
  }
  // Get current values in cells
  aVal = myBoard.cell(REVTRANS[a]).get();
  bVal = myBoard.cell(REVTRANS[b]).get();
  cVal = myBoard.cell(REVTRANS[c]).get();
  // Check whether cells have the values we're looking for
  if(aVal == va && bVal == vb && cVal == vc) {
    return true;
  }
  else {
    return false;
  }
}

// Computer picks a random move
function randomMove() {
  var randCell = null;
  if(nummoves >= 9) {
    return null;
  }
  // Pick a random move
  var cx=r(3), cy=r(3);
  var n = 0;
  randCell = myBoard.cell([cx,cy]);
  while (randCell.get()!=null && n<1000) {
    cx = r(3);
    cy = r(3);
    randCell = myBoard.cell([cx,cy]);
    n++;
  }
  if(n>999) {
    showBlurb("Overflow!");
    return null;
  }
  return randCell;
}
