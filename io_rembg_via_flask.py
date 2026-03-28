from flask import Flask, request, send_file
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
import numpy as np
from rembg import remove
#import tensorflow as tf
#from tensorflow import keras
#from keras import layers, models, applications
#from keras.applications.inception_v3 import InceptionV3, preprocess_input
#from nudenet import NudeDetector

# --- Initialize Flask ---
app = Flask(__name__)
CORS(app)

# --- Load Models at Startup ---
#violence_model = tf.keras.models.load_model('violence_detector_model_v2.keras')
#nude_detector = NudeDetector()

print('🚀 Flask app running on port 6015. Listening for images...')

@app.route("/")
def home():
    return "Flask via Gunicorn is running"

@app.route('/background-removal-image', methods=['POST'])
def process_image():
    # Get image from POST body
    data = request.get_json()
    image_data = data['image']
    if "," in image_data:
        image_data = image_data.split(",")[1]  # Strip base64 prefix
    image_bytes = base64.b64decode(image_data)

    # Convert to PIL for processing
   # pil_img = Image.open(BytesIO(image_bytes)).convert('RGB')
    #print("🖼️ Image received and decoded")

    # --- Violence Detection ---
    #try:
     #   resized_img = pil_img.resize((299, 299))
     #   img_array = np.array(resized_img)
     #   img_array = preprocess_input(img_array)  # Correct preprocessing for InceptionV3
     #   input_tensor = np.expand_dims(img_array, axis=0)
     #   predictions = violence_model.predict(input_tensor)
     #   violence_score = float(predictions[0][0])  # assuming binary classifier
     #   print(f"🔍 Violence score: {violence_score:.4f}")
    #except Exception as e:
     #   violence_score = -1
      #  print("❌ Violence model error:", str(e))

    # --- Nude Detection ---
    #try:
     #   nude_results = nude_detector.detect(image_bytes)
     #   print("🧠 Nude detection results:", nude_results)

      #  flagged = any(
       #     item.get('class') in [
        #        'EXPOSED_ANUS', 'FEMALE_GENITALIA', 'MALE_GENITALIA',
         #       'SEXUAL_ACTIVITY', 'BUTTOCKS'
          #  ] and item.get('score', 0) > 0.6
           # for item in nude_results
        #)
        #print(f"🚩 Nude content flagged: {flagged}")
    #except Exception as e:
     #   print("❌ NudeNet detection error:", str(e))
      #  flagged = False

    # --- Background Removal ---
    result_image = remove(image_bytes)
    output_io = BytesIO(result_image)
    output_io.seek(0)

    print("✅ Background removed and image sent")
    return send_file(output_io, mimetype='image/png', as_attachment=False)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6015, use_reloader=False)
