function criarAnimal() {
    const especie = document.getElementById("especie").value;
    const local_resgate = document.getElementById("local_resgate").value;
    const estado_saude = document.getElementById("estado_saude").value;
    const data_resgate = document.getElementById("data_resgate").value;

    const dados = {
        especie,
        local_resgate,
        estado_saude,
        data_resgate
    };

    fetch("http://localhost:3000/animaisResgatados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(msg => alert(msg.message))
    .catch(err => alert("Erro ao cadastrar"));
}
