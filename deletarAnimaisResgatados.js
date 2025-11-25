function formatarData(dataBruta) {
    if (!dataBruta) return "";
    const data = new Date(dataBruta);
    return data.toISOString().substring(0, 10); 
}

function carregarTabela() {
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
                        <td>
                            <button onclick="deletar(${animal.ID})">Deletar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function deletar(id) {
    if (!confirm("Deseja realmente deletar este animal?")) return;

    fetch(`http://localhost:3000/animaisResgatados/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(msg => {
        alert(msg.message);
        carregarTabela(); 
    });
}

carregarTabela();
