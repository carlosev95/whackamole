// Variables del juego
let timer = 10
let score = 0
let intervalId
let finalMessage = document.getElementById("final-message")

// Obtener elementos del DOM
const startButton = document.getElementById("startButton")
const moles = document.getElementsByClassName("mole")
const timerDisplay = document.getElementById("timer")
const scoreDisplay = document.getElementById("score")
const elemento = document.getElementById("game-container")

//Insertar el tiempo restante de forma dinámica en HTML
const timerValueElement = document.getElementById('timer-value')
timerValueElement.textContent = timer;

//Función para elegir nivel
function levelSelect() {
    const nivelSelect = document.getElementById('level-select')
    const submitBtn = document.getElementById('btn-level')
    const gameContainer = document.getElementById("game-area")

    submitBtn.addEventListener('click', function() {
    gameContainer.innerHTML = '' // Limpiar el contenido anterior

    const nivelSeleccionado = nivelSelect.value
    let numberOfDiv

    if (nivelSeleccionado === 'facil') {
        numberOfDiv = 5;
    } else if (nivelSeleccionado === 'intermedio') {
        numberOfDiv = 10;
    } else if (nivelSeleccionado === 'dificil') {
        numberOfDiv = 15;
    }

    for (let i = 0; i < numberOfDiv; i++) {
        const outerDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
    
        // Establece las clases, estilos u otros atributos según sea necesario
        outerDiv.className = 'hole';
        innerDiv.className = 'mole';
    
        // Agrega el div interior al div exterior
        outerDiv.appendChild(innerDiv);
    
        // Agrega el div exterior al contenedor principal
        gameContainer.appendChild(outerDiv);
    }
    }
)}
levelSelect();
//Evento click para cambiar imagen del puntero
elemento.addEventListener('mousedown', function() {
    elemento.style.cursor = 'url(../img/mazo_click.png), auto';
})

elemento.addEventListener('mouseup', function() {
    elemento.style.cursor = 'url(../img/mazo.png), auto';
})

// Función para iniciar el juego
function startGame() {
    startButton.disabled = true
    score = 0
    timer = 10
    timerDisplay.textContent = `Tiempo restante: ${timer}`
    scoreDisplay.textContent = `Topos golpeados: ${score}`
    
    showRandomMole()
    
    intervalId = setInterval(() => {
        timer--
        timerDisplay.textContent = `Tiempo restante: ${timer}`
        
        if (timer === 0) {
            endGame()
        } else {
            showRandomMole()
        }
    }, 1000)
}

// Función para mostrar un topo aleatorio
function showRandomMole() {
    hideAllMoles()
    
    const randomIndex = Math.floor(Math.random() * moles.length)
    const randomMole = moles[randomIndex]
    randomMole.style.display = "block"
    
    // Evento de clic para golpear al topo
    randomMole.addEventListener('mousedown', hitMole)
}

// Función para ocultar todos los topos
function hideAllMoles() {
    for (let mole of moles) {
        mole.style.display = "none"
        mole.removeEventListener('mousedown', hitMole)
    }
}

// Función para golpear al topo
function hitMole() {
    score++
    scoreDisplay.textContent = `Topos golpeados: ${score}`
    this.style.display = "none"
}

// Función para finalizar el juego
function endGame() {
    clearInterval(intervalId)
    hideAllMoles()
    startButton.disabled = false
    finalMessage.innerText = "¡Fin del juego! Tu puntuación final es: "+ score
}

// Evento de clic para iniciar el juego
startButton.addEventListener("click", startGame)