const VIRTUALHEIGHT = 224;
const VIRTUALWIDTH = 256;
const TILESIZE = 16;
const SPRITESIZE = 16;
const FRAMERATE = 60;
const FRAMETIME = 1000 / FRAMERATE;


class Entidad {
	constructor(spriteSheetPath, xPos, yPos) {
		let spriteSheet = new Image();
		spriteSheet.src = spriteSheetPath;

		this.spriteSheet = spriteSheet;

		this.spritePos = [0, 0]
		this.xPos = xPos;
		this.yPos = yPos;
		this.creationTime = Date.now();
		this.lastAnimationTime = this.creationTime;

	}

	draw(ctx, scalingFactor) {



		ctx.drawImage(this.spriteSheet, SPRITESIZE * this.spritePos[0], SPRITESIZE * this.spritePos[1], SPRITESIZE, SPRITESIZE, this.xPos * scalingFactor, this.yPos * scalingFactor, (TILESIZE) * scalingFactor, (TILESIZE) * scalingFactor)
	}
}

class Pulpito extends Entidad {
	constructor(xPos, yPos, spriteSheetPath,) {
		super(spriteSheetPath, xPos, yPos)

		this.lives = 1;
		this.score = 0;
		this.maxBombsInBag = 1;
		this.powerUp = null;
		this.powerUpTimer = 0;
		this.direction = [false, false, false, false] // Indica si se mueve hacia arriba, abajo, izquierda y derecha
		this.insideBomb = false;
		this.bombExplosionSize = 1;
	}

	isAlive() {
		return this.lives > 0;
	}
	animate() {
		let now = Date.now();

		if (now - this.lastAnimationTime > 100) {
			if (this.isAlive()) {
				this.spritePos[1] = 1;
				this.spritePos[0] = (this.spritePos[0] + 1) % (this.spriteSheet.width / TILESIZE);
			} else {
				this.spritePos[1] = 0;
				if (this.spritePos[0] < this.spriteSheet.width / TILESIZE - 1) {
					this.spritePos[0]++;
				}
			}

			this.lastAnimationTime = now;
		}



		if (!this.direction[0] && !this.direction[1] && !this.direction[2] && !this.direction[3] && this.isAlive() > 0) {
			this.spritePos[0] = 0;
			this.spritePos[1] = 0;
		}

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

	collides(tile) {
		if (tile !== null &&
			this.xPos < tile.xPos + TILESIZE &&
			this.xPos + TILESIZE - 1 > tile.xPos &&
			this.yPos < tile.yPos + TILESIZE &&
			this.yPos + TILESIZE - 1 > tile.yPos) {
			return true;
		}
		return false;
	}

	isInsideBomb() {
		let x = Math.trunc(this.xPos / TILESIZE);
		let y = Math.trunc(this.yPos / TILESIZE);

		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				let tile = map.getTileContent(i, j);
				if (this.collides(tile) && tile instanceof Bomba) {
					return true;
				}
			}
		}
		return false;
	}

	update(end) {

		if (this.isAlive() > 0 && !end) {
			this.move()

			if (!this.isInsideBomb()) {
				this.insideBomb = false;
			}
			console.log("xd")
		}


		this.animate()

		let inExplosion = false;
		let x = Math.trunc(this.xPos / TILESIZE);
		let y = Math.trunc(this.yPos / TILESIZE);

		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				let tile = map.getTileContent(i, j);
				if (this.collides(tile) && tile instanceof Explosion) {
					inExplosion = true;
				}
			}
		}
		if (inExplosion) {
			this.lives--;
		}
	}

	move() {

		let tiles = [];
		let tilesCollide = [];
		if (this.direction[0] && !this.direction[1]) {
			this.yPos--;

			tiles[0] = map.getTileContent(Math.trunc(this.xPos / TILESIZE),
				Math.trunc(this.yPos / TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE) / TILESIZE),
				Math.trunc(this.yPos / TILESIZE));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}

			if (tilesCollide[0] || tilesCollide[1]) {
				if (tiles[0] instanceof Explosion || tiles[1] instanceof Explosion) {
					this.lives--;
				}
				this.yPos++;
			}
		} else if (!this.direction[0] && this.direction[1]) {
			this.yPos++;

			tiles[0] = map.getTileContent(Math.trunc(this.xPos / TILESIZE),
				Math.trunc((this.yPos + TILESIZE) / TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE) / TILESIZE),
				Math.trunc((this.yPos + TILESIZE) / TILESIZE));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {
				if (tiles[0] instanceof Explosion || tiles[1] instanceof Explosion) {
					this.lives--;
				}
				this.yPos--;
			}
		}

		if (this.direction[2] && !this.direction[3]) {
			this.xPos--;

			tiles[0] = map.getTileContent(Math.trunc(this.xPos / TILESIZE),
				Math.trunc(this.yPos / TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos) / TILESIZE),
				Math.trunc((this.yPos / TILESIZE) + 1));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {
				if (tiles[0] instanceof Explosion || tiles[1] instanceof Explosion) {
					this.lives--;
				}
				this.xPos++;
			}

		} else if (!this.direction[2] && this.direction[3]) {
			this.xPos++;

			tiles[0] = map.getTileContent(Math.trunc((this.xPos + TILESIZE) / TILESIZE),
				Math.trunc(this.yPos / TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE) / TILESIZE),
				Math.trunc((this.yPos / TILESIZE) + 1));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {
				if (tiles[0] instanceof Explosion || tiles[1] instanceof Explosion) {
					this.lives--;
				}
				this.xPos--;
			}
		} else {
			tiles[0] = map.getTileContent(Math.trunc((this.xPos + TILESIZE) / TILESIZE),
				Math.trunc(this.yPos / TILESIZE));
			tiles[1] = map.getTileContent(Math.trunc((this.xPos + TILESIZE) / TILESIZE),
				Math.trunc((this.yPos / TILESIZE) + 1));
			tiles[2] = map.getTileContent(Math.trunc(((this.xPos + TILESIZE) / TILESIZE) + 1),
				Math.trunc((this.yPos / TILESIZE) + 1));
			tiles[3] = map.getTileContent(Math.trunc(((this.xPos + TILESIZE) / TILESIZE) + 1),
				Math.trunc((this.yPos / TILESIZE)));

			tilesCollide[0] = this.collides(tiles[0]);
			tilesCollide[1] = this.collides(tiles[1]);

			if (tiles[0] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[0] = false;
			}
			if (tiles[1] instanceof Bomba && this.insideBomb == true) {
				tilesCollide[1] = false;
			}


			if (tilesCollide[0] || tilesCollide[1]) {
				if (tiles[0] instanceof Explosion || tiles[1] instanceof Explosion) {
					this.lives--;
				}
			}
		}
	}

	placeBomb() {
		let x = Math.trunc(this.xPos / TILESIZE);
		if (this.xPos % TILESIZE > TILESIZE / 2) {
			x++;
		}
		let y = Math.trunc(this.yPos / TILESIZE);
		if (this.yPos % TILESIZE > TILESIZE / 2) {
			y++;
		}
		map.setTileContent(x, y, new Bomba(x, y, this.bombExplosionSize))
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
	constructor(x, y, explosionSize) {
		super(x, y);
		this.explosionSize = explosionSize;
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/bomb_spritesheet.png";
		this.spriteSheet = spriteSheet;
		this.explisionTime = 3000;

	}

	animate() {
		let now = Date.now();

		if (now - this.lastAnimationTime > 500) {
			this.spritePos[0] = (this.spritePos[0] + 1) % (this.spriteSheet.width / TILESIZE);
			this.lastAnimationTime = now;
		}
	}

	explode() {

		// Para nada necesita ser así de complicado, pero se ve chido xd
		for (let i = 0; i < Math.PI * 2; i += (Math.PI / 2)) {
			let x = Math.trunc(this.xPos / TILESIZE);
			let y = Math.trunc(this.yPos / TILESIZE);
			let dx = Math.round(Math.cos(i));
			let dy = Math.round(Math.sin(i));
			let limite = false;
			for (let j = 0; j <= this.explosionSize && !limite; j++) {
				tile = map.getTileContent(x, y);
				if (!(tile instanceof Pilar)) {
					if (tile instanceof Bomba && j != 0) {
						tile.explode();
					} else {
						if (tile instanceof Caja) {
							limite = true;
						}
						map.setTileContent(x, y, new Explosion(x, y))
					}
					x += dx;
					y += dy;
				} else {
					limite = true;
				}
			}
		}
	}

	update() {
		let now = Date.now();
		this.animate();
		if (now - this.creationTime > this.explisionTime) {

			this.explode();
		}
	}
}

