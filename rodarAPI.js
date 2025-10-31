const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Cadastrar voluntário da ONG Ambiental
app.post('/voluntario', (req, res) => {
    const { nome, email, telefone, cidade, projeto } = req.body;

    const codigoDoMySQL = 'INSERT INTO ongAmbientalAna (nome, email, telefone, cidade, projeto) VALUES (?, ?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [nome, email, telefone, cidade, projeto], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar voluntário.' });
        }
        res.json({ message: 'Voluntário cadastrado com sucesso!' });
    });
});

// Listar voluntários da ONG Ambiental
app.get('/voluntarios', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM ongAmbientalAna';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar voluntários.' });
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor da ONG Ambiental rodando em http://localhost:3000');
});
