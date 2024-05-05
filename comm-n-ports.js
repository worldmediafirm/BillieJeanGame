const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.listen(port, () => {console.log(`Server is running on port ${port}`);});
    

// Create a connection to the MariaDB database
/*const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'wmfmariadb',
  password: 'L@Z3r60466',
  database: 'winnersEmailList',
});*/

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







app.post('/winnersEmail', (req, res) => {
  var email = req.body;
  // Process the data on the server
  console.log(email);
 // addRecordToDatabase(email);
  res.send('Data received on the server.');
});


// Function to insert a new record into the database
function addRecordToDatabase(email) {
  const query = `INSERT INTO winnersEmailList (email) VALUES (?)`;
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
