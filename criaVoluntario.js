document.getElementById('formVoluntario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cidade = document.getElementById('cidade').value;

    const response = await fetch('http://localhost:3000/voluntario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone, cidade })
    });

    const data = await response.json();
    document.getElementById('message').textContent = data.message || data.error;
});
