// Define a URL base da nossa API (o JSON Server)
const API_URL = 'http://localhost:3000/destinos';

// Função principal que decide qual página carregar
document.addEventListener('DOMContentLoaded', () => {
    // pathname nos dá a página atual (ex: "/index.html", "/detalhes.html")
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/') {
        carregarPaginaHome();
    } else if (path.includes('detalhes.html')) {
        carregarPaginaDetalhes();
    } else if (path.includes('cadastro.html')) {
        carregarPaginaCadastro();
    }
});

// -----------------------------------------------------------------
// FUNÇÕES DA PÁGINA HOME (index.html) - (READ)
// -----------------------------------------------------------------

async function carregarPaginaHome() {
    try {
        // Faz o fetch (GET) para a API
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao carregar os dados da API.');
        
        const dados = await response.json();
        
        // Separa os dados e chama as funções de renderização
        const destaques = dados.filter(item => item.destaque === true);
        carregarCarrossel(destaques);
        carregarGridDestinos(dados);

    } catch (error) {
        console.error("Erro no fetch da home:", error);
        document.getElementById('grid-destinos-container').innerHTML = "<p>Erro ao carregar destinos.</p>";
    }
}

function carregarCarrossel(itensDestaque) {
    const carouselContainer = document.getElementById('carousel-inner-container');
    const carouselIndicadores = document.getElementById('carousel-indicadores');
    
    let carouselHTML = '';
    let indicadoresHTML = '';

    itensDestaque.forEach((item, index) => {
        const activeClass = (index === 0) ? 'active' : '';
        carouselHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${item.imagem_principal}" class="d-block w-100 carousel-img" alt="${item.nome}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${item.nome}</h5>
                    <p>${item.descricao}</p>
                    <a href="detalhes.html?id=${item.id}" class="btn btn-primary">Ver Detalhes</a>
                </div>
            </div>
        `;
        indicadoresHTML += `
            <button type="button" data-bs-target="#carouselDestaques" data-bs-slide-to="${index}" class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}"></button>
        `;
    });
    carouselContainer.innerHTML = carouselHTML;
    carouselIndicadores.innerHTML = indicadoresHTML;
}

function carregarGridDestinos(dados) {
    const gridContainer = document.getElementById('grid-destinos-container');
    let gridHTML = '';

    dados.forEach(item => {
        gridHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 card-custom">
                    <img src="${item.imagem_principal}" class="card-img-top" alt="${item.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${item.nome}</h5>
                        <p class="card-text">${item.descricao}</p>
                    </div>
                    <div class="card-footer">
                        <a href="detalhes.html?id=${item.id}" class="btn btn-primary-custom">Ver Detalhes</a>
                    </div>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = gridHTML;
}

// -----------------------------------------------------------------
// FUNÇÕES DA PÁGINA DETALHES (detalhes.html) - (READ + DELETE)
// -----------------------------------------------------------------

async function carregarPaginaDetalhes() {
    // 1. Pega o 'id' da URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
        exibirErroDetalhes("ID não encontrado na URL.");
        return;
    }

    // 2. Faz o fetch (GET) para a API buscando o item específico
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Destino não encontrado.');
        
        const item = await response.json();

        // 3. Carrega as seções da página
        carregarDetalhePrincipal(item);
        carregarAtracoesSecundarias(item.atracoes);
        carregarBotoesAcao(id);

    } catch (error) {
        console.error("Erro no fetch do detalhe:", error);
        exibirErroDetalhes(error.message);
    }
}

function carregarDetalhePrincipal(item) {
    const container = document.getElementById('detalhe-principal-container');
    const detalheHTML = `
        <div class="row">
            <div class="col-md-7">
                <img src="${item.imagem_principal}" class="img-fluid rounded shadow-sm" alt="${item.nome}">
            </div>
            <div class="col-md-5">
                <h1 class="display-5">${item.nome}</h1>
                <p class="lead">${item.descricao}</p>
                <hr>
                <p><strong>Conteúdo:</strong> ${item.conteudo}</p>
                <p><strong>País:</strong> ${item.pais}</p>
                <p><strong>Data:</strong> ${new Date(item.date).toLocaleDateString('pt-BR')}</p>
                <a href="index.html" class="btn btn-secondary-custom mt-3">Voltar para a lista</a>
            </div>
        </div>
    `;
    container.innerHTML = detalheHTML;
}

function carregarAtracoesSecundarias(atracoes) {
    const container = document.getElementById('atracoes-secundarias-container');
    if (!atracoes || atracoes.length === 0) {
        container.innerHTML = "<p>Não há atrações secundárias cadastradas.</p>";
        return;
    }
    let atracoesHTML = '';
    atracoes.forEach(atracao => {
        atracoesHTML += `
            <div class="col-md-4 mb-3">
                <div class="card h-100 card-custom-secundario">
                    <img src="${atracao.imagem}" class="card-img-top" alt="${atracao.nome}">
                    <div class="card-body">
                        <h6 class="card-title">${atracao.nome}</h6>
                        <p class="card-text small">${atracao.descricao}</p>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = atracoesHTML;
}

// (Função de Erro)
function exibirErroDetalhes(mensagem) {
    const container = document.getElementById('detalhe-principal-container');
    container.innerHTML = `<div class="alert alert-danger">${mensagem}</div>`;
    document.getElementById('atracoes-secundarias-container').style.display = 'none';
}


// --- CRUD: DELETE ---
function carregarBotoesAcao(id) {
    const container = document.getElementById('botoes-acao');
    container.innerHTML = `
        <a href="cadastro.html?id=${id}" class="btn btn-primary-custom">Editar Destino</a>
        
        <button id="btn-excluir" class="btn btn-danger">Excluir Destino</button>
    `;
    
    // Adiciona o listener para o botão de excluir
    document.getElementById('btn-excluir').addEventListener('click', () => {
        deletarDestino(id);
    });
}

async function deletarDestino(id) {
    // Pede confirmação
    if (!confirm('Tem certeza que deseja excluir este destino? Esta ação não pode ser desfeita.')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Falha ao excluir o destino.');

        // Sucesso!
        alert('Destino excluído com sucesso!');
        // Redireciona para a página inicial
        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erro ao deletar:", error);
        alert(error.message);
    }
}


// -----------------------------------------------------------------
// FUNÇÕES DA PÁGINA CADASTRO (cadastro.html) - (CREATE + UPDATE)
// -----------------------------------------------------------------

// Variável global para saber se estamos editando
let modoEdicao = false;
let idParaEditar = null;

async function carregarPaginaCadastro() {
    // 1. Verifica se tem um ID na URL (ex: ?id=3)
    const params = new URLSearchParams(window.location.search);
    idParaEditar = params.get('id');
    
    if (idParaEditar) {
        modoEdicao = true;
        document.getElementById('form-title').textContent = 'Editar Destino';
        
        // 2. Se tem ID, busca os dados da API (GET)
        try {
            const response = await fetch(`${API_URL}/${idParaEditar}`);
            if (!response.ok) throw new Error('Não foi possível carregar os dados para edição.');
            
            const item = await response.json();
            
            // 3. Preenche o formulário com os dados
            document.getElementById('nome').value = item.nome;
            document.getElementById('descricao').value = item.descricao;
            document.getElementById('conteudo').value = item.conteudo;
            document.getElementById('pais').value = item.pais;
            document.getElementById('imagem_principal').value = item.imagem_principal;
            document.getElementById('destaque').checked = item.destaque;
            
        } catch (error) {
            console.error("Erro ao carregar dados para edição:", error);
            alert(error.message);
        }
    }
    
    // 4. Adiciona o listener para o "submit" do formulário
    const form = document.getElementById('destino-form');
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // 1. Coleta os dados do formulário
    const dadosFormulario = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        conteudo: document.getElementById('conteudo').value,
        pais: document.getElementById('pais').value,
        imagem_principal: document.getElementById('imagem_principal').value,
        destaque: document.getElementById('destaque').checked,
        date: new Date().toISOString().split('T')[0], // Data de hoje
        atracoes: [] // No modo de criação, não adicionamos atrações
    };
    
    // Se for modo de edição, não sobrescreva as atrações existentes
    if (modoEdicao) {
       delete dadosFormulario.atracoes; 
       delete dadosFormulario.date; // Não atualiza a data
    }
    
    // Define o método (POST ou PUT) e a URL da API
    const method = modoEdicao ? 'PUT' : 'POST';
    const url = modoEdicao ? `${API_URL}/${idParaEditar}` : API_URL;

    // 2. Envia os dados para a API (Fetch)
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosFormulario),
        });

        if (!response.ok) throw new Error('Erro ao salvar o destino.');

        // 3. Sucesso!
        alert(`Destino ${modoEdicao ? 'atualizado' : 'criado'} com sucesso!`);
        // Redireciona para a página inicial
        window.location.href = 'index.html';

    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert(error.message);
    }
}