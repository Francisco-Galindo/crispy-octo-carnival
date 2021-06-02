window.addEventListener("load", () => {

    // Se pone el valor de la cookie del fondo en blanco o negro, dependiendo del botón presionado
    let blanco = document.getElementById("white");
    let negro = document.getElementById("black");

    blanco.addEventListener("click", () => {

        setCookie("fondo", "blanco")
        window.location.reload()
    })

    negro.addEventListener("click", () => {
        setCookie("fondo", "negro")
        window.location.reload()
    })
})