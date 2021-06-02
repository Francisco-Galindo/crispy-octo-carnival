window.addEventListener("load", ()=>{

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
            var newCoo= document.cookie="usuario="+ Nombre +"; expires="+ week.toUTCString() + "; path=/Octo/crispy-octo-carnival/";
            document.cookie = "prueba=cookie";
            alert(newCoo);
        }
        
        var name=obtenercookie('usuario');

        if(name==Nombre){
            alert('Usuario Existente');
        }
    })

    blanco.addEventListener("click",()=>{

        let week = new Date();
            week.setTime(week.getTime() + 1000*60*24*7);
            document.cookie="fondo=blanco; expires="+ week.toUTCString()  + "; path=/Octo/crispy-octo-carnival/";
            window.location.reload()
    })

    negro.addEventListener("click",()=>{

        let week = new Date();
            week.setTime(week.getTime() + 1000*60*24*7);
            document.cookie="fondo=negro; expires="+ week.toUTCString()  + "; path=/Octo/crispy-octo-carnival/";
            window.location.reload()
    })
})







