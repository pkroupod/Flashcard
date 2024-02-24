function toggleMode(mode) {
  const html = document.documentElement;

  if (mode === 'night') {
    html.classList.add('night-mode');
  } else if (mode === 'day') {
    html.classList.remove('night-mode');
  } else {
    // Automatically set mode based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('night-mode');
    } else {
      html.classList.remove('night-mode');
    }
  }
}



