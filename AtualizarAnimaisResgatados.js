// AtualizarAnimaisResgatados.js (versão com logs e verificação)
let idSelecionado = null;

function carregarTabela() {
    fetch("http://localhost:3000/animaisResgatados")
        .then(res => res.json())
        .then(animais => {
            const tabela = document.getElementById("tabelaAnimais");
            tabela.innerHTML = "";

            animais.forEach(animal => {
                // Já formatando a data para YYYY-MM-DD simples
                let data = animal.data_resgate ? new Date(animal.data_resgate).toISOString().substring(0,10) : "";

                tabela.innerHTML += `
                    <tr id="linha-${animal.ID}">
                        <td>${animal.ID}</td>
                        <td>${animal.especie ?? ""}</td>
                        <td>${animal.local_resgate ?? ""}</td>
                        <td>${animal.estado_saude ?? ""}</td>
                        <td>${data}</td>
                        <td><button onclick="editarLinha(${animal.ID})">Editar</button></td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error("Erro ao carregar animais:", err);
            alert("Erro ao carregar animais. Veja o console do navegador.");
        });
}

function editarLinha(id) {
    const linha = document.getElementById(`linha-${id}`);
    if (!linha) return alert("Linha não encontrada.");

    const colunas = linha.children;

    const especie = colunas[1].innerText;
    const local = colunas[2].innerText;
    const estado = colunas[3].innerText;
    const data = colunas[4].innerText;

    idSelecionado = id;

    linha.innerHTML = `
        <td>${id}</td>
        <td><input id="edit-especie-${id}" value="${escapeHtml(especie)}"></td>
        <td><input id="edit-local-${id}" value="${escapeHtml(local)}"></td>
        <td><input id="edit-estado-${id}" value="${escapeHtml(estado)}"></td>
        <td><input type="date" id="edit-data-${id}" value="${data}"></td>
        <td>
            <button onclick="salvar(${id})">Salvar</button>
            <button onclick="carregarTabela()">Cancelar</button>
        </td>
    `;
}

function escapeHtml(text) {
    if (text === null || text === undefined) return "";
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function salvar(id) {
    const especie = document.getElementById(`edit-especie-${id}`).value;
    const local = document.getElementById(`edit-local-${id}`).value;
    const estado = document.getElementById(`edit-estado-${id}`).value;
    const data = document.getElementById(`edit-data-${id}`).value;

    const dados = { especie, local_resgate: local, estado_saude: estado, data_resgate: data };

    console.log("Enviando PUT para id", id, "com", dados);

    fetch(`http://localhost:3000/animaisResgatados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(async res => {
        const text = await res.text().catch(()=>null);
        let json;
        try { json = text ? JSON.parse(text) : null; } catch(e){ json = text; }
        console.log("Resposta do servidor (raw):", res.status, text, json);
        if (!res.ok) throw new Error("Resposta do servidor com status " + res.status);
        alert((json && json.message) ? json.message : "Atualizado com sucesso");
        carregarTabela();
    })
    .catch(err => {
        console.error("Erro no PUT:", err);
        alert("Erro ao atualizar — veja o console do navegador e o terminal do servidor.");
    });
}

carregarTabela();
