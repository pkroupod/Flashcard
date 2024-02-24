function checkAnswer(correctSpanishWord) {
  const userInput = document.getElementById('userInput').value;
  const englishWord = document.getElementById('englishWord').innerText;
  const isCorrect = userInput.trim().toLowerCase() === correctSpanishWord.toLowerCase();

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
        <div id="resultUserInput">You typed:&nbsp;&nbsp;<span id="resultUserInputTyped">${userInput}</span></div>
        <div id="resultCorrectness" class="result-display">
            ${isCorrect ?
    `<span class="svg-container">${correctSVG}</span><span class="text-container">Correct</span>` :
    `<span class="svg-container">${incorrectSVG}</span><span class="text-container">Incorrect</span>`}
        </div>
    `;

  // Enable the next button to allow moving to the next word
  document.getElementById('nextButton').disabled = false;
  document.getElementById('nextButton').classList.remove('next-button-disabled');
}
