// collision.js
// collision.js
const customCollisionBoxes = {
  '.Main_Character': { width: 200, height: 274 }, // Example sizes
  '.doubt-Phrases': { width: 66, height: 33 } // Example sizes
};

function checkCollisionWithElement(element) {
  var DJUMC = document.querySelector('.Main_Character');
  var DJUMCRect = DJUMC.getBoundingClientRect();
  var elementRect = element.getBoundingClientRect();

  // Get custom collision box sizes
  const DJUMCBox = customCollisionBoxes['.Main_Character'];
  const elementBox = customCollisionBoxes['.doubt-Phrases'];

  // Calculate adjusted collision boxes
  const adjustedDJUMCRect = {
    left: DJUMCRect.left + (DJUMCRect.width - DJUMCBox.width) / 2,
    right: DJUMCRect.left + (DJUMCRect.width + DJUMCBox.width) / 2,
    top: DJUMCRect.top + (DJUMCRect.height - DJUMCBox.height) / 2,
    bottom: DJUMCRect.top + (DJUMCRect.height + DJUMCBox.height) / 2
  };

  const adjustedElementRect = {
    left: elementRect.left + (elementRect.width - elementBox.width) / 2,
    right: elementRect.left + (elementRect.width + elementBox.width) / 2,
    top: elementRect.top + (elementRect.height - elementBox.height) / 2,
    bottom: elementRect.top + (elementRect.height + elementBox.height) / 2
  };

  return (
      adjustedElementRect.right > adjustedDJUMCRect.left &&
      adjustedElementRect.left < adjustedDJUMCRect.right &&
      adjustedElementRect.bottom > adjustedDJUMCRect.top &&
      adjustedElementRect.top < adjustedDJUMCRect.bottom
  );
}

