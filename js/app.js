var currentWordIndex = 0;
var wordPairsArray = [];
var roundCompleted = false;

var isPageLoaded = true; // New flag for page load
var isNewWordsSubmitted = false; // New flag for new word submission

var correctAnswersCount = 0;

document.addEventListener('DOMContentLoaded', function () {
  loadFlashcards();
});

function toggleManageWords() {
  var manageContainer = document.getElementById('manageContainer');
  manageContainer.style.display = manageContainer.style.display === 'flex' ? 'none' : 'flex';
}

function submitWords() {
  const textarea = document.querySelector('textarea');
  const text = textarea.value;
  const lines = text.split('\n');
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>0-9]/;

  // Get existing words from local storage
  const existingWordPairs = JSON.parse(localStorage.getItem('wordPairs') || '{}');

  if (!text.trim() && Object.keys(existingWordPairs).length === 0) {
    alert("Please add at least 3 words");
    return;
  }

  if (!text.trim() && Object.keys(existingWordPairs).length > 0) {
    alert("Please add more words");
    return;
  }

  let newWordsAdded = false;
  let allWordsExist = true;

  for (const line of lines) {
    if (line.trim() === '') continue;

    const outsideParentheses = line.replace(/\(.*?\)/g, '').trim();
    if (specialCharRegex.test(outsideParentheses)) {
      alert("Unable to add words, check formatting for special characters or numbers.");
      return;
    }

    const parts = line.split(/\(|\)/).map(part => part.trim());
    if (parts.length !== 3 || parts[1] === "" || parts[2] !== "") {
      alert("Unable to add words, check formatting for missing or incorrect parentheses.");
      return;
    }

    const spanish = parts[0];
    const english = parts[1];

    // Append new words and skip duplicates
    if (!existingWordPairs.hasOwnProperty(english)) {
      existingWordPairs[english] = spanish;
      newWordsAdded = true;
      allWordsExist = false;
    }
  }

  if (allWordsExist) {
    alert("All words exist");
    return;
  }

  if (newWordsAdded) {
    localStorage.setItem('wordPairs', JSON.stringify(existingWordPairs));
  }

  textarea.value = '';
  toggleManageWords();
  isNewWordsSubmitted = true;

  // Reset the Next button text if it says "Restart"
  const nextButton = document.getElementById('nextButton');
  if (nextButton.innerText === 'Restart') {
    nextButton.innerText = 'Next';
  }

  loadFlashcards();
}


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

function deleteWords() {
  console.log(roundCompleted)
  progressBar = document.getElementById('progressDisplay')
  progressDisplay.innerText = "";
  localStorage.removeItem('wordPairs');
  wordPairsArray = [];
  document.getElementById('flashcard').innerHTML = 'Please add at least 3 words';
  document.getElementById('nextButton').style.display = 'none';
  alert("All words deleted")
}

function shuffleWordPairs() {
  if (isPageLoaded || isNewWordsSubmitted || roundCompleted) {
    var lastWordOfPreviousRound = wordPairsArray.length > 0 ? wordPairsArray[wordPairsArray.length - 1][0] : null;
    shuffle(wordPairsArray);

    // Check if the first word of the new round is the same as the last word of the previous round
    if (wordPairsArray[0][0] === lastWordOfPreviousRound) {
      // Simple solution: move the first word to the end of the array
      wordPairsArray.push(wordPairsArray.shift());
    }

    console.log("Shuffled", JSON.stringify(wordPairsArray, null, 2));
    isNewWordsSubmitted = false; // Reset flag after shuffling
  }
}


function showNextWord() {
  if (currentWordIndex >= wordPairsArray.length) {
    console.log("ROUND COMPLETED")

    document.getElementById('nextButton').innerText = 'Restart';

    const totalWords = wordPairsArray.length;
    const percentage = totalWords > 0 ? Math.round((correctAnswersCount / totalWords) * 100) : 0;

    document.getElementById('flashcard').innerHTML = `
                        <div class="round-complete-message">
                            All words completed.<br>
                            Score: ${correctAnswersCount}/${totalWords}<br>
                            Percentage: ${percentage}%
                        </div>
                    `;


    roundCompleted = true;
    correctAnswersCount = 0;
    const deleteButton = document.querySelector('.delete-button');
    deleteButton.disabled = false;
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = false;

    shuffleWordPairs();
    currentWordIndex = 0;
    return;
  }

  // track progress
  var totalWords = wordPairsArray.length;

  progressBar = document.getElementById('progressDisplay')
  if (totalWords === 0) {
    progressDisplay.innerText = "";
  } else {
    progressDisplay.innerText = `${currentWordIndex + 1}/${totalWords}`;
  }


  const [englishWord, spanishWord] = wordPairsArray[currentWordIndex];
  console.log("wordPairsArray", JSON.stringify(wordPairsArray, null, 2))
  console.log("Index is " + currentWordIndex)
  console.log("English word: " + englishWord)
  console.log("\n\n\n\n\n\n\n\n\n")

  const flashcard = document.getElementById('flashcard');
  flashcard.innerHTML = `
            <div id="englishWord">${englishWord}</div>
            <input type="text" id="userInput" class="userInputStyles" spellcheck="false" />
            <button class="check-button" id="check-button-id" onclick="checkAnswer('${spanishWord}')">Check</button>
        `;
  document.getElementById('nextButton').style.display = 'block';
  document.getElementById('nextButton').disabled = true;

}

function checkAnswer(correctSpanishWord) {
  const userInput = document.getElementById('userInput').value;
  const englishWord = document.getElementById('englishWord').innerText;
  const isCorrect = userInput.trim() === correctSpanishWord;

  if (isCorrect) {
    correctAnswersCount++;
  }

  const correctSVG = `<svg width="2.5rem" height="2.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="white" />
    <path fill="none" stroke="green" stroke-width="3" d="M7 12l4 4 7-7" />
</svg>`; // Replace with your actual SVG markup for 'Correct'
  const incorrectSVG = `<svg width="2.5rem" height="2.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="14" r="10" fill="white" />
                                <path fill="red" d="M8 8l4 4 4-4 2 2-4 4 4 4-2 2-4-4-4 4-2-2 4-4-4-4z" />
                            </svg>
                            `; // Replace with your actual SVG markup for 'Incorrect'

  const flashcard = document.getElementById('flashcard');
  flashcard.innerHTML = `
        <div id="resultEnglishWord">${englishWord}</div>
        <div id="resultEqualsSign">=</div>
        <div id="resultSpanishWord">${correctSpanishWord}</div>
        <div id="resultUserInput">You typed: ${userInput}</div>
        <div id="resultCorrectness" class="result-display">
            ${isCorrect ?
    `<span class="svg-container">${correctSVG}</span><span class="text-container">Correct</span>` :
    `<span class="svg-container">${incorrectSVG}</span><span class="text-container">Incorrect</span>`}
        </div>
    `;

  // Enable the next button to allow moving to the next word
  document.getElementById('nextButton').disabled = false;
}



document.getElementById('nextButton').addEventListener('click', function() {
  console.log("nextbutton clicked")
  if (roundCompleted) {
    console.log("nextbutton clicked - roundcompleted")
    shuffleWordPairs();
    roundCompleted = false;

    const deleteButton = document.querySelector('.delete-button');
    deleteButton.disabled = true;
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;


    this.innerText = 'Next';
    currentWordIndex = 0;
    showNextWord();
  } else {
    console.log("nextbutton clicked - round not completed")
    currentWordIndex++
    showNextWord()
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
