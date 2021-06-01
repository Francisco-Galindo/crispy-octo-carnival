let gameDiv;
let canvas;
let ctx;
let gameFocused;

let pause = true

let then;
let pulpitos = [];
let end = false;

/* Se modifica el tamaño del canvas para que sea el mismo que su
div padre */
function scaleCanvas() {
	canvas.height = gameDiv.clientHeight;
	canvas.width = gameDiv.clientWidth;
}

// Dibuja todos los elementos del juego (personajes, bloques, etc.)
function draw(factor) {
	map.drawElements(ctx, factor);
	for (let pulpo of pulpitos) {
		pulpo.draw(ctx, factor);
	}
}

// Actualiza el estado del juego
function update() {
	map.iterateOverMap(map.updateTile);

	for (let pulpoIndx in pulpitos) {
		pulpitos[pulpoIndx].update();
		if (!pulpitos[pulpoIndx].isAlive()) {
			end = true;
		}
	}
}

function drawPauseScreen() {
	
	ctx.beginPath();
	ctx.globalAlpha = 0.3;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1.0;
	ctx.textAlign = "center"; 
	if (!end) {
		ctx.font = "50px Consolas";
		ctx.fillText(`Pausa`, canvas.width / 2, canvas.width / 2 - 50);

	} else {
		ctx.font = "50px Consolas";
		let ganador;
		if (pulpitos[0].isAlive()) {
			ganador = "Jugador 1";
		} else {
			ganador = "Jugador 2";
		}
		ctx.fillText(`Gana ${ganador}`, canvas.width / 2, canvas.width / 2 - 50);
	}

	ctx.fill()
	ctx.closePath();

}

/* Esta es la función que desencadena el resto de funciones que se deben 
realizar cada vez que se va a dibujar un nuevo cuadro */
function gameCycle() {

	let now = Date.now()
	let elapsed = now - then;

	if (elapsed > FRAMETIME) {
		then = now - (elapsed % FRAMETIME);
		scaleCanvas();
		let factor = canvas.height / VIRTUALHEIGHT;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (!pause && !end) {
			update();
			draw(factor);
		} else {
			draw(factor);
			drawPauseScreen();
		}

	}
	if (!end) {
		requestAnimationFrame(gameCycle);
		
	} else {
		drawPauseScreen();
	}
}


document.addEventListener("DOMContentLoaded", () => {

	gameDiv = document.getElementById("juego");
	canvas = document.getElementById("juego-canvas");
	ctx = canvas.getContext("2d");
	console.log(canvas)


	gameDiv.addEventListener("focus", () => {
		gameFocused = true;
	})
	// Poniendo pausa al juego si no está en focus
	gameDiv.addEventListener("blur", () => {
		gameFocused = false;
		pause = true;
	})

	gameDiv.addEventListener("keydown", (event) => {


		if (event.key === "Escape") {
			pause = !pause
		}
		if (event.key.toLowerCase() === "w") {
			pulpitos[0].setUpDirection(true);
		}
		if (event.key.toLowerCase() === "s") {
			pulpitos[0].setDownDirection(true);
		}
		if (event.key.toLowerCase() === "a") {
			pulpitos[0].setLeftDirection(true);
		}
		if (event.key.toLowerCase() === "d") {
			pulpitos[0].setRightDirection(true);
		}
		if (event.key === "e") {

			if (pulpitos[0].isAlive()) {
				pulpitos[0].placeBomb();
			}

		}

		if (event.key.toLowerCase() === "i") {
			pulpitos[1].setUpDirection(true);
		}
		if (event.key.toLowerCase() === "k") {
			pulpitos[1].setDownDirection(true);
		}
		if (event.key.toLowerCase() === "j") {
			pulpitos[1].setLeftDirection(true);
		}
		if (event.key.toLowerCase() === "l") {
			pulpitos[1].setRightDirection(true);
		}
		if (event.key === "o") {
			if (pulpitos[0].isAlive()) {
				pulpitos[1].placeBomb();
			}

		}
		if (event.key === "Enter" && end) {
			startGame();
		}

	})

	gameDiv.addEventListener("keyup", (event) => {
		if (event.key.toLowerCase() === "w") {
			pulpitos[0].setUpDirection(false);
		}
		if (event.key.toLowerCase() === "s") {
			pulpitos[0].setDownDirection(false);
		}
		if (event.key.toLowerCase() === "a") {
			pulpitos[0].setLeftDirection(false);
		}
		if (event.key.toLowerCase() === "d") {
			pulpitos[0].setRightDirection(false);
		}

		if (event.key.toLowerCase() === "i") {
			pulpitos[1].setUpDirection(false);
		}
		if (event.key.toLowerCase() === "k") {
			pulpitos[1].setDownDirection(false);
		}
		if (event.key.toLowerCase() === "j") {
			pulpitos[1].setLeftDirection(false);
		}
		if (event.key.toLowerCase() === "l") {
			pulpitos[1].setRightDirection(false);
		}
		if (event.key === "o") {
			pulpitos[1].placeBomb();
		}
	})

	function startGame() {
		pulpitos = [];
		end = false;
		map.iterateOverMap(map.initialise)
		setMaxDistance();
	
		pulpitos.push(new Pulpito(TILESIZE, TILESIZE));
		pulpitos.push(new Pulpito((map[0].length - 2) * TILESIZE, (map.length - 2) * TILESIZE));
	
		then = Date.now()
		gameCycle()
	}

	startGame();
})