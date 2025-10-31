async function listarVoluntarios() {
    const response = await fetch('http://localhost:3000/voluntarios');
    const voluntarios = await response.json();

    let html = '<table border="1"><tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Cidade</th></tr>';
    voluntarios.forEach(v => {
        html += `<tr><td>${v.nome}</td><td>${v.email}</td><td>${v.telefone}</td><td>${v.cidade}</td></tr>`;
    });
    html += '</table>';

    document.getElementById('resultado').innerHTML = html;
}
