const pauseButton = document.getElementById('pause-button');
const closeButton = document.getElementById('close-button');
const pauseModal = document.getElementById('pause-modal');
const restartButton = document.querySelector('.restart-button');
const wordContainer = document.querySelector('.word-container');
const letterDivs = document.querySelectorAll('.letters-section div');
const bodyParts = document.querySelectorAll('.body');
const messageBox = document.getElementById('message-box'); // cria uma div na tela para mensagens

// Array de frutas
const fruits = [
    "MACA", "BANANA", "LARANJA", "UVA", "MELANCIA", "ABACAXI",
    "MORANGO", "AMORA", "FRAMBOESA", "MIRTILO", "PERA", "PESSEGO",
    "AMEIXA", "CEREJA", "KIWI", "MANGA", "MAMAO", "GOIABA", "COCO", "LIMAO",
    "LIMA", "TANGERINA", "ROMA", "MELAO", "FIGO", "DAMASCO", "NECTARINA",
    "MARACUJA", "CARAMBOLA", "CAQUI", "OXICOCO", "PITAYA", "LICHIA",
    "DURIAN", "JACA", "TAMARA", "AZEITONA", "FRUTA-DO-CONDE",
    "GRAVIOLA", "AMOREIRA", "GROSELHA", "ACEROLA", "JABUTICABA",
    "CAMU-CAMU", "TAMARINDO", "PITANGA", "CAJU", "ACAI", "MARULA"
];

let fruit = "";
let life = 6;
let remainingLetters = 0;
let lettersSpan = [];

// Pausa modal
pauseButton.addEventListener("click", () => {
    pauseModal.classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
});
closeButton.addEventListener("click", () => {
    pauseModal.classList.toggle("hidden");
    document.body.classList.toggle("no-scroll");
});

// Restart
restartButton.addEventListener("click", () => {
    randFruit();
    pauseModal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
});

// Função para sortear fruta e criar divs
function randFruit() {
    const index = Math.floor(Math.random() * fruits.length);
    fruit = fruits[index];
    life = 6;
    remainingLetters = fruit.length;

    // Reset body parts
    bodyParts.forEach(part => part.classList.add('hidden'));

    // Limpa container e cria divs
    wordContainer.innerHTML = '';
    lettersSpan = [];
    for (let i = 0; i < fruit.length; i++) {
        const DIV = document.createElement('div');
        DIV.classList.add('letter-from-word');
        const span = document.createElement('span');
        const div = document.createElement('div');
        DIV.append(span, div);
        wordContainer.appendChild(DIV);
        lettersSpan.push(span);
    }

    // Reset letters clicadas
    letterDivs.forEach(div => div.classList.remove('clicked'));

    // Reset mensagem
    messageBox.textContent = '';
}

// Lógica da forca
letterDivs.forEach(letterDiv => {
    letterDiv.addEventListener('click', function() {
        const clickedLetter = this.textContent;
        this.classList.add('clicked');

        let hit = false;
        for (let i = 0; i < fruit.length; i++) {
            if (clickedLetter === fruit[i]) {
                lettersSpan[i].textContent = clickedLetter;
                hit = true;
                remainingLetters--;
            }
        }

        if (!hit) {
            life--;
            switch(life) {
                case 5: bodyParts[0].classList.remove('hidden'); break;
                case 4: bodyParts[1].classList.remove('hidden'); break;
                case 3: bodyParts[2].classList.remove('hidden'); break;
                case 2: bodyParts[3].classList.remove('hidden'); break;
                case 1: bodyParts[4].classList.remove('hidden'); break;
                case 0:
                    bodyParts[5].classList.remove('hidden');
                    messageBox.style.color = '#cd0101ff'
                    messageBox.textContent = `Você perdeu! A palavra era ${fruit}`;
                    pauseModal.classList.remove("hidden");
                    document.body.classList.add("no-scroll");
                    // marca todas as letras
                    letterDivs.forEach(div => div.classList.add('clicked'));
                    return;
            }
        }

        if (remainingLetters === 0) {
            messageBox.textContent = `Você venceu!`;
            messageBox.style.color = '#039806ff'
            pauseModal.classList.remove("hidden");
            document.body.classList.add("no-scroll");
            // marca todas as letras como clicadas
            letterDivs.forEach(div => div.classList.add('clicked'));
        }
    });
});

// Sorteia uma fruta ao iniciar
randFruit();