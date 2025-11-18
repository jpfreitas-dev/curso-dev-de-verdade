let expression = '0';
let currentValue = '';
const displayValue = document.querySelector('.display-value');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.btn-equal');

// Clique nos números
numbers.forEach(number => {
  number.addEventListener('click', () => {
    if (expression === '0') expression = ''; // remove o zero inicial
    currentValue = number.textContent;
    expression += currentValue;
    displayValue.textContent = expression;
  });
});

// Clique nos operadores
operators.forEach(operator => {
  operator.addEventListener('click', () => {
    const op = operator.textContent;

    // botão clear (C)
    if (op === 'C') {
      expression = '0';
      currentValue = '0';
      displayValue.textContent = expression;
      return;
    }

    // evita operadores duplos
    if (!/[+\-*/÷×−]$/.test(expression)) {
      switch (op) {
        case '÷':
          expression += '/';
          break;
        case '×':
          expression += '*';
          break;
        case '−':
          expression += '-';
          break;
        case '+':
          expression += '+';
          break;
        default:
          break;
      }
      displayValue.textContent = expression;
    }
  });
});

// Botão "="
equalBtn.addEventListener('click', () => {
  try {
    let res = eval(expression);          // calcula resultado
    if (!Number.isInteger(res)) {        // se tiver casas decimais
      res = parseFloat(res.toFixed(3));  // aproxima pra 3 casas
    }
    displayValue.textContent = res;
    expression = res.toString();         // permite continuar calculando
  } catch {
    displayValue.textContent = 'Error';
    expression = '0';
  }
});
