window.addEventListener("load", ()=>{
    const jugar=document.getElementById("play");
    
    let tamano=8;
    let puntaje=0;
    let perder=0;
    
    var fecha= new Date();
    
    var minas = inicializaMatriz();	
  
      function inicializaMatriz(){
          const tabla = [];
          const linea = [];
      for(let i=0; i<tamano;i++){
        tabla[i]=[];
        for(let j=0; j<tamano;j++){
          tabla[i][j]=0;
        }
      }
      return tabla;
      }	
      let click=0;
      function crearTablero(){
        for(let i = 0; i < tamano; i++){
              for(var j = 0; j < tamano; j++){			      
                var div = document.createElement("div");
                div.id = i + "" + j;
          if(perder==0){
            div.addEventListener("click",mostrarNumero, true);
            tablerominas.appendChild(div);
          }		           
              }
          }		    
    }
    
  
    function mostrarNumero(e){
      var auxstr = this.id.split("");			
      var myid = auxstr[0] + auxstr[1];	
      divObj = document.getElementById(myid);
      click++;
      if (click == 1) {
        setTimeout(function(){
          if(click == 1) {
              click = 0;
              if(minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] == 0){
                divObj.style.backgroundColor = "#bfc3d6";
                abrirAlrededor(parseInt(auxstr[0],10),parseInt(auxstr[1],10),minas);
                divObj.style.background="#bfc3d6 url('none') no-repeat right top";
                puntaje+=200;
              }else{
                if(minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] != "*"){
                  document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] + "</p>";
                  divObj.style.backgroundColor = "#bfc3d6"; 
                  divObj.style.background="#bfc3d6 url('none') no-repeat right top";
                  puntaje+=300;
                }else{
                  divObj.style.background="#f3f3f3 url('../statics/img/bomba.jpg') no-repeat right top";		
                  abrirTablero(minas);
                  perder=1;
                }
              }
          } else {
            divObj.style.background="#f3f3f3 url('../statics/img/bandera.png') no-repeat right top";
            puntaje+=100;
          }
         click = 0; 
        },300)
      }
      console.log(perder);
      if(perder==1){
        document.body.innerHTML="<h1>FIN DEL JUEGO!!!</h1><br><h2>Puntaje:"+puntaje+"</h2>";
        document.cookie="puntaje="+puntaje+" expires="+fecha.toGMTString(fecha.setTime(fecha.getTime()+1000*60*30));
      }
      }				
  
      function bombasAlrededor(tablero){
        for(var i = 0; i < tamano; i++){
            for(var j = 0; j < tamano; j++){			           
                if(tablero[i][j] == "*"){
                  if(i == 0 && j == 0){
                   colocaNumeroBombas(i, j, i + 1, j + 1,tablero);
                  }
                  else if (i == 0 && (j > 0 && j < tamano)) {
                   colocaNumeroBombas(i, j - 1, i + 1, j + 1,tablero);
                  }
                  else if(i == 0 && j == tamano){
                   colocaNumeroBombas(i, j - 1, i + 1, j,tablero);
                  }
                  else if(j == tamano && (i > 0 && i < tamano)){
                    colocaNumeroBombas(i - 1, j - 1, i + 1, j,tablero);
                  }
                  else if(i == tamano && j == tamano){
                    colocaNumeroBombas(i - 1, j - 1, i, j,tablero);
                  }
                  else if(i == tamano && (j > 0 && j < tamano)){
                    colocaNumeroBombas(i - 1, j - 1, i, j + 1,tablero);
                  }
                  else if(i == tamano && j == 0){
                    colocaNumeroBombas(i - 1, j, i, j + 1,tablero);
                  }
                  else if(j == 0 && (i > 0 && i < tamano)){
                    colocaNumeroBombas(i - 1, j, i + 1, j + 1,tablero);
                  }else{
                    colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1,tablero);
                  }
                }
              }
          }
      }
  
      function colocaNumeroBombas(vari,varj,fini,finj,tablero){
          for(let i = vari; i <= fini; i++){
              for(let j = varj; j <= finj; j++){			           
                if(tablero[i][j] != "*"){
                  tablero[i][j] = (parseInt(tablero[i][j])+1);		     
                }
              }
          }
      }
  
      function generarBombas(tablero){
          var fil = 0;
          var col = 0;
      fil = Math.floor((Math.random()*tamano)+0);
          col = Math.floor((Math.random()*tamano)+0);
      for(let i = 0; i < tamano; i++){
              while (tablero[fil][col] == "*"){
                  fil = Math.floor((Math.random()*tamano)+0);
                  col = Math.floor((Math.random()*tamano)+0);
              }
              tablero[fil][col] = "*";			
          }
          console.log(tablero);
      }
  
      function abrirCeros(vari,varj,fini,finj,cori,corj,tablero){
          for(let i = vari; i <= fini; i++){
            for(let j = varj; j <= finj; j++){		
                var myid = i+""+j;
                var objDiv =  document.getElementById(myid)	           
                if(objDiv.textContent == ""){			           		
                  if(tablero[i][j] == 0){			           			
                    if(i == cori && j == corj){			           				
                      objDiv.textContent = ""	; 
                      objDiv.style.backgroundColor = "#bfc3d6";	   
                    }else{
                      if(objDiv.style.backgroundColor != "#bfc3d6"){
                        abrirAlrededor(i, j,tablero);
                      }			           				
                    }
            }else{
                    if(tablero[i][j] != "*"){
                      document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + tablero[i][j] + "</p>"; 
                      objDiv.style.backgroundColor = "#bfc3d6";	
                    }
                  }			           			           		
                }			           
              }
          }
      }
  
      function abrirAlrededor(xi,xj,tablero){
          if(xi == 0 && xj == 0){
              abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj,tablero);
          }
          else if(xi == 0 && (xj > 0 && xj < tamano-1)){
              abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj,tablero);
          }
          else if(xi == 0 && xj == tamano-1){
              abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj,tablero);
          }
          else if(xj == tamano-1 && (xi > 0 && xi < tamano-1)){
              abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj,tablero);
          }
          else if(xi == tamano-1 && xj == tamano-1){
              abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj,tablero);
          }
          else if(xi == tamano-1 && (xj > 0 && xj < tamano-1)){
              abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj,tablero);
          }
          else if(xi == tamano-1 && xj == 0){
              abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj,tablero);
          }
          else if(xj == 0 && (xi > 0 && xi < tamano-1)){
              abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj,tablero);
          }else{
              abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj,tablero);
          }
      } 
  
      function abrirTablero(tablero){
          for(var i = 0; i < tamano; i++){
            for(var j = 0; j < tamano; j++){	
                var myid = i+""+j;
                var objDiv =  document.getElementById(myid);		     
                if(tablero[i][j] == "*"){			        		
                  objDiv.style.background="#f3f3f3 url('../statics/img/bomba.jpg') no-repeat right top";
                }
            }
          }
      }
    
    function cargarTablero(){
              crearTablero();
              generarBombas(minas);
              bombasAlrededor(minas);
      }
    
    jugar.addEventListener("click",()=>{
      cargarTablero();
    })
    
    
    
  })
