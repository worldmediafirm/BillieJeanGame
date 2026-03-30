document.addEventListener('DOMContentLoaded', function () {
    let flaskProcessedImageDataUrl = null; // full image returned from Flask for gameplay

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
    document.getElementById('imageInput')?.addEventListener('change', async function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const hardMaxSize = 100 * 1024 * 1024; // 100MB absolute ceiling
        if (file.size > hardMaxSize) {
            alert('File size exceeds 100MB. Please choose a smaller picture.');
            resetInput();
            return;
        }

        // Keep this permissive enough for common phones, but still image-only
        if (!file.type || !file.type.startsWith('image/')) {
            alert('Please choose a valid image file.');
            resetInput();
            return;
        }

        document.getElementById('loadingIndicator').style.display = 'block';

        try {
            // Normalize the image BEFORE sending it to Flask/rembg
            const processedUploadFile = await normalizeImageForUpload(file);

            const formData = new FormData();
            formData.append('image', processedUploadFile, processedUploadFile.name || 'upload.jpg');

            const response = await fetch('/api/background-removal-image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error ${response.status}: ${errorText.slice(0, 200)}`);
            }

            const blob = await response.blob();

            // Basic sanity check: make sure we got something image-like back
            if (!blob || blob.size === 0) {
                throw new Error('The server returned an empty image.');
            }

            const returnedType = blob.type || '';
            if (returnedType && !returnedType.startsWith('image/')) {
                const nonImageText = await blob.text().catch(() => '');
                throw new Error(`The server did not return an image. ${nonImageText.slice(0, 200)}`);
            }

            // Convert returned image to a data URL for preview + later gameplay storage
            const flaskReader = new FileReader();

            flaskReader.onloadend = function () {
                flaskProcessedImageDataUrl = flaskReader.result;

                const img = new Image();

                img.onload = function () {
                    const previewBox = document.querySelector('.clientImgBorder');
                    const previewTarget = document.getElementById('User_Pic_Upload');

                    if (!previewBox || !previewTarget) {
                        throw new Error('Preview elements are missing from the page.');
                    }

                    // Make sure preview box is visible before measuring
                    previewBox.style.display = 'flex';
                    previewTarget.style.display = 'flex';

                    const previewRect = previewBox.getBoundingClientRect();
                    const OUT_W = Math.max(150, Math.round(previewRect.width || 150));
                    const OUT_H = Math.max(120, Math.round(previewRect.height || 120));

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    if (!ctx) {
                        throw new Error('Canvas context could not be created.');
                    }

                    canvas.width = OUT_W;
                    canvas.height = OUT_H;

                    // Transparent background
                    ctx.clearRect(0, 0, OUT_W, OUT_H);

                    // Preview composition only
                    const scale = Math.max(OUT_W / img.width, OUT_H / img.height);
                    const drawW = img.width * scale;
                    const drawH = img.height * scale;
                    const dx = (OUT_W - drawW) / 2;
                    const dy = (OUT_H - drawH) / 2;

                    ctx.drawImage(img, dx, dy, drawW, drawH);

                    const previewImageDataUrl = canvas.toDataURL('image/png');

                    previewTarget.innerHTML = `<img src="${previewImageDataUrl}" alt="Processed Image">`;

                    showOverlay();
                };

                img.onerror = function () {
                    document.getElementById('loadingIndicator').style.display = 'none';
                    alert('The processed image could not be displayed. Try another picture.');
                    resetInput();
                };

                img.src = flaskProcessedImageDataUrl;
            };

            flaskReader.onerror = function () {
                document.getElementById('loadingIndicator').style.display = 'none';
                alert('The returned image could not be read.');
                resetInput();
            };

            flaskReader.readAsDataURL(blob);
        } catch (error) {
            console.error('Image processing error:', error);
            document.getElementById('loadingIndicator').style.display = 'none';
            alert(`Image processing failed: ${error.message}`);
            resetInput();
        }
    });

    // === Button: Confirm Image ===
    document.getElementById('confirmButton')?.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        try {
            if (flaskProcessedImageDataUrl) {
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
            resetInput();
        } catch (error) {
            console.error('Confirm image error:', error);
            alert('The image could not be saved for gameplay on this device.');
        }
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
        document.getElementById('loadingIndicator').style.display = 'none';

        resetInput();
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
        resetInput();
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

    function resetInput() {
        const input = document.getElementById('imageInput');
        if (input) input.value = '';
    }

    async function normalizeImageForUpload(file) {
        // If already reasonable, send as-is
        const maxUploadBytes = 8 * 1024 * 1024; // target max upload size ~8MB
        const maxDimension = 1800; // max width/height before rembg

        const needsResize = await imageNeedsResize(file, maxUploadBytes, maxDimension);

        if (!needsResize) {
            return file;
        }

        const img = await loadImageFromFile(file);

        let { width, height } = img;

        const scale = Math.min(1, maxDimension / Math.max(width, height));
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context could not be created for image normalization.');
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // JPEG is fine before rembg; rembg will return PNG after background removal
        let quality = 0.88;
        let blob = await canvasToBlob(canvas, 'image/jpeg', quality);

        // Try stepping quality down if still too large
        while (blob.size > maxUploadBytes && quality > 0.55) {
            quality -= 0.08;
            blob = await canvasToBlob(canvas, 'image/jpeg', quality);
        }

        const safeName = (file.name || 'upload')
            .replace(/\.[^.]+$/, '')
            .replace(/[^\w-]+/g, '_');

        return new File([blob], `${safeName}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now()
        });
    }

    async function imageNeedsResize(file, maxUploadBytes, maxDimension) {
        if (file.size > maxUploadBytes) {
            return true;
        }

        const img = await loadImageFromFile(file);
        return img.width > maxDimension || img.height > maxDimension;
    }

    function loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const objectUrl = URL.createObjectURL(file);
            const img = new Image();

            img.onload = function () {
                URL.revokeObjectURL(objectUrl);
                resolve(img);
            };

            img.onerror = function () {
                URL.revokeObjectURL(objectUrl);
                reject(new Error('Selected image could not be loaded.'));
            };

            img.src = objectUrl;
        });
    }

    function canvasToBlob(canvas, type, quality) {
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas export failed.'));
                    return;
                }
                resolve(blob);
            }, type, quality);
        });
    }
});