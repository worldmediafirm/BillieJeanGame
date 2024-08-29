document.addEventListener('DOMContentLoaded', function() {
    // Load the image URL from local storage when the page loads
    var storedImageUrl = sessionStorage.getItem('mainCharacterBackground');
    var DJUMC = document.querySelector('.Main_Character');
    if (storedImageUrl && DJUMC) {
        // If there is a stored image URL, use it
        DJUMC.style.backgroundImage = `url(${storedImageUrl})`;
    } else if (DJUMC) {
        // Otherwise, set to the default image defined in your CSS or specify it here
        DJUMC.style.backgroundImage = 'url("graphic-assets/DJ-UMC-Main.png")';
        DJUMC.style.backgroundRepeat = 'no-repeat';
        DJUMC.style.backgroundSize = 'contain'; 
    }


    // Initialize draggable functionality
    var x_start = 0;
    var x_offset = 0;
    var isDragging = false;

    var DJUMC = document.querySelector('.Main_Character');
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
});
