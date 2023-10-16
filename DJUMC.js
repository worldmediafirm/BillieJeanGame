var DJUMC = document.querySelector('.DJUMC');

var x_start = 0;
var x_offset = 0;
var isDragging = false;

DJUMC.addEventListener('touchstart', function(e) {
  isDragging = true;
  x_start = e.touches[0].clientX;
  x_offset = x_start - DJUMC.offsetLeft;
});

document.addEventListener('touchmove', function(e) {
  if (!isDragging) return;
  
  var x_current = e.touches[0].clientX;
  var left = x_current - x_offset;

  DJUMC.style.left = left + 'px';

  hitBoxLeft = DJUMC.offsetLeft;
  hitBoxTop = DJUMC.offsetTop;
  hitBoxRight = DJUMC.offsetLeft + DJUMC.offsetWidth;
  hitBoxBottom = DJUMC.offsetTop + DJUMC.offsetHeight;

 
});

document.addEventListener('touchend', function() {
  isDragging = false;
});
