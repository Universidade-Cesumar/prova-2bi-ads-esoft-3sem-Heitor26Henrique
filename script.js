const URL_API = "https://6a29c6ebf59cb8f65f1d9998.mockapi.io/almoxarifado/Iventario";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}
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

        <td>
            <input
                type="number"
                id="input-retirada"
                placeholder="Qtd"
            >
        </td>

        <td>

            <button
    class="btn-baixar"
    onclick="baixarMaterial(
        '${material.id}',
        ${material.quantidade},
        this
    )"
>    
            </button>

            <button
    class="btn-excluir"
    onclick="excluirMaterial('${material.id}')"
>
    Excluir
            </button>

        </td>

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

async function excluirMaterial(id) {

    const confirmar =
        confirm("Deseja excluir este material?");

    if (!confirmar) {
        return;
    }

    try {

        await fetch(`${URL_API}/${id}`, {
            method: "DELETE"
        });

        listarMateriais();

    } catch (erro) {

        console.error(
            "Erro ao excluir material:",
            erro
        );
    }
}
async function baixarMaterial(
    id,
    estoqueAtual,
    botao
) {

    const inputRetirada =
        botao.parentElement
        .parentElement
        .querySelector("#input-retirada");

    const quantidadeRetirada =
        Number(inputRetirada.value);

    const retiradaValida =
        validarRetirada(
            estoqueAtual,
            quantidadeRetirada
        );

    if (!retiradaValida) {

        alert("Quantidade inválida!");
        return;
    }

    const novoEstoque =
        estoqueAtual - quantidadeRetirada;

    try {

        await fetch(`${URL_API}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                quantidade: novoEstoque
            })
        });

        listarMateriais();

    } catch (erro) {

        console.error(
            "Erro ao atualizar estoque:",
            erro
        );
    }
}