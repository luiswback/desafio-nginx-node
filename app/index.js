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

// Endpoint para inserir dados e exibir a lista
app.get('/', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;

        // Inserir dados
        const sqlInsert = `INSERT INTO people(name) VALUES ('Luis')`;
        connection.query(sqlInsert, (err, resultInsert) => {
            if (err) {
                console.error('Error executing INSERT query:', err);
                throw err;
            }

            console.log('INSERT query executed successfully:', resultInsert);

            // Recuperar dados
            connection.query("SELECT * FROM people", function (err, resultSelect, fields) {
                if (err) {
                    console.error('Error executing SELECT query:', err);
                    throw err;
                }
                console.log('SELECT query executed successfully:', resultSelect);

                // Formatar a saída em uma lista HTML
                const resultList = resultSelect.map(person => `<li>ID: ${person.id}, Nome: ${person.name}</li>`).join('');

                // Enviar a resposta para o navegador com formatação HTML
                res.send(`<ul>${resultList}</ul>`);

                // Encerrar a conexão após a seleção
                connection.end();
            });
        });
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
