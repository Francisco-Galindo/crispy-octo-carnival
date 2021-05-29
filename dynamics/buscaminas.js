//tabla de divs con un for o un while
//número aleatorios que indican explosivos
//número aleatorio de 1-4 que indica posición de las bombas
//por el momeno estoy tomando 15 filas y 15 columnas pero pued ecambiar

let col=15;
let row=15;
let tablero = document.querySelector("#tablero");
for(let i=0; i<row; i++){
    for(let j=0; j<col; j++){
        let newDiv = document.createElement("div");
        tablero.appendChild(newDiv);
    }
}
