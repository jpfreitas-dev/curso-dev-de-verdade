const rua = document.getElementById('rua');
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

    if (cep === "") {
        limpa_campos_endereco();
        return; // Sai da função se o CEP estiver vazio
    }

    if (!validacep.test(cep)) {
        limpa_campos_endereco();
        alert("Formato de CEP inválido.");
        return; // Sai da função se o formato for inválido
    }

    // Preenche os campos com "..." enquanto consulta
    rua.value = "...";
    bairro.value = "...";
    cidade.value = "...";
    estado.value = "...";

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);

        // Verifica se a requisição foi bem-sucedida (status 200-299)
        if (!response.ok) {
            throw new Error('Erro na requisição do ViaCEP: ' + response.status);
        }

        const data = await response.json();

        // Verifica se o CEP foi encontrado na resposta JSON (propriedade 'erro')
        if (data.erro) {
            limpa_campos_endereco();
            alert("CEP não encontrado.");
        } else {
            // Atualiza os campos com os valores recebidos
            rua.value = data.logradouro;  // ViaCEP usa 'logradouro' para rua
            bairro.value = data.bairro;
            cidade.value = data.localidade; // ViaCEP usa 'localidade' para cidade
            estado.value = data.uf;         // ViaCEP usa 'uf' para estado
        }

    } catch (error) {
        // Trata erros de rede ou outros problemas
        console.error("Erro ao buscar o CEP:", error);
        limpa_campos_endereco();
        alert("Ocorreu um erro ao consultar o CEP. Tente novamente.");
    }
}

// --- CONFIGURAÇÃO DO EVENT LISTENER ---
// Adiciona o evento 'blur' (quando o campo perde o foco)
cepInput.addEventListener('blur', (event) => {
    pesquisacep(event.target.value);
});