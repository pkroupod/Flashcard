function toggleMode(mode) {

  const html = document.documentElement; // Target the html element

  if (mode === 'night') {
    html.classList.add('night-mode');
  } else {
    html.classList.remove('night-mode');
  }
}

