document.addEventListener('DOMContentLoaded', function () {
  const DJUMC = document.querySelector('.Main_Character');
  DJUMC.style.left = '50px';
  if (!DJUMC) return;

  const characterMode = sessionStorage.getItem('characterMode'); // 'default' | 'user'
  const storedImageUrl = sessionStorage.getItem('mainCharacterBackground');

  if (characterMode === 'user' && storedImageUrl) {
    DJUMC.style.backgroundImage = `url(${storedImageUrl})`;
    DJUMC.classList.add('user-skin');
    DJUMC.classList.remove('default-skin');
  } else {
    DJUMC.style.backgroundImage = 'url("graphic-assets/DJ-UMC-Main.png")';
    DJUMC.classList.add('default-skin');
    DJUMC.classList.remove('user-skin');
  }

  // Touch movement
  let x_start = 0;
  let x_offset = 0;
  let isDragging = false;

  DJUMC.addEventListener('touchstart', function(e) {
    isDragging = true;
    x_start = e.touches[0].clientX;
    x_offset = x_start - DJUMC.offsetLeft;
  });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;

    let x_current = e.touches[0].clientX;
    let left = x_current - x_offset;
    DJUMC.style.left = left + 'px';
  });

  document.addEventListener('touchend', function() {
    isDragging = false;
  });

  // Keyboard movement
  const moveStep = 20; // pixels per key press

  document.addEventListener('keydown', function(e) {
    const currentLeft = parseInt(window.getComputedStyle(DJUMC).left, 10) || 0;
    if (e.key === 'ArrowRight') {
      DJUMC.style.left = (currentLeft + moveStep) + 'px';
    } else if (e.key === 'ArrowLeft') {
      DJUMC.style.left = (currentLeft - moveStep) + 'px';
    }
  });
});