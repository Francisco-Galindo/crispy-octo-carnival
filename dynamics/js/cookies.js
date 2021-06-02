window.addEventListener("load", ()=>{

    // Regresa la cookie pedida
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

    let fondo=obtenercookie('fondo');

    // Cambia el color de fondo de la vista
    if(fondo=="blanco"){
        document.body.style.background= "url('../statics/img/fondoclaro.png')";
    }
    else if(fondo=="negro"){
        document.body.style.background= "url('../statics/img/fondomorado.png')";
    }
})