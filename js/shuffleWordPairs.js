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
