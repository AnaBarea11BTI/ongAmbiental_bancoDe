const mysql = require('mysql2');

// Configuração da conexão com o servidor MySQL
const acessaBancoNoServidor = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    port: 3306,
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'api_crud' // confirme que o nome do seu banco é esse
});

// Testar conexão
acessaBancoNoServidor.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Exportar para outros arquivos
module.exports = acessaBancoNoServidor;
