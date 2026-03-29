from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from io import BytesIO
from rembg import remove
# from PIL import Image
# import numpy as np
# import tensorflow as tf
# from tensorflow import keras
# from keras import layers, models, applications
# from keras.applications.inception_v3 import InceptionV3, preprocess_input
# from nudenet import NudeDetector

# --- Initialize Flask ---
app = Flask(__name__)
CORS(app)

# --- Load Models at Startup ---
# violence_model = tf.keras.models.load_model('violence_detector_model_v2.keras')
# nude_detector = NudeDetector()

print('🚀 Flask app running on port 6015. Listening for images...')

@app.route("/")
def home():
    return "Flask via Gunicorn is running"

@app.route('/background-removal-image', methods=['POST'])
def process_image():
    try:
        # Expecting multipart/form-data with a file field named "image"
        if 'image' not in request.files:
            return jsonify({'error': 'No image file uploaded'}), 400

        uploaded_file = request.files['image']

        if not uploaded_file or uploaded_file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400

        image_bytes = uploaded_file.read()

        if not image_bytes:
            return jsonify({'error': 'Uploaded image is empty'}), 400

        # --- Optional model checks would go here ---
        # Example:
        # pil_img = Image.open(BytesIO(image_bytes)).convert('RGB')

        # --- Background Removal ---
        result_image = remove(image_bytes)

        output_io = BytesIO(result_image)
        output_io.seek(0)

        print("✅ Background removed and image sent")
        return send_file(output_io, mimetype='image/png', as_attachment=False)

    except Exception as e:
        print("❌ Error in /background-removal-image:", str(e), flush=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6015, use_reloader=False)