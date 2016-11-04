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
        console.log(checkRow([0, 0], [0, 1], "X", "X", "X"));
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

// Computer chooses a move
function compPlay() {
  // Check to see if cat's game (shouldn't see this)
  var compCell = null;
  if(nummoves >= 9) {
    window.alert("All squares occupied!");
    return false;
  }
  // Choose random cell
  compCell = randomMove();
  // Make computer move
  compCell.place(piece_o.clone());
  nummoves++;
}
  // # Check to see whether a row contains specific values
  // # Row indicated by two squares, a and b
  // # Values to check for are in va, vb, vc
  // # 0 = blank, 1 = computer, 2 = player
  // def check_row(a, b, va, vb, vc)
  //   c = 15 - a - b
  //   # Squares are out of bounds (should not ever happen)
  //   if a < 1 || a > 9  || b < 1 || b > 9
  //     puts "Out of bounds error while checking row #{a} #{b}!"
  //     return false
  //   # Third space is not legal
  //   elsif c < 1 || c > 9 || c == a || c == b || a == b
  //     return false
  //   # Check whether third space has the value we're looking
  //   elsif @board_array[a] == va && @board_array[b] == vb && @board_array[c] == vc
  //     return true
  //   else
  //     return false
  //   end
  // end

function checkRow(aCoord, bCoord, va, vb, vc) {
  var a = BOARDTRANS[aCoord[0]][aCoord[1]];
  var b = BOARDTRANS[bCoord[0]][bCoord[1]];
  var c = 15 - a - b;
  // Is cell out of bounds? (Shouldn't see this)
  if(a < 1 || a > 9  || b < 1 || b > 9) {
    window.alert("Out of bounds error while checking row #{a} #{b}!");
    return false;
  }
  // Is square legal?
  if (c < 1 || c > 9 || c == a || c == b || a == b) {
    return false;
  }
  aVal = myBoard.cell(REVTRANS[a]).get();
  bVal = myBoard.cell(REVTRANS[b]).get();
  cVal = myBoard.cell(REVTRANS[c]).get();
  // Check whether third space has the value we're looking for
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
