window.addEventListener("load", () => {
	const jugar = document.getElementById("play");
	const salvar = document.getElementById("Save");
  const tablerominas = document.getElementById("tablerominas");

	let tamano = 8;
	let puntaje = 0;
	let perder = 0;

	var fecha = new Date();

	var minas = matriz();

	//Se crea una matriz del tamaño de la variable tamano, tanto de numero de columnas como de filas
	function matriz() {
		const tabla = [];
		for (let i = 0; i < tamano; i++) {
			tabla[i] = [];
			for (let j = 0; j < tamano; j++) {
				tabla[i][j] = 0;
			}
		}
		return tabla;
	}

	let click = 0;

	//Se crean y agregan los divs de cada celda al html
	function crearTablero() {
		for (let i = 0; i < tamano; i++) {
			for (var j = 0; j < tamano; j++) {
				var div = document.createElement("div");
				div.id = i + "" + j;
				//Se agrega el evento del click a cada celda.
				if (perder == 0) {
					div.addEventListener("click", numero);
					tablerominas.appendChild(div);
				}
			}
		}
	}

	function numero(e) {
		//El id del elemento clickeado se almacena en el arreglo auxstr.
		var auxstr = this.id.split("");
		var myid = auxstr[0] + auxstr[1];
		divObj = document.getElementById(this.id);
		click++;
		if (click == 1) {
			//A la variable click se le suma de a uno cada vez que entra a la funcion, si despues de casi medio segundo no se ha dado otro click se verifica el valor que se posee la matriz en esas coordenadas; si se dio un segundo click entonces se coloca una banderita en las coordenadas de la matriz.
			setTimeout(function () {
				if (click == 1) {
					click = 0;
					//si la coordenada es igual a 0 se cambia el color y se llama a la funcion de alrededor.
					if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] == 0) {
						alrededor(parseInt(auxstr[0], 10), parseInt(auxstr[1], 10), minas);
						divObj.style.background = "#bfc3d6 url('none') no-repeat right top";
						puntaje += 200;
					} else {
						//si la coordenada no es igual a 0 pero tampoco es igual a * se muestra el valor de las posibles minas que tiene a su alrededor.
						if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] != "*") {
							document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] + "</p>";
							divObj.style.background = "#bfc3d6 url('none') no-repeat right top";
							puntaje += 300;
						} else {
							//Y si no es igual a 0 pero si igual al * se muestran las ubicaciones en donde estan bombas.
							divObj.style.background = "#f3f3f3 url('../statics/img/bomba.jpg') no-repeat right top";
							tablero(minas);
							perder = 1;
						}
					}
				} else {
					divObj.style.background = "#f3f3f3 url('../statics/img/bandera.png') no-repeat right top";
					if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] == "*") {
						puntaje += 100;
					}
				}
				click = 0;
			}, 300)
		}
		if (perder == 1) {
			document.body.innerHTML = "<h1>FIN DEL JUEGO!!!</h1><br><h2>Puntaje:" + puntaje + "</h2>";
			fecha.setTime(fecha.getTime() + 1000*60*24*7);
			var nuevaCookie= document.cookie="Puntaje="+ puntaje +"; expires="+ fecha.toUTCString();
			alert(nuevaCookie);
		}
	}

	//Recorre toda la matriz buscando las bombas marcadas con astericos para despues colocar el numero de bombas en las celdas de los alrededores.
	function bombasAlrededor(tablero) {
		for (var i = 0; i < tamano; i++) {
			for (var j = 0; j < tamano; j++) {
				if (tablero[i][j] == "*") {
					if (i == 0 && j == 0) {
						colocaNumeroBombas(i, j, i + 1, j + 1, tablero);
					}
					else if (i == 0 && (j > 0 && j < tamano)) {
						colocaNumeroBombas(i, j - 1, i + 1, j + 1, tablero);
					}
					else if (i == 0 && j == tamano) {
						colocaNumeroBombas(i, j - 1, i + 1, j, tablero);
					}
					else if (j == tamano && (i > 0 && i < tamano)) {
						colocaNumeroBombas(i - 1, j - 1, i + 1, j, tablero);
					}
					else if (i == tamano && j == tamano) {
						colocaNumeroBombas(i - 1, j - 1, i, j, tablero);
					}
					else if (i == tamano && (j > 0 && j < tamano)) {
						colocaNumeroBombas(i - 1, j - 1, i, j + 1, tablero);
					}
					else if (i == tamano && j == 0) {
						colocaNumeroBombas(i - 1, j, i, j + 1, tablero);
					}
					else if (j == 0 && (i > 0 && i < tamano)) {
						colocaNumeroBombas(i - 1, j, i + 1, j + 1, tablero);
					} else {
						colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1, tablero);
					}
				}
			}
		}
	}

	//Suma en uno los valores al rededor de las bombas.
	function colocaNumeroBombas(vari, varj, fini, finj, tablero) {
		for (let i = vari; i <= fini; i++) {
			for (let j = varj; j <= finj; j++) {
				if (tablero[i][j] != "*") {
					tablero[i][j] = (parseInt(tablero[i][j]) + 1);
				}
			}
		}
	}

	//Coloca las bombas en una posicion aleatoria
	function generarBombas(tablero) {
		var fil = 0;
		var col = 0;
		for (let i = 0; i < tamano; i++) {
			fil = Math.floor((Math.random() * tamano) + 0);
			col = Math.floor((Math.random() * tamano) + 0);
			tablero[fil][col] = "*";
		}
		console.log(tablero);
	}

	//Remplaza el 0 de la celda picada por un " " 
	function ceros(vari, varj, fini, finj, cori, corj, tablero) {
		for (let i = vari; i <= fini; i++) {
			for (let j = varj; j <= finj; j++) {
				var myid = i + "" + j;
				var objDiv = document.getElementById(myid)
				if (objDiv.textContent == "") {
					if (tablero[i][j] == 0) {
						objDiv.textContent = "";
						objDiv.style.backgroundColor = "#bfc3d6";
					} else {
						if (tablero[i][j] != "*") {
							document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + tablero[i][j] + "</p>";
							objDiv.style.backgroundColor = "#bfc3d6";
						}
					}
				}
			}
		}
	}

	//Abre las casillas alrededor de la casilla clickeada.
	function alrededor(xi, xj, tablero) {
		if (xi == 0 && xj == 0) {
			ceros(xi, xj, xi + 1, xj + 1, xi, xj, tablero);
		}
		else if (xi == 0 && (xj > 0 && xj < tamano - 1)) {
			ceros(xi, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
		}
		else if (xi == 0 && xj == tamano - 1) {
			ceros(xi, xj - 1, xi + 1, xj, xi, xj, tablero);
		}
		else if (xj == tamano - 1 && (xi > 0 && xi < tamano - 1)) {
			ceros(xi - 1, xj - 1, xi + 1, xj, xi, xj, tablero);
		}
		else if (xi == tamano - 1 && xj == tamano - 1) {
			ceros(xi - 1, xj - 1, xi, xj, xi, xj, tablero);
		}
		else if (xi == tamano - 1 && (xj > 0 && xj < tamano - 1)) {
			ceros(xi - 1, xj - 1, xi, xj + 1, xi, xj, tablero);
		}
		else if (xi == tamano - 1 && xj == 0) {
			ceros(xi - 1, xj, xi, xj + 1, xi, xj, tablero);
		}
		else if (xj == 0 && (xi > 0 && xi < tamano - 1)) {
			ceros(xi - 1, xj, xi + 1, xj + 1, xi, xj, tablero);
		} else {
			ceros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
		}
	}

	//Muestra la posicion de las bombas en el tablero al perder
	function tablero(tablero) {
		for (var i = 0; i < tamano; i++) {
			for (var j = 0; j < tamano; j++) {
				var myid = i + "" + j;
				var objDiv = document.getElementById(myid);
				if (tablero[i][j] == "*") {
					objDiv.style.background = "#f3f3f3 url('../statics/img/bomba.jpg') no-repeat right top";
				}
			}
		}
	}

	function iniciarJuego() {
		crearTablero();
		generarBombas(minas);
		bombasAlrededor(minas);
	}

	jugar.addEventListener("click", () => {
		iniciarJuego();
	})

	salvar.addEventListener("click", () => {
		document.body.innerHTML = "<h1>FIN DEL JUEGO!!!</h1><br><h2>Puntaje:" + puntaje + "</h2>";
		fecha.setTime(fecha.getTime() + 1000*60*24*7);
		var nuevaCookie= document.cookie="Puntaje="+ puntaje +"; expires="+ fecha.toUTCString();
		document.cookie = "prueba=cookie";
		alert(nuevaCookie);
	})

})
