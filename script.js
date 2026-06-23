const URL_API = "https://6a29c6ebf59cb8f65f1d9998.mockapi.io/almoxarifado/Iventario";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");
const totalItens = document.getElementById("total-itens");
const inputBusca = document.getElementById("input-busca");

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}
function atualizarDashboard(materiais) {

    totalItens.textContent =
        materiais.length;
}
async function listarMateriais(filtro = "") {

    try {

        const resposta = await fetch(URL_API);
        const materiais = await resposta.json();
        const materiaisFiltrados =
    materiais.filter(material =>
        material.nome
            .toLowerCase()
            .includes(
                filtro.toLowerCase()
            )
    );
        atualizarDashboard(materiaisFiltrados);
        
        listaMateriais.innerHTML = "";

        materiaisFiltrados.forEach((material, index) => {

        const classeEstoque =
        material.quantidade < 10
            ? "estoque-critico"
            : "";

            listaMateriais.innerHTML += `
            <tr class="${classeEstoque}">

                <td>${material.nome}</td>

                <td>${material.quantidade}</td>

                <td>
                    <input
                        type="number"
                        id="input-retirada"
                        placeholder="Qtd"
                        min="1"
                    >
                </td>

                <td>

                    <button
                        class="btn-baixar"
                        onclick="baixarMaterial(
                            ${index + 1},
                            ${material.quantidade},
                            this
                        )"
                    >
                        Baixar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirMaterial(${index + 1})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>
            `;
        });

    } catch (erro) {

    alert(
        "Erro ao carregar materiais."
    );

    console.error(
        "Erro ao listar materiais:",
        erro
    );
  }
}

async function cadastrarMaterial() {

    const nome = inputNome.value.trim();
    const quantidade = Number(inputQuantidade.value);

    if (!nome || !quantidade) {

        alert("Preencha todos os campos!");
        return;
    }

    const novoMaterial = {
        nome,
        quantidade
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

inputBusca.addEventListener(
    "input",
    () => {
        listarMateriais(
            inputBusca.value
        );
    }
);

        listarMateriais();

    catch (erro) {

    alert(
        "Erro ao carregar materiais."
    );

    console.error(
        "Erro ao listar materiais:",
        erro
    );
  }
 }

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

    alert(
        "Erro ao excluir material."
    );

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

    const linha =
        botao.closest("tr");

    const inputRetirada =
        linha.querySelector("input");

    const quantidadeRetirada =
        parseInt(inputRetirada.value);

    if (
        isNaN(quantidadeRetirada)
    ) {

        alert("Informe uma quantidade!");
        return;
    }

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
        estoqueAtual -
        quantidadeRetirada;

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

    alert(
        "Erro ao atualizar estoque."
    );

    console.error(
        "Erro ao atualizar estoque:",
        erro
    );
   }
 }

btnCadastrar.addEventListener(
    "click",
    cadastrarMaterial
);

listarMateriais();