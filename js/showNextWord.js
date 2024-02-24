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

    // round is completed, you can manage the words

    const deleteButton = document.querySelector('.delete-button');
    deleteButton.disabled = false;
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = false;
    const manageWordsButton = document.querySelector('.manage-words-button');
    manageWordsButton.disabled = false;
    manageWordsButton.classList.remove('manage-words-button-disabled');

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
  document.getElementById('nextButton').classList.add('next-button-disabled');

}
