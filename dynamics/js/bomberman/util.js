const VIRTUALHEIGHT = 224;
const VIRTUALWIDTH = 256;
const TILESIZE = 16;
const SPRITESIZE = 16;



class Entidad {
	constructor(spriteSheet, xPos, yPos) {
		this.spriteSheet = spriteSheet;
		this.spritePos =  [0,0]
		this.xPos = xPos;
		this.yPos = yPos;
	}

	draw(ctx, scalingFactor) {
		// Evitar que se aplique Anti-Aliasing, que volvería la imagen borrosa
		ctx.imageSmoothingEnabled = false;


		ctx.drawImage(this.spriteSheet, SPRITESIZE * this.spritePos[0], SPRITESIZE * this.spritePos[1], SPRITESIZE, SPRITESIZE, this.xPos * scalingFactor, this.yPos * scalingFactor, (TILESIZE) * scalingFactor, (TILESIZE) * scalingFactor)
	}
}

class Pulpito extends Entidad {
	constructor(xPos, yPos, lives, maxBombsInBag, powerUp) {
		super(null, xPos, yPos)

		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/pulpito_sprite_sheet_lq.png";
		this.spriteSheet = spriteSheet
		this.lives = lives;
		this.score = 0;
		this.maxBombsInBag = maxBombsInBag;
		this.powerUp = powerUp;
		this.powerUpTimer = 0;
		this.direction = [false, false, false, false] // Indica si se mueve hacia arriba, abajo, izquierda y derecha
		this.insideBomb = false;
	}

	setUpDirection(n) {
		this.direction[0] = n;
	}
	setDownDirection(n) {
		this.direction[1] = n;
	}
	setLeftDirection(n) {
		this.direction[2] = n;
	}
	setRightDirection(n) {
		this.direction[3] = n;
	}

	collides(tile,) {
		if (tile !== null &&
			this.xPos < tile.xPos + TILESIZE && 
			this.xPos + TILESIZE - 1 > tile.xPos &&
			this.yPos < tile.yPos + TILESIZE &&
			this.yPos + TILESIZE - 1 > tile.yPos) {
				return true;
			}
		return false;
	}

	checkIfInsideBomb() {
		let x = Math.trunc(this.xPos/TILESIZE);
		let y = Math.trunc(this.yPos/TILESIZE);

		for (let i = x-1; i <= x+1; i++) {
			for (let j = y-1; j <= y+1; j++) {
				let tile = map.getTileContent(i, j);
				if (this.collides(tile) && tile instanceof Bomba) {
					return true;
				}
			}	
		}
		return false;
	}

	move() {

		let tiles = [];
		let tilesCollide = [];
		if (this.direction[0] && !this.direction[1]) {
			this.yPos--;

			tiles[0] = map.getTileContent(Math.trunc(this.xPos/TILESIZE), 
				Math.trunc(this.yPos/TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE)/TILESIZE), 
				Math.trunc(this.yPos/TILESIZE));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}

