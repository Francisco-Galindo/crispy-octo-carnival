function 

window.addEventListener("load", () => {

    let ingresar = document.getElementById("ingresar");

    // Guarda el nombre de usuario en la cookie
    ingresar.addEventListener("click", () => {
        nombre = usuario.value;
        if (nombre != "") {
            let week = new Date();
            week.setTime(week.getTime() + 1000 * 60 * 24 * 7);
            var newCoo = document.cookie = "usuario=" + Nombre + "; expires=" + week.toUTCString() + "; path=/Octo/crispy-octo-carnival/";
        }
    })
})
