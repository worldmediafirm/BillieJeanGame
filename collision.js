function checkCollisionWithElement(element) {


var DJUMC = document.querySelector('.Main_Character');
var DJUMCRect = DJUMC.getBoundingClientRect();
var DJUMCLeft = DJUMCRect.left;
var DJUMCTop = DJUMCRect.top;
var DJUMCWidth = DJUMCRect.width;
var DJUMCHeight = DJUMCRect.height;

var hitBoxLeft = DJUMCLeft;
var hitBoxTop = DJUMCTop;
var hitBoxRight = DJUMCLeft + DJUMCWidth;
var hitBoxBottom = DJUMCTop + DJUMCHeight;

    var elementRect = element.getBoundingClientRect();
    var elementCenterX = elementRect.left + elementRect.width / 2;
    var elementCenterY = elementRect.top + elementRect.height / 2;
  
    if (
      elementCenterX >= hitBoxLeft - 20||
      elementCenterX <= hitBoxRight +20 ||
      elementCenterY >= hitBoxTop - 20||
      elementCenterY <= hitBoxBottom +20
    ) {
     deathBar.updateHealth(deathBar.health + 10);
    }
  }
  