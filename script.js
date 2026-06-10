const URL_API = "https://6a29c6ebf59cb8f65f1d9998.mockapi.io/almoxarifado/Iventario";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");

async function listarMateriais() {
    try {
        const resposta = await fetch(URL_API);
        const materiais = await resposta.json();

        listaMateriais.innerHTML = "";

        materiais.forEach(material => {
            listaMateriais.innerHTML += `
                <tr>
                    <td>${material.nome}</td>
                    <td>${material.quantidade}</td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao listar materiais:", erro);
    }
}

async function cadastrarMaterial() {
    const nome = inputNome.value.trim();
    const quantidade = inputQuantidade.value;

    if (!nome || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoMaterial = {
        nome: nome,
        quantidade: Number(quantidade)
    };

    try {
        await fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoMaterial)
        });

        inputNome.value = "";
        inputQuantidade.value = "";

        listarMateriais();

    } catch (erro) {
        console.error("Erro ao cadastrar material:", erro);
    }
}

btnCadastrar.addEventListener("click", cadastrarMaterial);

listarMateriais();