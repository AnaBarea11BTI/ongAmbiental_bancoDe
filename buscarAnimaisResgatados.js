function formatarData(dataBruta) {
    if (!dataBruta) return "";
    const data = new Date(dataBruta);
    return data.toISOString().substring(0, 10); 
}

function carregarAnimais() {
    fetch("http://localhost:3000/animaisResgatados")
        .then(res => res.json())
        .then(animais => {
            const tabela = document.getElementById("tabelaAnimais");
            tabela.innerHTML = "";

            animais.forEach(animal => {
                const dataFormatada = formatarData(animal.data_resgate);

                tabela.innerHTML += `
                    <tr>
                        <td>${animal.ID}</td>
                        <td>${animal.especie}</td>
                        <td>${animal.local_resgate}</td>
                        <td>${animal.estado_saude}</td>
                        <td>${dataFormatada}</td>
                    </tr>
                `;
            });
        });
}

function editar(id) {
    window.location.href = `AtualizarAnimaisResgatados.html?id=${id}`;
}

function deletar(id) {
    window.location.href = `deletarAnimaisResgatados.html?id=${id}`;
}

carregarAnimais();
