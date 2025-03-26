/**
 * JurisX - Script para a página de gerenciamento de clientes (Parte 1)
 * Funções de inicialização e carregamento de componentes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Carrega os componentes da página
    loadComponents();
    
    // Inicializa os event listeners
    initEventListeners();
});

/**
 * Carrega os componentes da página
 */
async function loadComponents() {
    try {
        // Em uma aplicação real, esses componentes seriam carregados via AJAX
        // Aqui estamos simulando esse carregamento apenas para demonstração
        
        // Lista de clientes
        document.getElementById('clients-list-container').innerHTML = `
            <div class="clients-list-container">
                <div class="clients-header">
                    <div class="clients-title">Meus Clientes</div>
                    <div class="clients-count">43 clientes</div>
                </div>
                
                <div class="search-box">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" placeholder="Buscar cliente...">
                </div>
                
                <div class="filter-tabs">
                    <div class="filter-tab active">Todos</div>
                    <div class="filter-tab">Pessoa Física</div>
                    <div class="filter-tab">Pessoa Jurídica</div>
                    <div class="filter-tab">Recentes</div>
                </div>
                
                <ul class="clients-list">
                    <li class="client-item active" data-id="1">
                        <div class="client-avatar">MS</div>
                        <div class="client-info">
                            <div class="client-name">Maria Santos</div>
                            <div class="client-type">Pessoa Física</div>
                        </div>
                        <span class="client-status status-active">Ativo</span>
                    </li>
                    
                    <li class="client-item" data-id="2">
                        <div class="client-avatar">JO</div>
                        <div class="client-info">
                            <div class="client-name">João Oliveira</div>
                            <div class="client-type">Pessoa Física</div>
                        </div>
                        <span class="client-status status-active">Ativo</span>
                    </li>
                    
                    <li class="client-item" data-id="3">
                        <div class="client-avatar">EA</div>
                        <div class="client-info">
                            <div class="client-name">Empresa ABC Ltda</div>
                            <div class="client-type">Pessoa Jurídica</div>
                        </div>
                        <span class="client-status status-active">Ativo</span>
                    </li>
                </ul>
            </div>
        `;
        
        // Detalhes do cliente
        document.getElementById('client-details-container').innerHTML = `
            <div class="client-details">
                <div class="details-header">
                    <div class="client-profile">
                        <div class="client-profile-avatar">MS</div>
                        <div class="client-profile-info">
                            <h2>Maria Santos</h2>
                            <p>Pessoa Física</p>
                        </div>
                    </div>
                    
                    <div class="client-actions">
                        <button class="action-btn" title="Enviar mensagem">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button class="action-btn" title="Editar cliente" id="btn-edit-client">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" title="Mais opções">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                
                <div class="client-tabs">
                    <div class="client-tab active">Informações</div>
                    <div class="client-tab">Processos</div>
                    <div class="client-tab">Documentos</div>
                    <div class="client-tab">Financeiro</div>
                    <div class="client-tab">Histórico</div>
                </div>
                
                <div class="tab-content">
                    <!-- Conteúdo da aba ativa será carregado aqui -->
                </div>
            </div>
        `;
        
        // Modal de cliente
        document.getElementById('client-modal-container').innerHTML = `
            <div class="modal-overlay" id="client-modal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title" id="modal-title">Adicionar Novo Cliente</h2>
                        <button class="modal-close" id="modal-close">×</button>
                    </div>
                    
                    <form id="client-form">
                        <div class="modal-body">
                            <!-- Conteúdo do formulário do modal -->
                        </div>
                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline" id="btn-cancel">Cancelar</button>
                            <button type="submit" class="btn btn-primary" id="btn-save">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Carrega os detalhes do cliente inicial (primeiro da lista)
        loadClientDetails(1);
        
    } catch (error) {
        console.error('Erro ao carregar componentes:', error);
    }
}

// Continua na Parte 2...
/**
 * JurisX - Script para a página de gerenciamento de clientes (Parte 2)
 * Inicialização de event listeners
 */

/**
 * Inicializa os event listeners da página
 */
function initEventListeners() {
    // Clique nos itens da lista de clientes
    const clientList = document.querySelector('.clients-list');
    if (clientList) {
        clientList.addEventListener('click', function(e) {
            const clientItem = e.target.closest('.client-item');
            if (clientItem) {
                // Remove a classe active de todos os itens
                document.querySelectorAll('.client-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Adiciona a classe active ao item clicado
                clientItem.classList.add('active');
                
                // Carrega os detalhes do cliente
                const clientId = clientItem.getAttribute('data-id');
                loadClientDetails(clientId);
            }
        });
    }
    
    // Clique nas abas de detalhes do cliente
    const clientTabs = document.querySelector('.client-tabs');
    if (clientTabs) {
        clientTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('client-tab')) {
                // Remove a classe active de todas as abas
                document.querySelectorAll('.client-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Adiciona a classe active à aba clicada
                e.target.classList.add('active');
                
                // Carrega o conteúdo da aba
                const tabName = e.target.textContent.trim().toLowerCase();
                loadTabContent(tabName);
            }
        });
    }
    
    // Botão para adicionar novo cliente
    const btnNovoCliente = document.getElementById('btn-novo-cliente');
    if (btnNovoCliente) {
        btnNovoCliente.addEventListener('click', function() {
            openClientModal('add');
        });
    }
    
    // Botão para editar cliente
    const btnEditClient = document.getElementById('btn-edit-client');
    if (btnEditClient) {
        btnEditClient.addEventListener('click', function() {
            const clientId = document.querySelector('.client-item.active').getAttribute('data-id');
            openClientModal('edit', clientId);
        });
    }
    
    // Botões para fechar o modal
    const modalClose = document.getElementById('modal-close');
    const btnCancel = document.getElementById('btn-cancel');
    if (modalClose && btnCancel) {
        modalClose.addEventListener('click', closeClientModal);
        btnCancel.addEventListener('click', closeClientModal);
    }
    
    // Alternar entre campos de pessoa física e jurídica no modal
    const clientType = document.getElementById('client-type');
    if (clientType) {
        clientType.addEventListener('change', function() {
            const fisicaFields = document.getElementById('fisica-fields');
            const juridicaFields = document.getElementById('juridica-fields');
            
            if (this.value === 'fisica') {
                fisicaFields.style.display = 'block';
                juridicaFields.style.display = 'none';
            } else if (this.value === 'juridica') {
                fisicaFields.style.display = 'none';
                juridicaFields.style.display = 'block';
            }
        });
    }
    
    // Submissão do formulário de cliente
    const clientForm = document.getElementById('client-form');
    if (clientForm) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui seria feita a validação e o envio dos dados para o servidor
            
            // Fechamos o modal após o envio
            closeClientModal();
            
            // Exibimos uma mensagem de sucesso
            alert('Cliente salvo com sucesso!');
        });
    }
    
    // Busca de clientes
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const clientItems = document.querySelectorAll('.client-item');
            
            clientItems.forEach(item => {
                const clientName = item.querySelector('.client-name').textContent.toLowerCase();
                const clientType = item.querySelector('.client-type').textContent.toLowerCase();
                
                if (clientName.includes(searchTerm) || clientType.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Filtros de clientes
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove a classe active de todos os filtros
                filterTabs.forEach(t => t.classList.remove('active'));
                
                // Adiciona a classe active ao filtro clicado
                this.classList.add('active');
                
                // Filtra os clientes
                const filterType = this.textContent.trim();
                filterClients(filterType);
            });
        });
    }
}

/**
 * Filtra os clientes com base no tipo selecionado
 * @param {string} filterType - Tipo de filtro
 */
function filterClients(filterType) {
    const clientItems = document.querySelectorAll('.client-item');
    
    clientItems.forEach(item => {
        const clientType = item.querySelector('.client-type').textContent.trim();
        
        if (filterType === 'Todos') {
            item.style.display = 'flex';
        } else if (filterType === 'Pessoa Física' && clientType === 'Pessoa Física') {
            item.style.display = 'flex';
        } else if (filterType === 'Pessoa Jurídica' && clientType === 'Pessoa Jurídica') {
            item.style.display = 'flex';
        } else if (filterType === 'Recentes') {
            // Aqui poderia haver uma lógica para filtrar clientes recentes
            // Neste exemplo, mostraremos todos
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Continua na Parte 3...
/**
 * JurisX - Script para a página de gerenciamento de clientes (Parte 3)
 * Funções auxiliares para manipulação de dados e interface
 */

/**
 * Carrega os detalhes de um cliente
 * @param {string|number} clientId - ID do cliente
 */
function loadClientDetails(clientId) {
    // Em uma aplicação real, faria uma requisição ao servidor para obter os detalhes do cliente
    // Aqui, apenas simulamos os dados para demonstração
    
    // Atualiza o cabeçalho do cliente
    const detailsHeader = document.querySelector('.details-header');
    if (detailsHeader) {
        // Aqui atualizaríamos os dados do cabeçalho com as informações do cliente
        // Neste exemplo, mantemos os dados padrão
    }
    
    // Carrega o conteúdo da aba ativa (por padrão, "Informações")
    loadTabContent('informações');
}

/**
 * Carrega o conteúdo de uma aba específica
 * @param {string} tabName - Nome da aba
 */
function loadTabContent(tabName) {
    const tabContent = document.querySelector('.tab-content');
    if (!tabContent) return;
    
    // Em uma aplicação real, faria uma requisição ao servidor para obter o conteúdo da aba
    // Aqui, apenas simulamos os dados para demonstração
    
    switch(tabName) {
        case 'informações':
            tabContent.innerHTML = `
                <div class="info-section">
                    <h3 class="section-title">Dados Pessoais</h3>
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Nome Completo</div>
                            <div class="info-value">Maria Santos Silva</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">CPF</div>
                            <div class="info-value">123.456.789-00</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">RG</div>
                            <div class="info-value">24.456.789-X</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Data de Nascimento</div>
                            <div class="info-value">15/05/1985</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Estado Civil</div>
                            <div class="info-value">Casada</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Profissão</div>
                            <div class="info-value">Engenheira Civil</div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <h3 class="section-title">Contato</h3>
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">E-mail</div>
                            <div class="info-value">maria.santos@email.com</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Telefone Celular</div>
                            <div class="info-value">(11) 98765-4321</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Telefone Fixo</div>
                            <div class="info-value">(11) 3456-7890</div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <h3 class="section-title">Endereço</h3>
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Logradouro</div>
                            <div class="info-value">Av. Paulista</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Número</div>
                            <div class="info-value">1000</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Complemento</div>
                            <div class="info-value">Apto 105</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Bairro</div>
                            <div class="info-value">Bela Vista</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Cidade</div>
                            <div class="info-value">São Paulo</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">Estado</div>
                            <div class="info-value">SP</div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-label">CEP</div>
                            <div class="info-value">01311-000</div>
                        </div>
                    </div>
                </div>
                
                <div class="info-section">
                    <h3 class="section-title">Processos Recentes</h3>
                    
                    <ul class="process-list-compact">
                        <li class="process-item-compact">
                            <div class="process-item-header">
                                <div class="process-number">0012345-67.2023.8.26.0100</div>
                                <div class="process-type tag-civil">Civil</div>
                            </div>
                            <div class="process-description">Indenização por Danos Morais</div>
                        </li>
                        
                        <li class="process-item-compact">
                            <div class="process-item-header">
                                <div class="process-number">0098765-43.2022.8.26.0100</div>
                                <div class="process-type tag-civil">Civil</div>
                            </div>
                            <div class="process-description">Execução de Título Extrajudicial</div>
                        </li>
                    </ul>
                </div>
            `;
            break;
            
        case 'processos':
            tabContent.innerHTML = `
                <div class="info-section">
                    <h3 class="section-title">Processos Ativos</h3>
                    
                    <ul class="process-list-compact">
                        <li class="process-item-compact">
                            <div class="process-item-header">
                                <div class="process-number">0012345-67.2023.8.26.0100</div>
                                <div class="process-type tag-civil">Civil</div>
                            </div>
                            <div class="process-description">Indenização por Danos Morais</div>
                        </li>
                        
                        <li class="process-item-compact">
                            <div class="process-item-header">
                                <div class="process-number">0098765-43.2022.8.26.0100</div>
                                <div class="process-type tag-civil">Civil</div>
                            </div>
                            <div class="process-description">Execução de Título Extrajudicial</div>
                        </li>
                    </ul>
                </div>
                
                <div class="info-section">
                    <h3 class="section-title">Processos Concluídos</h3>
                    
                    <ul class="process-list-compact">
                        <li class="process-item-compact">
                            <div class="process-item-header">
                                <div class="process-number">0054321-89.2021.8.26.0100</div>
                                <div class="process-type tag-civil">Civil</div>
                            </div>
                            <div class="process-description">Despejo por Falta de Pagamento</div>
                        </li>
                    </ul>
                </div>
            `;
            break;
            
        case 'documentos':
        case 'financeiro':
        case 'histórico':
            tabContent.innerHTML = `<p>Conteúdo da aba "${tabName}" em desenvolvimento.</p>`;
            break;
            
        default:
            tabContent.innerHTML = `<p>Conteúdo da aba "${tabName}" não disponível.</p>`;
    }
}

/**
 * Abre o modal de cliente para adição ou edição
 * @param {string} mode - Modo de operação ('add' ou 'edit')
 * @param {string|number} clientId - ID do cliente (apenas para edição)
 */
function openClientModal(mode, clientId) {
    const modal = document.getElementById('client-modal');
    const modalTitle = document.getElementById('modal-title');
    
    if (mode === 'add') {
        modalTitle.textContent = 'Adicionar Novo Cliente';
        // Limpa o formulário
        document.getElementById('client-form').reset();
    } else if (mode === 'edit') {
        modalTitle.textContent = 'Editar Cliente';
        // Aqui carregaríamos os dados do cliente no formulário
        // Em uma aplicação real, faríamos uma requisição ao servidor
    }
    
    // Exibe o modal
    modal.style.display = 'flex';
    
    // Função para fechar o modal ao clicar fora dele
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeClientModal();
        }
    });
}

/**
 * Fecha o modal de cliente
 */
function closeClientModal() {
    const modal = document.getElementById('client-modal');
    modal.style.display = 'none';
}

/**
 * Formata o nome do cliente para exibir suas iniciais no avatar
 * @param {string} name - Nome completo do cliente
 * @returns {string} - Iniciais do nome
 */
function getInitials(name) {
    if (!name) return '';
    
    const parts = name.split(' ').filter(part => part.length > 0);
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Formata o CPF para exibição
 * @param {string} cpf - CPF sem formatação
 * @returns {string} - CPF formatado
 */
function formatCPF(cpf) {
    if (!cpf) return '';
    
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return cpf;
    
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata o CNPJ para exibição
 * @param {string} cnpj - CNPJ sem formatação
 * @returns {string} - CNPJ formatado
 */
function formatCNPJ(cnpj) {
    if (!cnpj) return '';
    
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return cnpj;
    
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/**
 * Formata o telefone para exibição
 * @param {string} phone - Telefone sem formatação
 * @returns {string} - Telefone formatado
 */
function formatPhone(phone) {
    if (!phone) return '';
    
    phone = phone.replace(/\D/g, '');
    
    if (phone.length === 11) {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 10) {
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
}

/**
 * Formata o CEP para exibição
 * @param {string} cep - CEP sem formatação
 * @returns {string} - CEP formatado
 */
function formatCEP(cep) {
    if (!cep) return '';
    
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) return cep;
    
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}