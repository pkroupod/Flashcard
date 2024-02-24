var currentWordIndex = 0;
var wordPairsArray = [];
var roundCompleted = false;

var isPageLoaded = true; // New flag for page load
var isNewWordsSubmitted = false; // New flag for new word submission

var correctAnswersCount = 0;



document.addEventListener('DOMContentLoaded', function () {
  toggleMode(); // loads night or day mode depending on the browser
  loadFlashcards();



  document.getElementById('dayButton').addEventListener('click', function() {
    toggleMode('day');
  });

  document.getElementById('nightButton').addEventListener('click', function() {
    toggleMode('night');
  });




  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      const activeElement = document.activeElement;
      const userInput = document.getElementById('userInput');
      const nextButton = document.getElementById('nextButton');
      const checkButton = document.getElementById('check-button-id');

      if (activeElement === userInput && checkButton) {
        // If user is focused on the input field, trigger the Check button
        event.preventDefault();
        checkButton.click();
      } else if (nextButton && !nextButton.disabled && nextButton.innerText !== 'Restart') {
        // Otherwise, if the Next button is enabled, trigger the Next button
        nextButton.click();
      }
    }
  });

});


// for changing to dark or day mode automatically based on the browser settings
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  toggleMode(event.matches ? 'night' : 'day');
});


document.getElementById('nextButton').addEventListener('click', function() {
  console.log("nextbutton clicked")
  if (roundCompleted) {
    console.log("nextbutton clicked - roundcompleted")
    shuffleWordPairs();
    roundCompleted = false;


    // starting a new round, disable
    const deleteButton = document.querySelector('.delete-button');
    deleteButton.disabled = true;
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;

    const manageWordsButton = document.querySelector('.manage-words-button');
    manageWordsButton.disabled = true;
    manageWordsButton.classList.add('manage-words-button-disabled');


    this.innerText = 'Next';
    currentWordIndex = 0;
    showNextWord();
  } else {
    console.log("nextbutton clicked - round not completed")
    currentWordIndex++
    showNextWord()
  }
});
