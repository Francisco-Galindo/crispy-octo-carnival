window.addEventListener("load", ()=>{
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

    let puntosBM=document.getElementById("puntajesPBM");
    let pbm=obtenercookie("puntaje");

    puntosBM.innerHTML="<h2>"+pbm+"</h2>"
    
})