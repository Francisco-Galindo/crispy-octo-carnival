window.addEventListener("load", ()=>{
    let puntosBM=document.getElementById("puntajesPBM");

    function obtenercookie(nombrecookie){
        let cookies = document.cookie;
        let arreglo = cookies.split('; ');
        for(const valor of arreglo){
            const cookie=valor.split('=')
            if(cookie[0]===nombrecookie){
                return cookie[1];
            }
        }
    } 

    var puntajePBM=obtenercookie('puntaje');
    console.log(puntajePBM);
    puntosBM.innerHTML="<h3>"+puntajePBM+"</>";
})