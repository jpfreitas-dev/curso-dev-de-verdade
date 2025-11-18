const adviceText = document.getElementById('advice-text');
const adviceNumber = document.getElementById('advice-number');
const diceButton = document.querySelector('.dice-button'); 

let isLoading = false;

async function fetchAdvice(){
    if (isLoading) return; // Verifica se já está carregando um conselho

    isLoading = true; // Evita múltiplas requisições simultâneas
    const response = await fetch('https://api.adviceslip.com/advice');
    const advice = await response.json();

    adviceText.textContent = advice.slip.advice;
    adviceNumber.textContent = '#'+advice.slip.id;

    isLoading = false; // Permite novas requisições
}

diceButton.addEventListener('click', async function () {
    diceButton.classList.add('dice-button-animation');

    fetchAdvice();

    setTimeout(() => {
        diceButton.classList.remove('dice-button-animation')
    }, 1000);
});

fetchAdvice(); // Carrega um conselho ao iniciar a página