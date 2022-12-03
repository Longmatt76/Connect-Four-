/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;



let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// this enable/disables the visability of current player indicator in html


function starSwap() {
const starOne = document.getElementById("starOne");
const starTwo = document.getElementById("starTwo");
if(currPlayer === 1){
  starOne.innerHTML = "", starTwo.innerHTML = "&#11088;"
}
if(currPlayer === 2){
  starTwo.innerHTML = ""; starOne.innerHTML = "&#11088;"
}
};

 

// This function creates an array matrix using the values of width and height 
// by looping through the HEIGHT to create new arrays and setting the length of the arrays equal to the WIDTH  
function makeBoard() {
   for (let i = 0; i < HEIGHT; i++){
    board[i] = new Array(WIDTH);
   }
   }
   

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  
  const htmlBoard = document.querySelector('#board');
  // lines 33-42 build the top row of the html table and set a click listener event that enables the dropping of playing pieces
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // lines 45-52 loop through HEIGHT/WIDTH to create the rows of the html table and then append them to the htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]){
       return y;
    }
  }
    return null; 
}


console.log(currPlayer);
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
 const playerOnepiece = document.createElement('div');
 const playerTwoPiece = document.createElement('div');
 const spot = document.getElementById(`${y}-${x}`);
 playerOnepiece.classList.add("piece","playerOne");
 playerTwoPiece.classList.add("piece","playerTwo");
//  this doesnt work I was attemping to adjust my drop piece
//   animation +50px each click so the drop point doesnt get higher each time
//  playerOnepiece.style.translateY = +50;
//  playerTwoPiece.style.translateY = +50;
 
 if(currPlayer === 1){
  spot.append(playerOnepiece);
 }else{
  spot.append(playerTwoPiece);
 }
 
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x]= currPlayer;
  placeInTable(y, x);

  starSwap();

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie\ this doesnt work it's returning "tie" after any column fills to the top instead of all columns 
//  if(board.every(function(row){
//   row.every(function(cell){
//     cell !== null
//     { return endGame("It's a tie!")}
//   })
 
//  }));
 


  // switch players
  if (currPlayer = currPlayer === 1){
    currPlayer = 2;
  }else {
    currPlayer = 1;
  };

 

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  
      //  this code loops through the board looking for all possible win combinations and returns true if found
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}




makeBoard();
makeHtmlBoard();
