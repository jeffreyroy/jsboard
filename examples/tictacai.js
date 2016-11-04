// JavaScript for Tic Tac Toe

// var board_position = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// var board_id = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]]
var BOARDTRANS = [[6, 1, 8], [7, 5, 3], [2, 9, 4]];
var REVTRANS = [null, [0, 1], [2, 0], [1, 2], [2, 2], [1, 1], [0, 0], [1, 0], [0, 2], [2, 1]];
var nummoves = 0;

// Framework for jsboard
// create board
var myBoard = jsboard.board({attach:"game", size:"3x3"});
myBoard.cell("each").style({width:"75px", height:"75px"});

// setup pieces
var piece_x = jsboard.piece({text:"X", fontSize:"45px", textAlign:"center"});
var piece_o = jsboard.piece({text:"O", fontSize:"45px", textAlign:"center"});

// alternate turns of x and o
myBoard.cell("each").on("click", function() {
    if (myBoard.cell(this).get()==null) {
        myBoard.cell(this).place(piece_x.clone());
        console.log(checkWin());
        nummoves++;
        if (nummoves == 9) {
          window.alert("Cat's game!  Thanks for playing!");
        }
        else {
          compPlay()
        }

    }
});

// AI functions

// Helper function to pick random number
function r(n){
  return Math.floor((Math.random() * n) )
}

 // def computer_move
 //    computer_move = 0
 //    if check_win > 0
 //      computer_move = check_win
 //      @board.result = 1
 //    elsif check_block > 0
 //      computer_move = check_block
 //      block_message
 //    else
 //      move_message
 //      computer_move = computer_random_move
 //    end
 //    computer_move
 //  end

// Computer chooses a move
function compPlay() {
  // Check to see if cat's game (shouldn't see this)
  var compCell = null;
  if(nummoves >= 9) {
    window.alert("All squares occupied!");
    return false;
  }
  compCell = checkWin();
  if(compCell == null) {
    // Choose random cell
    compCell = randomMove();
  }
  else {
    window.alert("I win!");
  }
  // Make computer move
  compCell.place(piece_o.clone());
  nummoves++;
}

// Check whether the computer can win
// Returns winning cell, or null if no win
// i, j, k are board spaces in magic square notation
function checkWin() {
  var k = 0;
  var winningMove = null;
  for(var i=1; i<=9; i++) {
    for(var j=1; j<=9; j++) {
      if(checkRow(i, j, "O", "O", null)) {
        k = 15 - i - j;
        winningMove = myBoard.cell(REVTRANS[k]);
      }
    }
  }
  return winningMove;
}
// def check_win
//   winning_move = 0
//   (1..9).each do |a|
//     (1..9).each do |b|
//       if @board.check_row(a, b, 1, 1, 0)
//         winning_move = 15 - a - b
//       end
//     end
//   end
//   winning_move
// end

// Check whether cells in a straight line contain specific values
// Line indicated by two cells with magic square values a and b
// Values to check for are in va, vb, vc
// null = blank, "O" = computer, "X" = player
function checkRow(a, b, va, vb, vc) {
  // Get third cell in line
  var c = 15 - a - b;
  // Is third cell out of bounds? (Shouldn't see this)
  if(a < 1 || a > 9  || b < 1 || b > 9) {
    window.alert("Out of bounds error while checking row #{a} #{b}!");
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
    window.alert("Overflow!");
    return null;
  }
  return randCell;
}
