# Projeto: Formulário de Endereço (API ViaCEP)
Este projeto é um formulário que consome a API pública ViaCEP para preencher automaticamente os campos de endereço.

Ao digitar um CEP válido e sair do campo (evento "blur"), o formulário faz uma requisição à API e preenche os campos de Rua, Bairro, Cidade e Estado correspondentes.

## Tecnologias utilizadas
- HTML para a estrutura semântica do formulário.

- CSS para estilização do card e organização dos campos com CSS Grid Layout.

- JavaScript (Fetch API) para consumir a API do ViaCEP, manipular o DOM e adicionar eventos.

## O que aprendi
- Como fazer requisições async/await com a fetch() para uma API pública.

- Manipular o DOM para preencher campos de input com os dados retornados pela API.

- Usar o evento blur para disparar uma função quando o usuário sai de um campo.

- Fazer uma validação simples de formato (usando Expressão Regular - Regex) antes de enviar a requisição.

- Implementar tratamento de erros com try...catch para lidar com CEPs não encontrados ou falhas de rede.

- Organizar um layout de formulário complexo usando display: grid.