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
    return "";
} 

function setCookie(cookie, value) {
    let week = new Date();
    week.setTime(week.getTime() + 1000*60*24*7);

    document.cookie=`${cookie}=${value}; expires=${week.toUTCString()}; path=/Octo/crispy-octo-carnival/`;
}

window.addEventListener("load", ()=>{

    let fondo=obtenercookie('fondo');

    // Cambia el color de fondo de la vista
    if(fondo=="blanco"){
        document.body.style.background= "url('/Octo/crispy-octo-carnival/statics/img/fondoclaro.png')";
    }
    else if(fondo=="negro"){
        document.body.style.background= "url('/Octo/crispy-octo-carnival/statics/img/fondomorado.png')";
    }
})