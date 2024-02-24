var currentWordIndex = 0;
var wordPairsArray = [];
var roundCompleted = false;

var isPageLoaded = true; // New flag for page load
var isNewWordsSubmitted = false; // New flag for new word submission

var correctAnswersCount = 0;



document.addEventListener('DOMContentLoaded', function () {
  loadFlashcards();
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
