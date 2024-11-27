const gameArea = document.getElementById('idgame');
const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');

const playerSpeed = 35;
let beyonceSpeed = 2;

let isPlaying = false;

let playerPosition = { x: 0, y: 0 };
let playerBeyoncePosition = { x: 300, y: 300 };
let enemies = []; // Almacena los enemigos adicionales

function CheckColision() {
    const deltaX = Math.abs(playerPosition.x - playerBeyoncePosition.x);
    const deltaY = Math.abs(playerPosition.y - playerBeyoncePosition.y);
    if (deltaX <= 25 && deltaY <= 25) {
        if (confirm('¡El perro te atrapó! ¿Quieres salvarte?')) {
            respawnPlayer();
        } else {
            alert('Perdiste');
            isPlaying = false;
        }
    }
    enemies.forEach((enemy) => {
        const deltaX = Math.abs(playerPosition.x - enemy.position.x);
        const deltaY = Math.abs(playerPosition.y - enemy.position.y);
        if (deltaX <= 25 && deltaY <= 25) {
            alert('¡Un enemigo te atrapó! Perdiste.');
            isPlaying = false;
        }
    });
}

function respawnPlayer() {
    playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 60));
    playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 135));
    resetEnemies();
    updatePosition();
}

function resetEnemies() {
    enemies.forEach((enemy) => {
        enemy.position.x = Math.random() * (gameArea.clientWidth - 60);
        enemy.position.y = Math.random() * (gameArea.clientHeight - 135);
    });
}

function gameLoop() {
    if (isPlaying) {
        moveBeyonce();
        moveEnemies();
        CheckColision();
        requestAnimationFrame(gameLoop);
    }
}

function moveBeyonce() {
    if (playerBeyoncePosition.x < playerPosition.x)
        playerBeyoncePosition.x += beyonceSpeed;
    else if (playerBeyoncePosition.x > playerPosition.x)
        playerBeyoncePosition.x -= beyonceSpeed;

    if (playerBeyoncePosition.y < playerPosition.y)
        playerBeyoncePosition.y += beyonceSpeed;
    else if (playerBeyoncePosition.y > playerPosition.y)
        playerBeyoncePosition.y -= beyonceSpeed;

    updatePosition();
}

function moveEnemies() {
    enemies.forEach((enemy) => {
        if (enemy.position.x < playerPosition.x)
            enemy.position.x += enemy.speed;
        else if (enemy.position.x > playerPosition.x)
            enemy.position.x -= enemy.speed;

        if (enemy.position.y < playerPosition.y)
            enemy.position.y += enemy.speed;
        else if (enemy.position.y > playerPosition.y)
            enemy.position.y -= enemy.speed;

        enemy.element.style.transform = `translate(${enemy.position.x}px, ${enemy.position.y}px)`;
    });
}

function movePlayer(event) {
    if (!isPlaying) return;

    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 0)
                playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 135)
                playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x >= 25)
                playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 60)
                playerPosition.x += playerSpeed;
            break;
    }
    updatePosition();
}

function updatePosition() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${playerBeyoncePosition.x}px, ${playerBeyoncePosition.y}px)`;
}

window.addEventListener('keydown', movePlayer);

const startGameButton = document.getElementById('startGameButton');
startGameButton.addEventListener('click', () => {
    isPlaying = true;
    playerPosition = { x: 0, y: 0 };
    playerBeyoncePosition = { x: 300, y: 300 };
    resetEnemies();
    updatePosition();
    gameLoop();
});

// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    if (document.body.style.backgroundColor === 'black') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    } else {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }
});

// Background change functionality
const backgroundSelect = document.getElementById('backgroundSelect');
backgroundSelect.addEventListener('change', (event) => {
    gameArea.style.backgroundImage = `url(${event.target.value})`;
    gameArea.style.backgroundSize = 'cover';
    gameArea.style.backgroundRepeat = 'no-repeat';
});

// Difficulty setting functionality
const difficultySelect = document.getElementById('difficultySelect');
difficultySelect.addEventListener('change', (event) => {
    const difficulty = event.target.value;
    switch (difficulty) {
        case 'easy':
            beyonceSpeed = 1;
            break;
        case 'medium':
            beyonceSpeed = 2;
            break;
        case 'hard':
            beyonceSpeed = 4;
            break;
    }
});

// Additional enemies functionality
const addEnemyButton = document.getElementById('addEnemyButton');
addEnemyButton.addEventListener('click', () => {
    const newEnemy = document.createElement('div');
    newEnemy.classList.add('personaje');
    newEnemy.style.backgroundImage = 'url(img.png)';
    newEnemy.style.backgroundSize = 'cover';
    newEnemy.style.width = '50px';
    newEnemy.style.height = '50px';
    newEnemy.style.position = 'absolute';

    const enemyPosition = {
        x: Math.random() * (gameArea.clientWidth - 60),
        y: Math.random() * (gameArea.clientHeight - 135),
    };
    const enemySpeed = beyonceSpeed;

    gameArea.appendChild(newEnemy);
    enemies.push({ element: newEnemy, position: enemyPosition, speed: enemySpeed });
});
