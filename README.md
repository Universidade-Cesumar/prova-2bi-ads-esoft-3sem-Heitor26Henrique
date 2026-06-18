# Controle de Almoxarifado

## Descrição

Sistema web desenvolvido para controle de estoque de materiais de almoxarifado utilizando HTML, CSS, JavaScript e MockAPI.

O projeto permite cadastrar materiais, listar os itens cadastrados, realizar baixa de estoque e excluir materiais do sistema.

---

## Funcionalidades

* Cadastro de materiais
* Listagem de materiais cadastrados
* Baixa de estoque
* Exclusão de materiais
* Validação de quantidade retirada
* Integração com MockAPI

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* MockAPI
* Git e GitHub

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

## Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/Universidade-Cesumar/prova-2bi-ads-esoft-3sem-Heitor26Henrique.git
```

2. Abra o projeto no VS Code.

3. Execute utilizando a extensão Live Server.

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

### Exclusão

O usuário pode excluir materiais mediante confirmação.

---

## Autor

Heitor Henrique

Curso: Análise e Desenvolvimento de Sistemas

Universidade Cesumar
