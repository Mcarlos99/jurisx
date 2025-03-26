/**
 * JurisX - Script para o formulário de cadastro de advogados
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const progressBar = document.getElementById('progress-bar');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Botões de navegação
    const btnStep1 = document.getElementById('btn-step1');
    const btnBackStep1 = document.getElementById('btn-back-step1');
    const btnStep2 = document.getElementById('btn-step2');
    const btnBackStep2 = document.getElementById('btn-back-step2');
    const btnStep3 = document.getElementById('btn-step3');
    const btnBackStep3 = document.getElementById('btn-back-step3');
    const btnSubmit = document.getElementById('btn-submit');
    
    // Tipo de atuação e campos do escritório
    const tipoAtuacao = document.getElementById('tipo_atuacao');
    const escritorioInfo = document.getElementById('escritorio-info');
    
    // Função para atualizar a barra de progresso
    function updateProgressBar(step) {
        // Ajusta a largura da barra de progresso de acordo com o passo atual
        const progressWidth = ((step - 1) / (progressSteps.length - 1)) * 100;
        progressBar.style.width = `${progressWidth}%`;
        
        // Atualiza as classes dos passos
        progressSteps.forEach((stepElement, index) => {
            if (index + 1 < step) {
                stepElement.classList.add('complete');
                stepElement.classList.remove('active');
            } else if (index + 1 === step) {
                stepElement.classList.add('active');
                stepElement.classList.remove('complete');
            } else {
                stepElement.classList.remove('active', 'complete');
            }
        });
    }
    
    // Função para mostrar um passo do formulário
    function showStep(step) {
        formSteps.forEach((formStep, index) => {
            if (index + 1 === step) {
                formStep.classList.add('active');
            } else {
                formStep.classList.remove('active');
            }
        });
        
        updateProgressBar(step);
        window.scrollTo(0, 0);
    }
    
    // Função para validar os campos do passo atual
    function validateStep(step) {
        let isValid = true;
        const currentStep = document.getElementById(`step${step}-content`);
        const requiredFields = currentStep.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            // Remove qualquer estilo de erro anterior
            field.style.borderColor = '';
            
            // Verifica se o campo está vazio ou não foi selecionado
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
            
            // Validações específicas (como CPF, e-mail, etc.)
            if (field.id === 'email' && field.value.trim() && !validateEmail(field.value)) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
            
            if (field.id === 'cpf' && field.value.trim() && !validateCPF(field.value)) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
            
            if (field.id === 'senha' && field.value.trim() && !validatePassword(field.value)) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
            
            if (field.id === 'confirmar_senha' && field.value !== document.getElementById('senha').value) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Função para preencher o resumo na etapa final
    function fillSummary() {
        document.getElementById('resumo-nome').textContent = document.getElementById('nome').value;
        document.getElementById('resumo-cpf').textContent = document.getElementById('cpf').value;
        document.getElementById('resumo-data-nascimento').textContent = formatDate(document.getElementById('data_nascimento').value);
        document.getElementById('resumo-oab').textContent = document.getElementById('numero_oab').value;
        document.getElementById('resumo-seccional').textContent = document.getElementById('seccional').value;
        document.getElementById('resumo-atuacao').textContent = document.getElementById('tipo_atuacao').options[document.getElementById('tipo_atuacao').selectedIndex].text;
        document.getElementById('resumo-email').textContent = document.getElementById('email').value;
        document.getElementById('resumo-telefone').textContent = document.getElementById('telefone').value;
    }
    
    // Funções de validação
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateCPF(cpf) {
        // Implementação básica - em produção usar uma validação mais robusta
        cpf = cpf.replace(/[^\d]/g, '');
        return cpf.length === 11;
    }
    
    function validatePassword(password) {
        // Pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSymbols;
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    
    // Eventos
    
    // Avançar para o passo 2
    btnStep1.addEventListener('click', function() {
        if (validateStep(1)) {
            showStep(2);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    });
    
    // Voltar para o passo 1
    btnBackStep1.addEventListener('click', function() {
        showStep(1);
    });
    
    // Avançar para o passo 3
    btnStep2.addEventListener('click', function() {
        if (validateStep(2)) {
            showStep(3);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    });
    
    // Voltar para o passo 2
    btnBackStep2.addEventListener('click', function() {
        showStep(2);
    });
    
    // Avançar para o passo 4
    btnStep3.addEventListener('click', function() {
        if (validateStep(3)) {
            fillSummary();
            showStep(4);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    });
    
    // Voltar para o passo 3
    btnBackStep3.addEventListener('click', function() {
        showStep(3);
    });
    
    // Exibir/ocultar campos do escritório com base no tipo de atuação
    tipoAtuacao.addEventListener('change', function() {
        const value = this.value;
        if (value === 'Escritório Próprio' || value === 'Associado' || value === 'Sociedade') {
            escritorioInfo.style.display = 'flex';
        } else {
            escritorioInfo.style.display = 'none';
        }
    });
    
    // Submeter o formulário
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui seria feita a submissão dos dados para o servidor
        // Em um ambiente real, você usaria uma requisição AJAX/fetch
        
        alert('Cadastro realizado com sucesso! Verifique seu e-mail para ativar sua conta.');
        window.location.href = 'login.html'; // Redireciona para a página de login
    });
    
    // Máscara para os campos CPF e telefone
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 9) {
                this.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                this.value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
            } else if (value.length > 3) {
                this.value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
            } else {
                this.value = value;
            }
        });
    }
    
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 10) {
                this.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                this.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                this.value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                this.value = value;
            }
        });
    }
    
    // Inicializa a primeira etapa
    updateProgressBar(1);
});