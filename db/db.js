/*
    The database module :
    Using MySQL

*/
const mysql = require('mysql')
require('dotenv').config();

// Create the connection 
const db = mysql.createConnection({
    connectionLimit: 15,             // Adjust this value as needed 2 connections 1 for the app and 1 for express.sessions
    host: process.env.DB_HOST,      // Replace with correct host ip
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
/*Creating the object and connecting*/
db.connect(err => {
    if (err) {
        console.log('db.js: Error connecting to MySQL: MYSQL SERVER IS UNREACHABLE');
        return;
    }
    console.log('Connected to MySQL');
});
/**
 * Executes a SQL query with the provided SQL string and values.
 * @param {string} sql - The SQL query string.
 * @param {Array} values - Array of values for the query placeholders.
 * @returns {Promise} - A Promise that resolves to the query results.
 */
function executeQuery(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);  // Find how many results via results.length
            }
        });
    });
}

module.exports = { db, executeQuery };