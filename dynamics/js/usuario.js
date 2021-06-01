
$("#ingresar").on("click", function(){
    console.log("click");
    usuario= $("#name").val();
    if(usuario!= "")
    {
        let week = new Date();
        week.setTime(week.getTime() + 1000*60*24*7);
        var newCoo= document.cookie="usuario="+ usuario +"; expires="+ week.toUTCString();
        document.cookie = "prueba=cookie";
        alert(newCoo);
    }
    
    let allCookies = document.cookie;
    let separaCookie = allCookies.split(";");
    let nombreUsuario=[];
    for(const valor of separaCookie)
    {
        const cookie= valor.split("=");
        nombreUsuario.push(cookie);  
    }
    for (var i=0; i<=10; i++)
    {
        if(nombreUsuario[i][1])
        {
            alert("Usuario existente");
            
        }
    }
    
    
});







