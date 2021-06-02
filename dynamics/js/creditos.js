window.addEventListener("load", ()=>{
    let letras = document.getElementById("espacio");

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

    var fondo=obtenercookie('fondo');

    if(fondo=="blanco"){
        console.log("blanco");
        document.body.style.background= "url('../statics/img/fondoclaro.png')";
        letras.style.background= "#010033";
    }
    else if(fondo=="negro"){
        console.log("n");
        letras.style.background= "url('../statics/img/fondomorado.png')";
    }

})