window.addEventListener("load", () => {
	const tablerominas = document.getElementById("tablerominas");
	document.getElementById("play").addEventListener("click", () => {
		window.location.reload();
	})

	let tamano = 8;
	let numBombas = 2;
	let puntaje;
	let perdido = false;
	let click = 0;
	let fecha = new Date();
	let inicio = Date.now();
	let minas;
	iniciarJuego();

	// Inicia el juego XD
	function iniciarJuego() {
		minas = matriz();
		crearTablero();
		generarBombas(minas);

		for (i of minas) {
			let cadena = "";
			for (j of i) {
				cadena += `, ${j}`
			}
			console.log(cadena)
		}

	}

    function terminar(){
        puntaje = ((Date.now()-inicio) / 1000);
        document.getElementById("mensaje").innerHTML = "<h2>¡FIN DEL JUEGO!</h1><br><h2>Tiempo(s): " + (Date.now()-inicio) / 1000 + "</h2>";
        var cantidadp = document.cookie = "puntaje=" + puntaje + "; expires=" + fecha.toGMTString(fecha.setTime(fecha.getTime() + 1000 * 60 * 30));
		console.log(cantidadp);
    }

	function perder() {
		perdido = true;
		document.getElementById("mensaje").innerHTML = "Has perdido... Da click en volver a jugar para intentar de nuevo"
		tablero(minas)	
	}

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

	//Se crean y agregan los divs de cada celda al html
	function crearTablero() {
		tablerominas.innerHTML = ""
		for (let i = 0; i < tamano; i++) {
			for (let j = 0; j < tamano; j++) {
				let div = document.createElement("div");
				div.classList.add("casilla-cerrada")
				div.classList.add("casilla")
				div.id = i + "" + j;
				//Se agrega el evento del click a cada celda.
				if (!perdido) {
					div.addEventListener("click", abrirCelda);
					div.addEventListener("contextmenu", (evento) => {
						evento.preventDefault();
						ponerBandera(div);
					})
					tablerominas.appendChild(div);
				}
			}
		}
	}

	// Cuenta un nuevo click y abre la casilla que recibió el evento
	function abrirCelda() {
		if (!perdido) {
			click++;
			let myId = this.id
			new Promise((resolve) => {
				abrirCasillasCercanas(myId[0], myId[1])
				resolve();
				console.log('hola')
			}). then(() => {
				console.log("xd")
				if (contarCasillasNoAbiertas() == numBombas) {
					terminar();

				}
			})
			

		}

	}

	function ponerBandera(div) {
		if (!perdido && !div.classList.contains("casilla-abierta")) {
			div.classList.toggle("casilla-bandera")
		}
	}

	// Función recursiva que abre la casilla que llega como parámetro e intenta abrir todas las casillas colindantes
	function abrirCasillasCercanas(x, y) {
		x = parseInt(x, 10);
		y = parseInt(y, 10);

		// Si la casilla está fuera del tablero, regresar
		if (x < 0 || x >= tamano || y < 0 || y >= tamano) {
			return;
		}
		// Mostrar el contenido de la casilla si tiene bombas cerca o tiene una bomba
		if (minas[x][y] != "*" && minas[x][y] != 0) {
			mostrarContenido(x, y)
		} else if (minas[x][y] == "*") {
			// Terminar juego si se ha abierto una bomba
			perder();
		} else if (minas[x][y] == 0) {
			// Abre la casilla vacía
			minas[x][y] = "_"
			mostrarContenido(x, y)

			// Intenta abrir todas las casillas alrededor
			for (let i = x - 1; i <= x + 1; i++) {
				for (let j = y - 1; j <= y + 1; j++) {
					abrirCasillasCercanas(i, j)

				}
			}
		}
	}

	// Muestra en el html el contenido de la casilla
	function mostrarContenido(x, y) {
		let id = `${x}${y}`;
		div = document.getElementById(id);
		div.classList.remove("casilla-bandera")
		div.classList.add("casilla-abierta");
		div.innerHTML = minas[x][y];
		div.classList.remove("casilla-cerrada")
	}

	//Coloca las bombas en una posicion aleatoria
	function generarBombas(tablero) {
		let fil = 0;
		let col = 0;
		for (let i = 0; i < numBombas; i++) {
			do {
				fil = Math.floor((Math.random() * tamano));
				col = Math.floor((Math.random() * tamano));
				console.log(fil, col)
			} while (tablero[fil][col] == "*");
			tablero[fil][col] = "*";

			for (let x = fil - 1; x <= fil + 1; x++) {
				for (let y = col - 1; y <= col + 1; y++) {
					if (!(x < 0 || x >= tamano || y < 0 || y >= tamano) && tablero[x][y] != "*") {
						tablero[x][y] = (parseInt(tablero[x][y]) + 1);
					}

				}
			}
		}
	}


	function contarCasillasNoAbiertas() {
		let casillas = 0;
		for (let i = 0; i < tamano; i++) {
			for (let j = 0; j < tamano; j++) {
				let myid = i + "" + j;
				let objDiv = document.getElementById(myid);
				if (objDiv.classList.contains("casilla-cerrada")) {
					casillas++;
				}
			}
		}
		return casillas;
	}

	//Muestra la posicion de las bombas en el tablero al perder
	function tablero(tablero) {
		for (let i = 0; i < tamano; i++) {
			for (let j = 0; j < tamano; j++) {
				let myid = i + "" + j;
				let objDiv = document.getElementById(myid);
				if (tablero[i][j] == "*") {
					objDiv.style.background = "#f3f3f3 url('../statics/img/bomba.jpg') no-repeat right top";
				}
			}
		}
	}

	// Inicia el juego XD
	function iniciarJuego() {
		minas = matriz();
		crearTablero();
		generarBombas(minas);

		for (i of minas) {
			let cadena = "";
			for (j of i) {
				cadena += `, ${j}`
			}
			console.log(cadena)
		}

	}

	// Date.now()-inicio) / 1000;


})
