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

app.get('/', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("SELECT * FROM people", function (err, result, fields) {
            if (err) {
                console.error('Error executing SELECT query:', err);
                throw err;
            }
            console.log('SELECT query executed successfully:', result);

            // Formatar a saída em uma lista HTML
            const resultList = result.map(person => `<li>ID: ${person.id}, Nome: ${person.name}</li>`).join('');

            // Enviar a resposta para a solicitação do Express com formatação HTML
            res.send(`<ul>${resultList}</ul>`);

            // Agora que todas as operações foram concluídas, podemos encerrar a conexão.
            connection.end();
        });
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
