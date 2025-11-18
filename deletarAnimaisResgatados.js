function deletarAnimal() {
    const id = document.getElementById("id").value;

    fetch(`http://localhost:3000/animaisResgatados/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(msg => alert(msg.message))
    .catch(() => alert("Erro ao deletar animal."));
}
