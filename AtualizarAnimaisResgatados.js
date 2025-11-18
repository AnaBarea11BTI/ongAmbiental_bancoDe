function atualizarAnimal() {
    const id = document.getElementById("id").value;

    const dados = {
        especie: document.getElementById("especie").value,
        local_resgate: document.getElementById("local_resgate").value,
        estado_saude: document.getElementById("estado_saude").value,
        data_resgate: document.getElementById("data_resgate").value
    };

    fetch(`http://localhost:3000/animaisResgatados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(msg => alert(msg.message))
    .catch(() => alert("Erro ao atualizar animal."));
}
