const rua =  document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cepInput = document.getElementById('cep');

function limpa_campos_endereco() {
    rua.value = "";
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
}

async function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
    const cep = valor.replace(/\D/g, '');
    
    // Expressão regular para validar o CEP.
    const validacep = /^[0-9]{8}$/;

    // 1. Validação de formato e ausência de valor
    if (cep === "") {
        limpa_campos_endereco();
        return; // Sai da função se o CEP estiver vazio
    }

    if (!validacep.test(cep)) {
        limpa_campos_endereco();
        alert("Formato de CEP inválido.");
        return; // Sai da função se o formato for inválido
    }

    // 2. Preenche os campos com "..." enquanto consulta
    rua.value = "..."
    bairro.value = "..."
    cidade.value = "..."
    estado.value = "..."

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        // 3. Usa a API Fetch para fazer a requisição HTTP
        const response = await fetch(url);
        
        // Verifica se a requisição foi bem-sucedida (status 200-299)
        if (!response.ok) {
            throw new Error('Erro na requisição do ViaCEP: ' + response.status);
        }

        const data = await response.json();

        // 4. Verifica se o CEP foi encontrado na resposta JSON
        if (data.erro) {
            limpa_campos_endereco();
            alert("CEP não encontrado.");
        } else {
            // 5. Atualiza os campos com os valores
            // ViaCEP usa 'logradouro' para rua
            rua.value = data.logradouro;
            bairro.value = data.bairro;
            // ViaCEP usa 'localidade' para cidade e 'uf' para estado
            cidade.value = data.localidade;
            estado.value = data.uf;
        }

    } catch (error) {
        // 6. Trata erros de rede ou outros problemas
        console.error("Erro ao buscar o CEP:", error);
        limpa_campos_endereco();
        alert("Ocorreu um erro ao consultar o CEP. Tente novamente.");
    }
}

// --- Configuração do Event Listener no HTML ---

// Adiciona o evento 'blur' (quando o campo perde o foco) para disparar a consulta
cepInput.addEventListener('blur', (event) => {
    pesquisacep(event.target.value);
});