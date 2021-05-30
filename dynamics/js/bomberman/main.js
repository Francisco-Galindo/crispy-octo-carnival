let gameDiv;
let canvas;
let ctx;
let gameFocused;
let pause = true;
let img = new Image();
let player;
let startTime;

/* Se modifica el tamaño del canvas para que sea el mismo que su
div padre */
function escalarCanvas() {
    canvas.height = gameDiv.clientHeight;
    canvas.width = gameDiv.clientWidth;
}

// Dibuja todos los elementos del juego (personajes, bloques, etc.)
function draw(factor) {
    
    player.draw(ctx, factor);
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
    escalarCanvas();
    let factor = canvas.height / VIRTUALHEIGHT;

    draw(factor);

    if (!pause) {
    } else {
        drawPauseScreen(factor);
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
            pause = !pause
        }
    })

    player = new Pulpito(0,0,1,1,null)
    gameCycle()
})