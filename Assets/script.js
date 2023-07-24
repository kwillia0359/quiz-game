// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

// variable definitions
var quizQuestion = document.querySelector("quiz-question");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerCountdown = document.querySelector(".timer-countdown");
var startButton = document.querySelector(".start-button");

var UserAnswer = "";
var availAnswers = false;
var correctAnswer = true;
var timer; 
var timerCount;
var ifsuccess = false;

// Arrays used to create answer answer options for the user
var correctAnswer = [];
var answerOptions = [];




// The init function is called when the page loads 
function init() {
  correct();
  failed();
}

// The startGame function is called when the start button is clicked
function startGame() {
ifsuccess = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderBlanks()
  startTimer()
}

// The winGame function is called when the win condition is met
function youPassed() {
  wordBlank.textContent = "congradulations!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function youFailed() {
  wordBlank.textContent = "Please try again!";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (ifsuccess && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Creates blanks on screen
function renderBlanks() {
  // Randomly picks word from words array
  UserAnswer = words[Math.floor(Math.random() * words.length)];
  correctAnswer = UserAnswer.split("");
  availAnswers = correctAnswer.length;
  answerOptions = []
  // Uses loop to push blanks to blankLetters array
  for (var i = 0; i < availAnswers; i++) {
   answerOptions.push("_");
  }
  // Converts blankLetters array into a string and renders it on the screen
  wordBlank.textContent = answerOptions.join(" ")
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (UserAnswer === answerOptions.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}



// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
 
})

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);