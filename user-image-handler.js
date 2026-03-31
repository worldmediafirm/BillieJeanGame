document.addEventListener('DOMContentLoaded', function () {
    let flaskProcessedImageDataUrl = null; // reduced image used for gameplay/storage

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

        if (!file.type || !file.type.startsWith('image/')) {
            alert('Please choose a valid image file.');
            resetInput();
            return;
        }

        document.getElementById('loadingIndicator').style.display = 'block';

        try {
            // Normalize BEFORE sending to Flask/rembg
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

            if (!blob || blob.size === 0) {
                throw new Error('The server returned an empty image.');
            }

            const returnedType = blob.type || '';
            if (returnedType && !returnedType.startsWith('image/')) {
                const nonImageText = await blob.text().catch(() => '');
                throw new Error(`The server did not return an image. ${nonImageText.slice(0, 200)}`);
            }

            await handleReturnedImageBlob(blob);
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

                console.log('Stored reduced gameplay image.');
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

    // === Main Returned-Image Handler ===
    async function handleReturnedImageBlob(blob) {
        const blobUrl = URL.createObjectURL(blob);

        try {
            const img = await loadImageFromUrl(blobUrl);

            const previewBox = document.querySelector('.clientImgBorder');
            const previewTarget = document.getElementById('User_Pic_Upload');

            if (!previewBox || !previewTarget) {
                throw new Error('Preview elements are missing from the page.');
            }

            previewBox.style.display = 'flex';
            previewTarget.style.display = 'flex';

            const previewRect = previewBox.getBoundingClientRect();
            const OUT_W = Math.max(150, Math.round(previewRect.width || 150));
            const OUT_H = Math.max(120, Math.round(previewRect.height || 120));

            const previewCanvas = document.createElement('canvas');
            const previewCtx = previewCanvas.getContext('2d');

            if (!previewCtx) {
                throw new Error('Canvas context could not be created.');
            }

            previewCanvas.width = OUT_W;
            previewCanvas.height = OUT_H;
            previewCtx.clearRect(0, 0, OUT_W, OUT_H);

            const scale = Math.max(OUT_W / img.width, OUT_H / img.height);
            const drawW = img.width * scale;
            const drawH = img.height * scale;
            const dx = (OUT_W - drawW) / 2;
            const dy = (OUT_H - drawH) / 2;

            previewCtx.drawImage(img, dx, dy, drawW, drawH);

            const previewImageDataUrl = previewCanvas.toDataURL('image/png');
            previewTarget.innerHTML = `<img src="${previewImageDataUrl}" alt="Processed Image">`;

            // Create a reduced gameplay/storage version too
            flaskProcessedImageDataUrl = await createReducedGameplayImage(img);

            showOverlay();
        } catch (error) {
            throw new Error(`Returned image handling failed: ${error.message}`);
        } finally {
            URL.revokeObjectURL(blobUrl);
        }
    }

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

        let quality = 0.88;
        let blob = await canvasToBlob(canvas, 'image/jpeg', quality);

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

    async function createReducedGameplayImage(img) {
        const maxDimension = 900; // smaller for mobile/sessionStorage safety

        let { width, height } = img;
        const scale = Math.min(1, maxDimension / Math.max(width, height));
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context could not be created for gameplay image.');
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // PNG preserves the transparency returned by rembg
        return canvas.toDataURL('image/png');
    }

    function loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const objectUrl = URL.createObjectURL(file);

            loadImageFromUrl(objectUrl)
                .then((img) => {
                    URL.revokeObjectURL(objectUrl);
                    resolve(img);
                })
                .catch((error) => {
                    URL.revokeObjectURL(objectUrl);
                    reject(error);
                });
        });
    }

    function loadImageFromUrl(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = function () {
                resolve(img);
            };

            img.onerror = function () {
                reject(new Error('Image could not be loaded.'));
            };

            img.src = url;
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