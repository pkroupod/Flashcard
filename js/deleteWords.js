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
