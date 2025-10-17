const adviceText = document.getElementById('advice-text');
const adviceNumber = document.getElementById('advice-number');
const diceButton = document.querySelector('.dice-button');

let isLoading = false;

diceButton.addEventListener('click', async function () {
    diceButton.classList.add('dice-button-animation');
    if (isLoading) return;

    isLoading = true;
    const response = await fetch('https://api.adviceslip.com/advice');
    const advice = await response.json();

    adviceText.textContent = advice.slip.advice;
    adviceNumber.textContent = '#'+advice.slip.id;

    isLoading = false;
    setTimeout(() => {
        diceButton.classList.remove('dice-button-animation')
    }, 1000);
});