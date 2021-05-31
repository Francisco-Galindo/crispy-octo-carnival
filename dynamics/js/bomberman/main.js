let gameDiv;
let canvas;
let ctx;
let gameFocused;
let pause = true;
let img = new Image();
let player;
let startTime;
let frameCount = 0;
let frameTime = 1000 / 60;
let then

/* Se modifica el tamaño del canvas para que sea el mismo que su
div padre */
function escalarCanvas() {
	canvas.height = gameDiv.clientHeight;
	canvas.width = gameDiv.clientWidth;
}

// Dibuja todos los elementos del juego (personajes, bloques, etc.)
function draw(factor) {
	map.drawElements(ctx, factor);
	player.draw(ctx, factor);
}

function update() {
	player.move()
}

function drawPauseScreen(factor) {
	ctx.beginPath();
	ctx.globalAlpha = 0.3;
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.globalAlpha = 1.0;
	ctx.font = "50px Consolas";
	ctx.fillText(`Pausa`, 0, 20 * factor);
	ctx.fill()
	ctx.closePath();
}

/* Esta es la función que desencadena el resto de funciones que se deben 
realizar cada vez que se va a dibujar un nuevo cuadro */
function gameCycle() {

	let now = Date.now()
	let elapsed = now - then;

	if (elapsed > frameTime) {
		frameCount++;
		then = now - (elapsed % frameTime);
		escalarCanvas();
		let factor = canvas.height / VIRTUALHEIGHT;

		if (!pause) {
			update();
			draw(factor);
		} else {
			draw(factor);
			drawPauseScreen(factor);
		}

	}
	requestAnimationFrame(gameCycle);
}


document.addEventListener("DOMContentLoaded", () => {

	gameDiv = document.getElementById("juego");
	canvas = document.getElementById("juego-canvas");
	ctx = canvas.getContext("2d");
	console.log(canvas)


	gameDiv.addEventListener("focus", () => {
		gameFocused = true;
	})

	gameDiv.addEventListener("blur", () => {
		gameFocused = false;
		pause = true;
	})

	gameDiv.addEventListener("keydown", (event) => {

		if (event.key === "Escape") {
			console.log("wtf")
			pause = !pause
		}
		if (event.key.toLowerCase() === "w") {
			player.setUpDirection(true);
		}
		if (event.key.toLowerCase() === "s") {
			player.setDownDirection(true);
		}
		if (event.key.toLowerCase() === "a") {
			player.setLeftDirection(true);
		}
		if (event.key.toLowerCase() === "d") {
			player.setRightDirection(true);
		}
	})

	gameDiv.addEventListener("keyup", (event) => {
		if (event.key.toLowerCase() === "w") {
			player.setUpDirection(false);
		}
		if (event.key.toLowerCase() === "s") {
			player.setDownDirection(false);
		}
		if (event.key.toLowerCase() === "a") {
			player.setLeftDirection(false);
		}
		if (event.key.toLowerCase() === "d") {
			player.setRightDirection(false);
		}
	})



	map.iterateOverMap(map.initialise)
	player = new Pulpito(16,16,1,1,null)
	then = Date.now()
	gameCycle()
})