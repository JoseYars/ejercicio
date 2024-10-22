const gameArea = document.getElementById('idgame')
const player  = document.querySelector('#player')
const beyonce = document.querySelectorAll('#beyonce')[0]

const playerSpeed = 35
const beyonceSpeed = 2

let isPlaying = true

let playerPosition = { x: 0, y: 0 }
let playerBeyoncePosition = { x: 300, y: 300 }


function CheckColision () {
    const deltaX = Math.abs(playerPosition.x - playerBeyoncePosition .x)
    const deltaY = Math.abs(playerPosition.y - playerBeyoncePosition.y)
    if (deltaX <= 25 && deltaY <= 25){
       if( confirm('EL PEROO TE ATRAPO DALE LAS GRACIAS PARA SALVAR TU VIDA')){
            playerPosition.x = Math.floor(Math.random() * gameArea.clientWidth)
            playerPosition.y = Math.floor(Math.random() * gameArea.clientHeight)
       }else{
        alert('perdiste')
        isPlaying = false
       }
    }
}


function gameLoop () {
    moveBeyonce()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce(){
    if (playerBeyoncePosition.x < playerPosition.x)
        playerBeyoncePosition.x += beyonceSpeed
    else if (playerBeyoncePosition.x > playerPosition.x)
        playerBeyoncePosition.x -= beyonceSpeed


    if (playerBeyoncePosition.y < playerPosition.y)
        playerBeyoncePosition.y += beyonceSpeed
    else if (playerBeyoncePosition.y > playerPosition.y)
        playerBeyoncePosition.y -= beyonceSpeed
    updatePosition()
    if (isPlaying)
        CheckColision()

}

function movePlayer(event) {

    switch(event.key){
        case 'ArrowUp':
            if (playerPosition.y >= 0)
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if (playerPosition.y < idgame.clientHeight - 135)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 25)
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if (playerPosition.x < idgame.clientWidth - 60)
                playerPosition.x += playerSpeed
            break
    } 
    updatePosition()
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${playerBeyoncePosition.x}px, ${playerBeyoncePosition.y}px)`
}



window.addEventListener('keydown', movePlayer)
window.addEventListener('load', () =>{
    gameLoop()
})


