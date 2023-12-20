const mysql = require('mysql2');

// Create a connection to the MariaDB database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'testuser',
  password: 'testpass',
  database: 'winnersEmailList',
});

// Function to insert a new record into the database
function addRecordToDatabase(name, email) {
  const query = `INSERT INTO your_table_name (name, email) VALUES (?, ?)`;
  const values = [name, email];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting record:', err.message);
    } else {
      console.log('Record inserted successfully:', result);
    }
    connection.end(); // Close the database connection
  });
}

// Example usage
addRecordToDatabase('John Doe', 'john.doe@example.com');
