const mysql = require('mysql2');

// Configuração da conexão com o servidor MySQL
const acessaBancoNoServidor = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    port: 3306,
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'api_crud' // Ajuste o nome do banco de dados conforme necessário
});

// Conectar ao banco de dados
acessaBancoNoServidor.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Exportar a conexão para uso em outros módulos
module.exports = acessaBancoNoServidor;
