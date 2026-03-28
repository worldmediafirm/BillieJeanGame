document.addEventListener('DOMContentLoaded', function () {
    let flaskProcessedImageDataUrl = null; // full image from Flask for gameplay

    // === Restore background if previously set ===
    const storedImageUrl = sessionStorage.getItem('mainCharacterBackground');
    if (storedImageUrl) {
        document.documentElement.style.setProperty('--main-character-bg', `url(${storedImageUrl})`);
    }

    // === Button: Upload Image ===
    document.querySelector('.uploadButton')?.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById('imageInput')?.click();
    });

    // === File Input: Image Selected ===
    document.getElementById('imageInput')?.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('File size exceeds 5MB; Resize or try another picture');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('loadingIndicator').style.display = 'block';

            fetch('/api/background-removal-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: e.target.result })
            })
            .then(response => response.blob())
            .then(blob => {
                // Convert the ACTUAL Flask-returned image to a data URL
                // so we can store and reuse it for gameplay.
                const flaskReader = new FileReader();

                flaskReader.onloadend = function () {
                    flaskProcessedImageDataUrl = flaskReader.result;

                    const img = new Image();
                    img.onload = function () {
                        const previewBox = document.querySelector('.clientImgBorder');

                        // make sure preview box is visible before measuring
                        previewBox.style.display = 'flex';
                        document.getElementById('User_Pic_Upload').style.display = 'flex';

                        const previewRect = previewBox.getBoundingClientRect();
                        const OUT_W = Math.max(150, Math.round(previewRect.width));
                        const OUT_H = Math.max(120, Math.round(previewRect.height));

                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        canvas.width = OUT_W;
                        canvas.height = OUT_H;

                        // Clear + transparent background
                        ctx.clearRect(0, 0, OUT_W, OUT_H);

                        // Preview composition only
                        const scale = Math.max(OUT_W / img.width, OUT_H / img.height);
                        const drawW = img.width * scale;
                        const drawH = img.height * scale;

                        const dx = (OUT_W - drawW) / 2;
                        const dy = (OUT_H - drawH) / 2;

                        ctx.drawImage(img, dx, dy, drawW, drawH);

                        const previewImageDataUrl = canvas.toDataURL('image/png');

                        // Display PREVIEW ONLY
                        document.getElementById('User_Pic_Upload').innerHTML =
                            `<img src="${previewImageDataUrl}" alt="Processed Image">`;

                        showOverlay();
                    };

                    img.src = flaskProcessedImageDataUrl;
                };

                flaskReader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('loadingIndicator').style.display = 'none';
            });
        };

        reader.readAsDataURL(file);
    });

    // === Button: Confirm Image ===
    document.getElementById('confirmButton')?.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (flaskProcessedImageDataUrl) {
            // Store the REAL Flask image for gameplay
            sessionStorage.setItem('mainCharacterBackground', flaskProcessedImageDataUrl);
            sessionStorage.setItem('characterMode', 'user');

            document.documentElement.style.setProperty(
                '--main-character-bg',
                `url(${flaskProcessedImageDataUrl})`
            );

            console.log('Stored Flask gameplay image.');
        }

        hideOverlay();
        showMenu();
    });

    // === Button: Retry Image ===
    document.getElementById('retryButton')?.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        flaskProcessedImageDataUrl = null;
        document.getElementById('User_Pic_Upload').innerHTML = '';
        document.querySelector('.clientImgBorder').style.display = 'none';
        document.getElementById('confirmButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'none';
        window.location.href = 'main.html';
    });

    // === Button: Play Default ===
    document.getElementById('playDefault')?.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        sessionStorage.setItem('characterMode', 'default');
        sessionStorage.removeItem('mainCharacterBackground');

        console.log('Default play button clicked.');
        hideOverlay();
        showMenu();
    });

    // === Helper Functions ===
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
        document.querySelector('.clientImgBorder').style.display = 'flex';
        document.getElementById('User_Pic_Upload').style.display = 'flex';
        document.getElementById('confirmButton').style.display = 'block';
        document.getElementById('retryButton').style.display = 'block';
        document.getElementById('loadingIndicator').style.display = 'none';
        document.querySelector('.menu-container').style.display = 'none';
    }

    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('User_Pic_Upload').style.display = 'none';
        document.getElementById('confirmButton').style.display = 'none';
        document.getElementById('retryButton').style.display = 'none';
        document.querySelector('.clientImgBorder').style.display = 'none';
    }

    function showMenu() {
        document.querySelector('.menu-container').style.display = 'block';
    }
});