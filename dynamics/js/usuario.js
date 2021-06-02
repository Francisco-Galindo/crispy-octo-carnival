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

    let ingresar=document.getElementById("ingresar");
    let usuario=document.getElementById("name");
    let blanco =document.getElementById("white");
    let negro =document.getElementById("black");

    ingresar.addEventListener("click",()=>{
        Nombre=usuario.value;
        if(Nombre!= "")
        {
            let week = new Date();
            week.setTime(week.getTime() + 1000*60*24*7);
            var newCoo= document.cookie="usuario="+ Nombre +"; expires="+ week.toUTCString();
            document.cookie = "prueba=cookie";
            alert(newCoo);
        }
        
        var name=obtenercookie('usuario');
        console.log (name);

        if(name==Nombre){
            alert('Usuario Existente');
        }
    })

    blanco.addEventListener("click",()=>{
        var name=obtenercookie('usuario');

        let week = new Date();
            week.setTime(week.getTime() + 1000*60*24*7);
            var newFondo= document.cookie="fondo=blanco; expires="+ week.toUTCString();
            alert(newFondo);
            console.log(newFondo);
    })

    negro.addEventListener("click",()=>{
        var name=obtenercookie('usuario');

        let week = new Date();
            week.setTime(week.getTime() + 1000*60*24*7);
            var newFondo= document.cookie="fondo=negro; expires="+ week.toUTCString();
            alert(newFondo);
            console.log(newFondo);
    })
})







