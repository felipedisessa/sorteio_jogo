document.getElementById('startRace').addEventListener('click', startRace);
document.getElementById('resetRace').addEventListener('click', resetRace);

let raceInProgress = false;
let winner = null;
const finishLine = document.querySelector('.track').offsetWidth - 100;

const horses = Array.from(document.querySelectorAll('.horse')).map((horse, index) => ({
    element: horse,
    position: 0,
    number: index + 1
}));

function startRace() {
    if (raceInProgress) return; 
    raceInProgress = true;
    winner = null;

    toggleButtons();  

    resetPositions();  

    requestAnimationFrame(race);  
}

function resetPositions() {
    horses.forEach(horse => {
        horse.position = 0;  // Reseta a posição de cada cavalo para 0
        horse.element.style.left = '0px';  // Move o cavalo para o início da pista
        horse.element.style.transform = 'scale(1)';  // Reseta a escala do cavalo
        horse.element.style.backgroundColor = '';  // Reseta a cor de fundo do cavalo
        horse.element.classList.remove('winner-animation');  // Remove a animação de vitória
    });
}

function race() {
    horses.forEach(horse => {
        let speed = Math.random() * 5 + 1.5; 
        horse.position += speed;
        horse.element.style.left = `${horse.position}px`;

        // Verifica se o cavalo cruzou a linha de chegada e se ainda não há um vencedor
        if (horse.position >= finishLine && !winner) {
            winner = horse;  // Define o cavalo vencedor
            announceWinner(horse);  // Anuncia o vencedor
        }
    });

    if (!winner) {
        requestAnimationFrame(race);
    }
}

// Função para anunciar o cavalo vencedor
function announceWinner(horse) {
    raceInProgress = false;
    document.getElementById('winner').textContent = `O Cavalinho número ${horse.number} venceu!`;
    horse.element.style.transform = 'scale(1.2)';  // Aumenta o cavalo vencedor
    horse.element.style.backgroundColor = '#FFD700';  // Muda a cor de fundo para dourado
    horse.element.classList.add('winner-animation');  // Adiciona a animação de vencedor
}

function resetRace() {
    resetPositions();  
    document.getElementById('winner').textContent = '';  
    winner = null;
    raceInProgress = false;

    toggleButtons();  
}

function toggleButtons() {
    const startButton = document.getElementById('startRace');
    const resetButton = document.getElementById('resetRace');

    startButton.style.display = raceInProgress ? 'none' : 'block';  
    resetButton.style.display = raceInProgress ? 'block' : 'none';  
}
