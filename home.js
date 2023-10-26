let displayCurrentPlayer = 'X';
let currentPlayer = "graphics/cross.jpg";
const statusUpdate = document.querySelector(".status-update");
const getCell = document.querySelector(".cell");
const getAllCells = document.querySelectorAll(".cell");
let board = [" "," "," "," "," "," "," "," "," "];
let keepRunning = true;
let weHaveAWinner = false;
let allCellsOccupied = false;
let restart = document.querySelector(".restart-button");
let restartText = document.querySelector(".restart-text");

(function(){

      statusUpdate.textContent = `Ready...`;
      getAllCells.forEach(cell => cell.addEventListener("mouseover", mouseOver));
      getAllCells.forEach(cell => cell.addEventListener("mouseout", mouseOut));
      getAllCells.forEach(cell => cell.addEventListener("click", updateCell));
      restart.addEventListener("click", restartGame);
      
})();
let popCount = 0;
function popOutAnimation(){
      popCount++;
      if (popCount === 1){
            let popTimeout = setTimeout(
                  (function(){
                        document.querySelector(".popOut-window").style.zIndex = "50";
                        document.querySelector(".popOut-window").classList.add("animation-for-popOutWindow");
                        document.querySelector(".popOut-window").style.display = "block";
                        let timeout = setTimeout(() => document.querySelector(".popOut-window").style.display = "none",1000);
                  }),3000)
      }else{
            document.querySelector(".popOut-window").classList.remove("animation-for-popOutWindow");
            document.querySelector(".popOut-window").classList.add("animation-for-popOutWindow");
            document.querySelector(".popOut-window").style.display = "block";
            let timeout = setTimeout(() => document.querySelector(".popOut-window").style.display = "none",1000);
      }
}
let rollCount = 0;
function rollingAnimation(){
      rollCount++;
      if (rollCount === 1){
            document.querySelector(".loading-screen-container").style.display = "block";
            document.querySelector(".rolling-pic").classList.add("rollAnimation");
            setInterval(()=>document.querySelector(".loading-screen-text").textContent = "Loading...",1000);
            setInterval(()=>document.querySelector(".loading-screen-text").textContent = "Loading.",1500);
            let loadingTimeout = setTimeout(() => document.querySelector(".loading-screen-container").style.display ='none',3000);
      }else{
            return;
      }
}
function restartGame(){
      rollingAnimation();
      popOutAnimation();
      restartText.textContent = 'Restart';
      displayCurrentPlayer = 'X';
      currentPlayer = "graphics/cross.jpg";
      for (let i=0; i<9; i++){
            board[i]=" ";
      }
      keepRunning = true;
      weHaveAWinner = false;
      allCellsOccupied = false;
      getAllCells.forEach(cell => cell.style.backgroundImage = 'none');
      statusUpdate.textContent = displayCurrentPlayer + "'s turn!";
      statusUpdate.style.color = 'white';
}
function mouseOver(){
      const cellIndex = this.getAttribute("cell-index");
      if (board[cellIndex-1] === " "){
            document.querySelector('[cell-index="'+cellIndex+'"]').classList.add("animateCell");
            document.querySelector('[cell-index="'+cellIndex+'"]').style.backgroundImage = 'url("'+currentPlayer+'")';
            document.querySelector('[cell-index="'+cellIndex+'"]').style.backgroundSize = 'contain';
            // document.querySelector('[cell-index="'+cellIndex+'"]').style.opacity = '0.5';
      }
}
function mouseOut(){
      const cellIndex = this.getAttribute("cell-index");
      if (board[cellIndex-1] === " "){
            document.querySelector('[cell-index="'+cellIndex+'"]').style.backgroundImage = 'none';
      }
}
function updateCell(){
      // console.log(this.getAttribute("cell-index"));
      if (keepRunning == false || weHaveAWinner == true){
            return;
      }
      
      const cellIndex = this.getAttribute("cell-index");
      if (board[cellIndex-1] === " "){
            document.querySelector('[cell-index="'+cellIndex+'"]').classList.remove("animateCell");
            document.querySelector('[cell-index="'+cellIndex+'"]').style.backgroundImage = 'url("'+currentPlayer+'")';
            document.querySelector('[cell-index="'+cellIndex+'"]').style.backgroundSize = 'contain';
            document.querySelector('[cell-index="'+cellIndex+'"]').style.opacity = '1';

            board[cellIndex-1] = displayCurrentPlayer;
      
            // console.log(board);
            checkWinner();
            if (weHaveAWinner == true){
                  return;
            }
            checkBoard();
            if (weHaveAWinner == false && allCellsOccupied == true){
                  statusUpdate.textContent = `It's a DRAW!`;
                  statusUpdate.style.color = 'orange';
                  return;
            }
            changePlayer();
      }else{
            statusUpdate.textContent = `Invalid position!`;
      }
}
function changePlayer(){
      currentPlayer =  (currentPlayer === "graphics/cross.jpg") ? currentPlayer = "graphics/circle.jpg" : currentPlayer = "graphics/cross.jpg";
      displayCurrentPlayer = (displayCurrentPlayer === 'X') ? displayCurrentPlayer = "O" : displayCurrentPlayer = "X";
      statusUpdate.textContent = displayCurrentPlayer + "'s turn!";
}
function checkWinner(){
      let winConditions = 
      [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
      ];
      let counter = 0;
      for (let i=0; i<8; i++){
            for (let j=0; j<3; j++){
                  if (board[winConditions[i][j]-1] === displayCurrentPlayer){
                        counter++;
                  }
            }
            if (counter === 3){
                  statusUpdate.textContent = `${displayCurrentPlayer} won!`;
                  statusUpdate.style.color = 'yellow';
                  keepRunning = false;
                  weHaveAWinner = true;
                  // console.log("We have a winner!");
            }
            counter = 0;
      }
}
function checkBoard(){
      let counter = 0;
      for (let i=0; i<9; i++){
            if (board[i] === " "){
                  counter++;
                  return;
            }
      }
      if (counter === 0){
            allCellsOccupied = true;
            keepRunning = false;
      }
}
