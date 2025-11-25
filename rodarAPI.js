const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));


app.post('/animaisResgatados', (req, res) => {
    console.log("POST recebido:", req.body);

    const { especie, local_resgate, estado_saude, data_resgate } = req.body;

    const sql = `
        INSERT INTO animaisResgatados 
        (especie, local_resgate, estado_saude, data_resgate)
        VALUES (?, ?, ?, ?)
    `;

    acessaBancoNoServidor.query(sql, [especie, local_resgate, estado_saude, data_resgate], (err, results) => {
        if (err) {
            console.error("Erro ao cadastrar animal:", err);
            return res.status(500).json({ error: "Erro ao cadastrar animal." });
        }
        console.log("Animal cadastrado:", results);
        res.json({ message: "Animal resgatado cadastrado com sucesso!" });
    });
});


app.get('/animaisResgatados', (req, res) => {
    const sql = 'SELECT * FROM animaisResgatados';

    acessaBancoNoServidor.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar animais:", err);
            return res.status(500).json({ error: "Erro ao buscar animais." });
        }
        res.json(results);
    });
});


app.put('/animaisResgatados/:id', (req, res) => {
    const { id } = req.params;
    const { especie, local_resgate, estado_saude, data_resgate } = req.body;

    console.log("PUT recebido para ID:", id);
    console.log("Dados recebidos:", req.body);

    const sql = `
        UPDATE animaisResgatados
        SET especie = ?, local_resgate = ?, estado_saude = ?, data_resgate = ?
        WHERE ID = ?
    `;

    acessaBancoNoServidor.query(sql, [especie, local_resgate, estado_saude, data_resgate, id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar animal:", err);
            return res.status(500).json({ error: "Erro ao atualizar animal." });
        }

        console.log("Resultado do UPDATE:", results);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Animal não encontrado." });
        }

        res.json({ message: "Animal atualizado com sucesso!" });
    });
});

app.delete('/animaisResgatados/:id', (req, res) => {
    const { id } = req.params;

    console.log("DELETE solicitado para ID:", id);

    const sql = 'DELETE FROM animaisResgatados WHERE ID = ?';

    acessaBancoNoServidor.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Erro ao deletar animal:", err);
            return res.status(500).json({ error: "Erro ao deletar animal." });
        }

        console.log("Resultado DELETE:", results);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Animal não encontrado." });
        }

        res.json({ message: "Animal deletado com sucesso!" });
    });
});


app.listen(3000, () => {
    console.log('Servidor da ONG Ambiental rodando em http://localhost:3000');
});
