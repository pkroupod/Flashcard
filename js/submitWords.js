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

  // console.log("existingWordPairs variable length IS: " + Object.keys(existingWordPairs).length)
  // console.log("current local storage length IS: " + Object.keys(JSON.parse(localStorage.getItem('wordPairs') || '{}')).length)

  // user can only add at least 3 words when no words are in local storage
  if (Object.keys(existingWordPairs).length < 3 &&
    Object.keys(JSON.parse(localStorage.getItem('wordPairs') || '{}')).length < 3) {
    alert("Please add at least 3 words");
    return;
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
