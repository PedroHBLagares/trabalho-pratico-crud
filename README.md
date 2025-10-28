# Trabalho Prático - Back-end com CRUD e JSONServer

Este projeto é a segunda parte do trabalho prático, focado na criação de um back-end simulado com JSON Server para gerenciar uma API de **Destinos** de viagem.

O projeto implementa as funcionalidades de **CRUD** (Create, Read, Update, Delete) usando `fetch` no front-end para consumir a API.

## Aluno

* **Nome:** [SEU NOME COMPLETO AQUI]
* **Matrícula:** [SUA MATRÍCULA AQUI]

---

## Funcionalidades Implementadas

* **Listagem (Read):** A página inicial (`index.html`) busca e exibe todos os destinos da API, separando-os em "Destaques" (carrossel) e "Todos os Destinos" (grade).
* **Detalhes (Read):** A página `detalhes.html` busca e exibe as informações de um destino específico, incluindo suas atrações secundárias.
* **Criação (Create):** A página `cadastro.html` permite adicionar um novo destino através de um formulário.
* **Atualização (Update):** A página `cadastro.html` é reutilizada para edição. Ao clicar em "Editar" na página de detalhes, o formulário é preenchido com os dados do destino para alteração.
* **Exclusão (Delete):** A página `detalhes.html` possui um botão "Excluir" que remove o destino do banco de dados (após confirmação).

---

## Estrutura de Pastas

SeuTrabalho/ ├── db/ │ └── db.json (Banco de dados da API) ├── public/ │ ├── index.html (Página inicial) │ ├── detalhes.html (Página de detalhes do destino) │ ├── cadastro.html (Página de formulário Crate/Update) │ └── assets/ │ ├── css/ │ │ └── style.css │ └── js/ │ └── app.js (Lógica do CRUD e Fetch) │ └── img/ │ └── (imagens...) │ ├── .gitignore (Ignora o node_modules) ├── package.json (Configuração do projeto e JSON Server) └── README.md (Este arquivo)

## Estrutura de Dados (`db.json`)

A entidade principal é **`destinos`**. Cada destino segue a estrutura abaixo:

```json
{
  "destinos": [
    {
      "id": 1,
      "nome": "Paris",
      "descricao": "Capital francesa...",
      "conteudo": "Paris oferece museus...",
      "pais": "França",
      "destaque": false,
      "date": "2025-03-20",
      "imagem_principal": "assets/img/paris.jpg",
      "atracoes": [
        {
          "id": 1,
          "nome": "Torre Eiffel",
          "descricao": "Monumento símbolo...",
          "imagem": "assets/img/atracoes/torre_eiffel.jpg"
        }
      ]
    }
  ]
}
![alt text](<Captura de tela 2025-10-28 200319.png>)
![alt text](<Captura de tela 2025-10-28 200424.png>)
![alt text](<Captura de tela 2025-10-28 200447.png>)