# Controle de Almoxarifado

## Link do Projeto

GitHub Pages:https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-Heitor26Henrique/

Repositório GitHub:https://github.com/Universidade-Cesumar/prova-2bi-ads-esoft-3sem-Heitor26Henrique

---

## Descrição

Sistema web desenvolvido para controle de estoque de materiais de almoxarifado utilizando HTML, CSS, JavaScript e MockAPI.

O projeto permite cadastrar materiais, listar os itens cadastrados, realizar baixa de estoque, excluir materiais, pesquisar produtos e visualizar informações do estoque através de um dashboard.

---

## Funcionalidades

* Cadastro de materiais
* Listagem de materiais cadastrados
* Baixa de estoque
* Exclusão de materiais
* Pesquisa de materiais
* Dashboard com total de itens cadastrados
* Destaque visual para estoque crítico (quantidade menor que 10)
* Validação de quantidade retirada
* Tratamento de erros nas requisições da API
* Integração com MockAPI

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* MockAPI
* Git
* GitHub
* GitHub Pages

---

## Estrutura do Projeto

```text
SprintUM/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## API Utilizada

Endpoint:

```text
https://6a29c6ebf59cb8f65f1d9998.mockapi.io/almoxarifado/Iventario
```

Métodos utilizados:

* GET
* POST
* PUT
* DELETE

---

## Regras de Negócio

### Cadastro

O sistema permite cadastrar novos materiais informando:

* Nome
* Quantidade

### Baixa de Estoque

A quantidade retirada:

* Não pode ser menor ou igual a zero;
* Não pode ser maior que a quantidade disponível em estoque.

### Estoque Crítico

Materiais com quantidade inferior a 10 unidades recebem destaque visual para facilitar o controle do estoque.

### Exclusão

O usuário pode excluir materiais mediante confirmação.

---

## Autor

Heitor Henrique

Curso: Análise e Desenvolvimento de Sistemas

Universidade Cesumar
