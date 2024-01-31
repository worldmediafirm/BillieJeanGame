var DJUMC = document.querySelector('.Main_Character');
//var imageInput = document.getElementById('imageInput');

var x_start = 0;
var x_offset = 0;
var isDragging = false;

// Dragging Event Listeners
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
});

document.addEventListener('touchend', function() {
    isDragging = false;
});

/*// Image Upload Handling
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const newImageUrl = e.target.result;
        DJUMC.style.backgroundImage = `url(${newImageUrl})`;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});*/