class Explosion extends Bloque {
	constructor(x, y) {
		super(x, y);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/explosion.png";
		this.spriteSheet = spriteSheet;
	}

	animate(forwards, now) {
		if (forwards && now - this.lastAnimationTime > FRAMETIME && this.spritePos[0] < 3) {
			this.spritePos[0]++;
			this.lastAnimationTime = now;
		} else if (!forwards) {
			if (this.spritePos[0] > 0) {
				this.spritePos[0]--;
				this.lastAnimationTime = now;
			} else {
				let x = Math.trunc(this.xPos / TILESIZE);
				let y = Math.trunc(this.yPos / TILESIZE);
				map.setTileContent(x, y, null);
			}


		}
	}
	update() {
		let now = Date.now()
		this.animate(true, now);
		if (now - this.creationTime > 1000) {
			this.animate(false, now)
		}
	}
}



let map = Array.from(Array((VIRTUALHEIGHT / TILESIZE) - 1), () =>
	Array.from(Array((VIRTUALWIDTH / TILESIZE)), () => null));

map.initialise = function (x, y) {
	if ((y == 0 || y == map.length - 1) || (x == 0 || x == map[y].length - 1)) {
		map.setTileContent(x, y, new Pilar(x, y))
	} else if (y % 2 == 0 && x % 2 == 0) {
		map.setTileContent(x, y, new Pilar(x, y))
	} else if (!((y <= 3 || y >= map.length - 4) && (x <= 3 || x >= map[y].length - 4)) && Math.random() > 0.5) {
		map.setTileContent(x, y, new Caja(x, y))
	} else {
		map.setTileContent(x, y, null)
	}
}

map.setTileContent = function (x, y, object) {
	if (object instanceof Bloque || object === null) {
		map[y][x] = object;
	}
}

map.getTileContent = function (x, y) {
	return map[y][x];
}

map.updateTile = function (x, y) {
	tile = map.getTileContent(x, y);
	if (tile instanceof Bomba || tile instanceof Explosion) {
		tile.update();
	}
}

map.drawElements = function (ctx, factor) {
	for (y in map) {
		for (x in map[y]) {
			if (map[y][x] instanceof Entidad) {
				map[y][x].draw(ctx, factor);
			}
		}
	}
}

map.iterateOverMap = function (callback) {
	for (let y in map) {
		for (let x in map[y]) {
			callback(x, y);
		}
	}
}