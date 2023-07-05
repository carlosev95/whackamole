        // Variables del juego
        let timer = 10;
        let score = 0;
        let intervalId;
        let mensajeFinal = document.getElementById("mensaje-final")
        
        // Obtener elementos del DOM
        const startButton = document.getElementById("startButton");
        const holes = document.getElementsByClassName("hole");
        const moles = document.getElementsByClassName("mole");
        const timerDisplay = document.getElementById("timer");
        const scoreDisplay = document.getElementById("score");
        
        // Función para iniciar el juego
        function startGame() {
            startButton.disabled = true;
            score = 0;
            timer = 10;
            timerDisplay.textContent = `Tiempo restante: ${timer}`;
            scoreDisplay.textContent = `Topos golpeados: ${score}`;
            
            showRandomMole();
            
            intervalId = setInterval(() => {
                timer--;
                timerDisplay.textContent = `Tiempo restante: ${timer}`;
                
                if (timer === 0) {
                    endGame();
                } else {
                    showRandomMole();
                }
            }, 1000);
        }
        
        // Función para mostrar un topo aleatorio
        function showRandomMole() {
            hideAllMoles();
            
            const randomIndex = Math.floor(Math.random() * holes.length);
            const randomMole = moles[randomIndex];
            randomMole.style.display = "block";
            
            // Evento de clic para golpear al topo
            randomMole.addEventListener("click", hitMole);
        }
        
        // Función para ocultar todos los topos
        function hideAllMoles() {
            for (let mole of moles) {
                mole.style.display = "none";
                mole.removeEventListener("click", hitMole);
            }
        }
        
        // Función para golpear al topo
        function hitMole() {
            score++;
            scoreDisplay.textContent = `Topos golpeados: ${score}`;
            this.style.display = "none";
        }
        
        // Función para finalizar el juego
        function endGame() {
            clearInterval(intervalId);
            hideAllMoles();
            startButton.disabled = false;
            mensajeFinal.innerText = "¡Fin del juego! Tu puntuación final es: "+ score
        }
        
        // Evento de clic para iniciar el juego
        startButton.addEventListener("click", startGame);