from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import base64
from io import BytesIO
from rembg import remove

app = Flask(__name__)
CORS(app)

print('App running. Listening for pictures...')

@app.route('/background-removal-image', methods=['POST'])
def upload_image():
    data = request.get_json()
    image_data = data['image']
    image_data = image_data.split(",")[1]  # Remove the Base64 header
    image_bytes = base64.b64decode(image_data)
    result_image = remove(image_bytes)

   
 # Instead of saving to a file, return the processed image directly
    output_io = BytesIO(result_image)
    output_io.seek(0)  # Rewind the file pointer to the start
    return send_file(output_io, mimetype='image/png', as_attachment=False)


if __name__ == '__main__':
    app.run(debug=True)