document.addEventListener('DOMContentLoaded', function() {
    // Load the image URL from local storage when the page loads
    const storedImageUrl = sessionStorage.getItem('mainCharacterBackground');
    if (storedImageUrl) {
        document.documentElement.style.setProperty('--main-character-bg', `url(${storedImageUrl})`);
    }
});

document.querySelector('.uploadButton').addEventListener('click', function() {
    document.getElementById('imageInput').click(); // Trigger the file input
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size exceeds 5MB; Resize or try another picture');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Show the loading indicator
            document.getElementById('loadingIndicator').style.display = 'block';

            fetch('http://localhost:6015/background-removal-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: e.target.result })
            })
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 374; // Desired width
                    canvas.height = 300; // Desired height
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const resizedImageDataUrl = canvas.toDataURL('image/png');

                    // Display the resized image for confirmation
                    const displayArea = document.getElementById('User_Pic_Upload');
                    displayArea.innerHTML = `<img src="${resizedImageDataUrl}" alt="Processed Image">`;

                    // Show confirmation buttons
                    document.querySelector('.clientImgBorder').style.display = 'block';
                    document.getElementById('User_Pic_Upload').style.display = 'block';
                    document.getElementById('confirmButton').style.display = 'block';
                    document.getElementById('retryButton').style.display = 'block';

                    // Hide the loading indicator
                    document.getElementById('loadingIndicator').style.display = 'none';
                };
                img.src = url;
            })
            .catch(error => {
                console.error('Error:', error);
                // Hide the loading indicator
                document.getElementById('loadingIndicator').style.display = 'none';
            });
        };
        reader.readAsDataURL(file);
    }
});

// Event listener for confirm button
document.getElementById('confirmButton').addEventListener('click', function() {
    const imageElement = document.querySelector('#User_Pic_Upload img');
    if (imageElement) {
        // Store the image URL in local storage
        sessionStorage.setItem('mainCharacterBackground', imageElement.src);
        document.documentElement.style.setProperty('--main-character-bg', `url(${imageElement.src})`);
        console.log('Image URL stored in local storage:', imageElement.src);
    }

    // Hide the overlay and the image confirmation area
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('User_Pic_Upload').style.display = 'none';

    // Hide buttons after confirmation
    document.getElementById('confirmButton').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';

    // Display the game start menu
    document.querySelector('.menu-container').style.display = 'block';
});

// Event listener for retry button
document.getElementById('retryButton').addEventListener('click', function() {
    document.getElementById('User_Pic_Upload').innerHTML = ''; // Clear the image preview
    document.getElementById('confirmButton').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';
    document.querySelector('.clientImgBorder').style.display = 'none';

    document.getElementById('imageInput').click(); // Trigger the file input again
});