			if (tilesCollide[0] || tilesCollide[1]) {

				this.yPos++;
				// if (tilesCollide[0] && this.xPos > tiles[0].xPos + (TILESIZE / 2)) {
				// 	this.xPos++;
				// }
				// if (tilesCollide[1] && this.xPos + TILESIZE < tiles[1].xPos + (TILESIZE / 2)) {
				// 	this.xPos--;
				// }
			}
		} else if (!this.direction[0] && this.direction[1]) {
			this.yPos++;

			tiles[0] = map.getTileContent(Math.trunc(this.xPos/TILESIZE), 
				Math.trunc((this.yPos + TILESIZE)/TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE)/TILESIZE), 
				Math.trunc((this.yPos + TILESIZE)/TILESIZE));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {
					
				this.yPos--;
				// if (tilesCollide[0] && this.xPos > tiles[0].xPos + (TILESIZE / 2)) {
				// 	this.xPos++;
				// }
				// if (tilesCollide[1] && this.xPos + TILESIZE < tiles[1].xPos + (TILESIZE / 2)) {
				// 	this.xPos--;
				// }
			}
		}

		if (this.direction[2] && !this.direction[3]) {
			this.xPos--;

			tiles[0] = map.getTileContent(Math.trunc(this.xPos/TILESIZE), 
			Math.trunc(this.yPos/TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos)/TILESIZE), 
			Math.trunc((this.yPos/TILESIZE) + 1));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {

				this.xPos++;
				// if (tilesCollide[0] && this.yPos > tiles[0].xPos + (TILESIZE / 2)) {
				// 	this.yPos++;
				// }
				// if (tilesCollide[1] && this.yPos + TILESIZE < tiles[1].yPos + (TILESIZE / 2)) {
				// 	this.yPos--;
				// }
			}

		} else if (!this.direction[2] && this.direction[3]) {
			this.xPos++;

			tiles[0] = map.getTileContent(Math.trunc((this.xPos + TILESIZE)/TILESIZE), 
				Math.trunc(this.yPos/TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE)/TILESIZE), 
				Math.trunc((this.yPos/TILESIZE) + 1));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {

				this.xPos--;
				// if (tilesCollide[0] && this.yPos > tiles[0].xPos + (TILESIZE / 2)) {
				// 	this.yPos++;
				// }
				// if (tilesCollide[1] && this.yPos + TILESIZE < tiles[1].yPos + (TILESIZE / 2)) {
				// 	this.yPos--;
				// }
			}
		}
		if (!this.checkIfInsideBomb()) {
			this.insideBomb = false;
		}
	}

	placeBomb() {
		let x = Math.trunc(this.xPos/TILESIZE);
		if (this.xPos % TILESIZE > TILESIZE/2) {
			x++;
		}
		let y = Math.trunc(this.yPos/TILESIZE);
		if (this.yPos % TILESIZE > TILESIZE/2) {
			y++;
		}
		map.setTileContent(x, y, new Bomba(x,y))
		this.insideBomb = true;
	}
}

class Bloque extends Entidad {
	constructor(x, y) {
		super(null, TILESIZE * x, TILESIZE * y)
	}
}

class Pilar extends Bloque {
	constructor(x, y) {
		super(x, y);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/pilar.png";
		this.spriteSheet = spriteSheet;
	}
}

class Caja extends Bloque {
	constructor(x, y) {
		super(x, y);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;
	}
}

class Bomba extends Bloque {
	constructor(x, y) {
		super(x, y);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/bomb_spritesheet.png";
		this.spriteSheet = spriteSheet;
	}
}

class Explosion extends Bloque {
	constructor(x, y) {
		super(x, y);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;
	}
}



let map = Array.from(Array((VIRTUALHEIGHT / TILESIZE) -1), () => 
    Array.from(Array((VIRTUALWIDTH / TILESIZE)), () => null));

map.initialise = function(x, y) {
	if ((y == 0 || y == map.length-1) || (x == 0 || x == map[y].length-1)) {
		map.setTileContent(x, y, new Pilar(x, y))
	} else if (y % 2 == 0 && x % 2 == 0) {
		map.setTileContent(x, y, new Pilar(x, y))
	} else if (!((y <= 3 || y>= map.length-4 ) && (x <= 3 || x >= map[y].length-4 )) && Math.random() > 0.5) {
		map.setTileContent(x, y, new Caja(x, y))
	}
}

map.setTileContent = function(x, y, object) {
	if (object instanceof Bloque) {
		map[y][x] = object;
	}
}

map.getTileContent = function(x, y) {
	return map[y][x];
}

map.drawElements = function(ctx, factor) {
	for (y in map) {
		for (x in map[y]) {
			if (map[y][x] instanceof Entidad) {
				map[y][x].draw(ctx, factor);
			}
		}
	}
}

map.iterateOverMap = function(callback) {
	for (let y in map) {
		for (let x in map[y]) {
			callback(x, y);
		}
	}
}