# Trabalho Prático 06 - Semanas 11 e 12

Nesta etapa, você irá evoluir o projeto anterior e montar um ambiente de desenvolvimento mais completo, típico de projetos profissionais. Nesse processo, vamos utilizar um **servidor backend simulado** com o JSON Server que fornece uma APIs RESTful a partir de um arquivo JSON.

Para esse projeto, além de mudarmos o JSON para o JSON Server, vamos permitir o cadastro e alteração de dados da entidade principal (CRUD).

## Informações do trabalho

* **Nome:** [Pedro Henrique Barbosa Lagares]
* **Matrícula:** [904777]
* **Breve descrição sobre seu projeto:** API para um site de **Destinos** de viagem, permitindo a listagem, visualização, criação, edição e exclusão de destinos (CRUD).

---
### Imprimir os testes da API com Postman ou similar

**<< COLOQUE A IMAGEM (GET) OBTENHA AQUI >>**
![alt text](<Captura de tela 2025-10-28 205340.png>)
![alt text](<Captura de tela 2025-10-28 205354.png>)
![alt text](<Captura de tela 2025-10-28 205405.png>)

**<< COLOQUE A IMAGEM (POST) POST AQUI >>**
![alt text](<Captura de tela 2025-10-28 205708.png>)

**<< COLOQUE A IMAGEM (PUT) PUT AQUI >>**
![alt text](<Captura de tela 2025-10-28 205809.png>)

**<< COLOQUE A IMAGEM (DELETE) DELETE AQUI >>**
![alt text](<Captura de tela 2025-10-28 205854.png>)

---
### Imprimir da aba NETWORK com requisições Fetch/XHR POST e GET

**<< A IMAGEM (NETWORK) AQUI >>**
![alt text](<Captura de tela 2025-10-28 210045.png>)
---

## Prints da Aplicação (Site Front-End)

**<< A IMAGEM (HOME) AQUI >>**
![alt text](<Captura de tela 2025-10-28 200319.png>)

**<< A IMAGEM (DETALHES) AQUI >>**
![alt text](<Captura de tela 2025-10-28 200424.png>)

**<< A IMAGEM (CADASTRO) AQUI >>**
![alt text](<Captura de tela 2025-10-28 200447.png>)

---

## Estrutura de Pastas (Como solicitado)
SeuTrabalho/ ├── db/ │ └── db.json (Banco de dados da API) ├── public/ │ ├── index.html (Página inicial) │ ├── detalhes.html (Página de detalhes do destino) │ ├── cadastro.html (Página de formulário Crate/Update) │ └── assets/ │ ├── css/ │ │ └── style.css │ └── js/ │ └── app.js (Lógica do CRUD e Fetch) │ └── img/ │ └── (imagens...) │ ├── .gitignore (Ignora o node_modules) ├── package.json (Configuração do projeto e JSON Server) └── README.md (Este arquivo)
---

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

## Apresentação Dinâmica de Dados - Gráfico

Para as Semanas 13 e 14, foi implementada uma página de estatísticas que exibe um gráfico de barras com a quantidade de destinos cadastrados por país. A funcionalidade utiliza a biblioteca **Chart.js** para renderizar os dados consumidos da API.

**Print da Página de Estatísticas (`estatisticas.html`)**
![alt text](<Captura de tela 2025-11-09 165104.png>)