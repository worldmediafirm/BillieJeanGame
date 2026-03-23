
const bodyParser = require('body-parser');
const express = require('express');

const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 50MB file size limit
});

//-------------------------------------------------------------

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: '20mb'}));
app.listen(port, () => {console.log(`Server is running on port ${port}`);});
// Middleware to increase request size limit for JSON payloads
app.use(express.json({ limit: '100mb' })); // Adjust the limit as necessary
app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));
const mysql = require('mysql2');
//--------------------------------------------------------------    

// Create a connection to the MariaDB database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'L@Z3r60466',
  database: 'winnersEmailList',
});

var PostSoundStatusFromObject = {};

app.post('/CurrentSoundStatus', (req, res) => {
  PostSoundStatusFromObject = req.body;
  // Process the data on the server
  console.log(PostSoundStatusFromObject);
  res.json(PostSoundStatusFromObject); //'Data received on the server.'
});

app.get('/CurrentSoundStatus', (req, res) => {
console.log(PostSoundStatusFromObject);
res.json(PostSoundStatusFromObject); // Send the current sound status
});



/*app.post('/upload-image', upload.single('image'), (req, res) => {
  if (req.file) {
      // The uploaded file is available as a buffer
      const imageBuffer = req.file.buffer;
      
      // Perform processing or pass the buffer to another service
      console.log('Received file buffer:', imageBuffer);

      // Example: Sending back a success response
      res.json({ message: 'File uploaded and processed in memory successfully!' });
  } else {
      res.status(400).json({ message: 'File upload failed.' });
  }
}); */




app.post('/winnersEmail', (req, res) => {
  var email = req.body;
  // Process the data on the server
  console.log(email);
 addRecordToDatabase(email);
  res.send('Data received on the server.');
});


// Function to insert a new record into the database
function addRecordToDatabase(email) {
  const query = `INSERT INTO emailstable (email) VALUES (?)`;
  const emailValueSentFromLinkList = [email];

  connection.query(query, emailValueSentFromLinkList, (err, result) => {
    if (err) {
      console.error('Error inserting record:', err.message);
    } else {
      console.log('Record inserted successfully:', result);
    }
    connection.end(); // Close the database connection
  });
}
