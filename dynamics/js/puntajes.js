window.addEventListener("load", ()=>{
    let puntosPBM=document.getElementById("puntajesPBM");
    let puntosBM=document.getElementById("puntajesPB");

    let puntajesPBM = obtenercookie("puntajesMinas").split('|').sort();
    for (let puntaje of puntajesPBM) {
        console.log(puntaje);
        puntosPBM.innerHTML += puntaje +"<br>";
    }
})