function buscarAnimais() {
    fetch("http://localhost:3000/animaisResgatados")
        .then(res => res.json())
        .then(animais => {
            const tabela = document.getElementById("tabelaAnimais");
            tabela.innerHTML = "";

            animais.forEach(animal => {
                tabela.innerHTML += `
                    <tr>
                        <td>${animal.ID}</td>
                        <td>${animal.especie}</td>
                        <td>${animal.local_resgate}</td>
                        <td>${animal.estado_saude}</td>
                        <td>${animal.data_resgate}</td>
                    </tr>
                `;
            });
        })
        .catch(() => alert("Erro ao buscar animais."));
}

buscarAnimais();
