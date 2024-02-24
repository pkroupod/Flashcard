function toggleMode(mode) {
  const html = document.documentElement;
  const body = document.body;

  // Remove existing classes
  html.classList.remove('night-mode', 'day-mode');
  body.classList.remove('night-mode', 'day-mode');

  // Add new classes based on the mode
  if (mode === 'night') {
    html.classList.add('night-mode');
    body.classList.add('night-mode');
    html.style.backgroundColor = '#000000'; // Directly set the background color
  } else if (mode === 'day') {
    html.classList.remove('night-mode');
    body.classList.remove('night-mode');
    html.style.backgroundColor = '#ffffff'; // Directly set the background color
  } else {
    // Set mode based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('night-mode');
      body.classList.add('night-mode');
      html.style.backgroundColor = '#000000';
    } else {
      html.classList.add('day-mode');
      body.classList.add('day-mode');
      html.style.backgroundColor = '#ffffff'
    }
  }
  // Force a reflow/repaint on the html element
  void html.offsetWidth;
}

