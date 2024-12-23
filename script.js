document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const finalMessage = document.getElementById('final-message');
    const holes = document.querySelectorAll('.hole');
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Remaining Time: ${timeLeft} seconds`;
        finalMessage.style.display = 'none';
        startButton.disabled = true;

        gameInterval = setInterval(() => {
            const randomHole = holes[Math.floor(Math.random() * holes.length)];
            const face = randomHole.querySelector('.face');
            face.style.transform = 'translate(-50%, -50%) scale(1)';
            setTimeout(() => {
                face.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 800);
        }, 1000);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Remaining Time: ${timeLeft} seconds`;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        startButton.disabled = false;
        finalMessage.style.display = 'block';
        finalMessage.textContent = `Game Over! Your final score is ${score}. ${getWittyMessage(score)}`;
    }

    function getWittyMessage(score) {
        if (score < 5) return "Better luck next time!";
        if (score < 10) return "Not bad, keep practicing!";
        return "You're a FaceBomp master!";
    }

    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            const face = hole.querySelector('.face');
            if (face.style.transform === 'translate(-50%, -50%) scale(1)') {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                face.style.transform = 'translate(-50%, -50%) scale(0)';
            }
        });
    });

    startButton.addEventListener('click', startGame);
});
