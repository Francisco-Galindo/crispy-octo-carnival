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

	avoidOverlaps() {
		let mainTile = [Math.max(0, Math.trunc(this.xPos/TILESIZE)), Math.max(Math.trunc(this.yPos/TILESIZE))]
		let tiles = [mainTile];
		tiles.push([mainTile[0] + 1, mainTile[1]]);
		tiles.push([mainTile[0], mainTile[1] + 1]);
		tiles.push([mainTile[0] + 1, mainTile[1] + 1]);

		for (let tileIndex in tiles) {

			let tileContent = map.getTileContent(tiles[tileIndex][0], tiles[tileIndex][1]);
			if (tileContent instanceof Pilar && this.collides(tileContent)) {
				if (tileIndex == 0) {
					if (this.direction[0]) {
						this.yPos++;
						if (this.collides(tileContent)) {
							this.yPos--;
						}
						if (this.xPos > tileContent.xPos + (TILESIZE / 2)) {
							this.xPos++;
						}
					}
					if (this.direction[2]) {
						this.xPos++;
						if (this.collides(tileContent)) {
							this.xPos--;
						}
						if (this.yPos > tileContent.yPos + (TILESIZE / 2)) {
							this.yPos++;
						}
					}
				}
				if (tileIndex == 1) {
					if (this.direction[0]) {
						this.yPos++;
						if (this.collides(tileContent)) {
							this.yPos--;
						}
						if (this.xPos + TILESIZE < tileContent.xPos + (TILESIZE / 2)) {
							this.xPos--;
						}
					}
					if (this.direction[3]) {
						this.xPos--;
						if (this.collides(tileContent)) {
							this.xPos++;
						}
						if (this.yPos > tileContent.yPos + (TILESIZE / 2)) {
							this.yPos++;
						}
					}
				}
				if (tileIndex == 2) {
					if (this.direction[1]) {
						this.yPos--;
						if (this.collides(tileContent)) {
							this.yPos++;
						}
						if (this.xPos > tileContent.xPos + (TILESIZE / 2)) {
							this.xPos++;
						}
					}
					if (this.direction[2]) {
						this.xPos++;
						if (this.collides(tileContent)) {
							this.xPos--;
						}
						if (this.yPos + (TILESIZE / 2) < tileContent.yPos) {
							this.yPos--;
						}
					}
				}
				if (tileIndex == 3) {
					if (this.direction[1]) {
						this.yPos--;
						if (this.collides(tileContent)) {
							this.yPos++;
						}
						if (this.xPos + (TILESIZE / 2) < tileContent.xPos) {
							this.xPos--;
						}
					}
					if (this.direction[3]) {
						this.xPos--;
						if (this.collides(tileContent)) {
							this.xPos++;
						}
						if (this.yPos + (TILESIZE / 2) < tileContent.yPos) {
							this.yPos--;
						}
					}
				}

			}
		}
	}

	collides(tile) {
		if (this.xPos < tile.xPos + TILESIZE && 
			this.xPos + TILESIZE > tile.xPos &&
			this.yPos < tile.yPos + TILESIZE &&
			this.yPos + TILESIZE > tile.yPos) {
				return true;
			}
		return false;
	}

	move() {

		if (this.direction[0] && !this.direction[1]) {
			this.yPos--;
		} else if (!this.direction[0] && this.direction[1]) {
			this.yPos++;
		}

		if (this.direction[2] && !this.direction[3]) {
			this.xPos--;
		} else if (!this.direction[2] && this.direction[3]) {
			this.xPos++;
		}
		this.avoidOverlaps()
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
		spriteSheet.src = "../statics/img/bomberman/sprites/bomb.png";
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
	} else if (Math.random() > 0.5) {
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