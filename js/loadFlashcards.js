function loadFlashcards() {
  console.log("LOADFLASHCARDS RAN")
  const wordPairs = JSON.parse(localStorage.getItem('wordPairs') || '{}');
  // wordPairsArray initially loaded, order cannot be guaranteed
  wordPairsArray = Object.entries(wordPairs);
  roundCompleted = false;


  const deleteButton = document.querySelector('.delete-button');
  // disabled upon loading flashcards if round is not completed, and if there are words in local storage
  // if round is not completed, but no words, then it is not disabled
  deleteButton.disabled = !(roundCompleted && wordPairsArray.length > 0);

  const submitButton = document.querySelector('.submit-button');
  submitButton.disabled = wordPairsArray.length > 0; // disabled if there are words in local storage




  if (wordPairsArray.length >= 3) {
    shuffleWordPairs();
    currentWordIndex = 0;
    showNextWord();
  } else {
    document.getElementById('flashcard').innerHTML = 'Please add at least 3 words';
    document.getElementById('nextButton').style.display = 'none';
  }
  isPageLoaded = false;
}
