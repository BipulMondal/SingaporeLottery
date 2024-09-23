function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      document.body.classList.add("fullscreen-active");
    }).catch((err) => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen().then(() => {
      document.body.classList.remove("fullscreen-active");
    }).catch((err) => {
      console.error(`Error attempting to exit full-screen mode: ${err.message}`);
    });
  }
}

// Automatically enter fullscreen on landscape mode
window.addEventListener("orientationchange", function() {
  if (window.orientation === 90 || window.orientation === -90) {
    toggleFullScreen(); // Trigger fullscreen when entering landscape mode
  } else if (window.orientation === 0 || window.orientation === 180) {
    if (document.fullscreenElement) {
      document.exitFullscreen(); // Exit fullscreen in portrait mode
    }
  }
});
