const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'samplify'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});


app.post('/submit', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if the username and password combination already exists
    const checkSql = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkSql, [username], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking username and password:', checkErr);
            res.send('Error checking username and password');
            return;
        }

        if (checkResult.length > 0) {
            // Throw an error if the username and password combination already exists
            res.send('This user already exists');
            return;
        }

        // Insert the data into the table if the username and password combination is not found
        const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(insertSql, [username, password], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting data into MySQL table:', insertErr);
                res.send('Error inserting data');
                return;
            }

            console.log('Data inserted into MySQL table');
            res.send('Data inserted successfully');
        });
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const checkSql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(checkSql, [username, password], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking username and password:', checkErr);
            res.send('Error checking username and password');
            return;
        }

        if (checkResult.length > 0) {
            // Throw an error if the username and password combination already exists
            res.send('You have succesfully logged in');
            return;
        }
        else {
            res.send('No user found')
            return;
        }
    });
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})