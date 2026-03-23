from tensorflow import keras
from keras import layers, models
from keras.applications.inception_v3 import InceptionV3
import tensorflow as tf

# ---------------------------
# Paths to training and validation directories
# ---------------------------
train_dir = 'Image_Scrubbing/train'
validation_dir = 'Image_Scrubbing/validation'

# ---------------------------
# Load datasets
# ---------------------------
train_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    image_size=(299, 299),
    batch_size=8,
    label_mode='binary'
)

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    validation_dir,
    image_size=(299, 299),
    batch_size=8,
    label_mode='binary'
)

train_dataset = train_dataset.prefetch(buffer_size=tf.data.AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=tf.data.AUTOTUNE)

# ---------------------------
# Load InceptionV3 base model (pretrained on ImageNet)
# ---------------------------
base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=(299, 299, 3))
base_model.trainable = True  # Allow fine-tuning

# ---------------------------
# Custom model with additional convolutional layers
# ---------------------------
inputs = layers.Input(shape=(299, 299, 3))
x = base_model(inputs, training=True)

# Extra convolutional layers before pooling
x = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(x)
x = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(x)

# Global pooling layer
x = layers.GlobalAveragePooling2D()(x)

# Fully connected layer
x = layers.Dense(512, activation='relu')(x)
x = layers.Dropout(0.3)(x)

# Output layer
outputs = layers.Dense(1, activation='sigmoid')(x)

# Compile the full model
model = keras.Model(inputs=inputs, outputs=outputs)

model.compile(
    optimizer=keras.optimizers.Adam(
        learning_rate=0.0001,
        beta_1=0.9,
        beta_2=0.999,
        epsilon=1e-07,
        amsgrad=True
    ),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# ---------------------------
# Train the model
# ---------------------------
model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=5
)

# ---------------------------
# Evaluate the model
# ---------------------------
loss, accuracy = model.evaluate(validation_dataset)
print(f"✅ Validation Accuracy: {accuracy * 100:.2f}%")

# ---------------------------
# Save the model
# ---------------------------
model.save("violence_detector_model_v2.keras")
print("✅ Model saved as 'violence_detector_model_v2.keras'")
