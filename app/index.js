const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) value('Luis')`;

connection.query(sql, (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        throw error;
    }

    console.log('Query executed successfully:', results);
    connection.end();
});

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>');
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
