let gameSeq = []; // stores the correct pattern of colors the game shows
let userSeq = [];// stores the pattern the user clicks


let btns = ["red", "yellow", "green", "blue"];// available color buttons

let started = false; // helps us know if the game has started or not
let level = 0; // keeps track of the current level

let h3 = document.querySelector("h3"); // grabs the <h3> heading to show level or game over
let highScore = localStorage.getItem("highScore") || 0; // get saved high score or 0


// For desktop/laptop
// when any key is pressed, the game will start
document.addEventListener("keypress", function () {
  if (started == 0) { // check if game hasn't started yet
    console.log("game is started!");// just logging to console
    started = true; // now game has started
  }
  levelUp();// start the first level
});

// For mobile devices
document.addEventListener("touchstart", function () {
  if (!started) {
    console.log("game is started! (touch)");
    started = true;
    levelUp();
  }
});


// this function flashes the button for the game (white flash)
function gameFlash(btn) {
  btn.classList.add("flash"); // add flash class (visually highlight it)
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250); // remove flash after 250ms
}


// this function flashes the button when user clicks (different flash)
function userFlash(btn) {
  btn.classList.add("userflash"); // add user flash class (lighten or darken it)
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250); // remove it after 250ms
}


// this function runs when you go to the next level
function levelUp() {
    userSeq =[]; // reset the user sequence so they start fresh
  level++; // increase the level count
  h3.innerText = `Level ${level}`; // show the current level

  let randmIndx = Math.floor(Math.random() * 4); // choose random number within the range of 0-3
  let randmCol = btns[randmIndx]; //choose random color from the given color.
  let randmBtn= document.querySelector(`.${randmCol}`); // get the actual button element of that color
  gameSeq.push(randmCol); // add the color to the game's sequence
  console.log(gameSeq); // log the game sequence to see what it is
//   console.log(randmIndx);
//   console.log(randmBtn);
  gameFlash(randmBtn);  // flash the random button
}


// this function checks if the user's click is correct
function checkAns(idx){

    // check if the current button the user clicked is same as game’s
     if(userSeq[idx] === gameSeq[idx]){
        // if user has completed full sequence correctly
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 250); // wait 0.25 sec then go to next level
        }
     }
     else{
        // Check and update high score
        if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore); // save it permanently
  }
        // if user clicked wrong button
        h3.innerHTML = `Game over!!! Your Score was <b>${level}</b>  <br> <span>🏆 High Score: ${highScore}</span><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red"; // flash background red for error
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 550);
        reset(); // call reset to restart everything
        showRestartButton(); // show the restart button

     }

}



// this function runs whenever the user clicks a color button
function btnPress(){
    let btn = this; // this in btnPress() refers to whichever button the user clicked.
    userFlash(btn); // flash the button for user feedback

    userColor = btn.getAttribute("id"); // get the button's color (from id)
    userSeq.push(userColor); // add the color to user's pattern

    checkAns(userSeq.length - 1); // check if user's last click was correct
}


// get all buttons and add click listeners to them

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  // Desktop click
  btn.addEventListener("click", btnPress);

  // Mobile touch
  btn.addEventListener("touchstart", function () {
    let color = btn.getAttribute("id"); // get the color like "red"
    userSeq.push(color); // store what user pressed
    userFlash(btn); // flash effect
    checkAns(userSeq.length - 1); // check the user's answer
  });
}


// let allBtns = document.querySelectorAll(".btn"); // select all 4 buttons
// for(btn of allBtns){
//     btn.addEventListener("click", btnPress); // call btnPress when user clicks any button
// }



// reset everything to start a new game
function reset(){
    started = false; // mark game as not started
    gameSeq=[]; // clear the game pattern
    userSeq=[]; // clear the user pattern
    level= 0;
}


let restartBtn = document.getElementById("restartBtn"); // get the restart button

// Show the restart button (called when game is over)
function showRestartButton() {
  restartBtn.style.display = "block";
}

// When the restart button is clicked
restartBtn.addEventListener("click", function () {
  restartBtn.style.display = "none"; // hide the button again
  reset(); // reset the game variables
  levelUp(); // start from level 1
  started = true; // mark game as started
});

