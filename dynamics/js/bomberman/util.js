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
	}
}

class Bloque extends Entidad {
	constructor(x, y, colisionable) {
		super(null, TILESIZE * x, TILESIZE * y)
	}
}

class Suelo extends Bloque {
	constructor(x, y) {
		super(x, y, false);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;

	}
}

class Pilar extends Bloque {
	constructor(x, y) {
		super(x, y, true);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;
	}
}

class Caja extends Bloque {
	constructor(x, y) {
		super(x, y, true);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;
	}
}

class Bomba extends Bloque {
	constructor(x, y) {
		super(x, y, true);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;
	}
}

class Explosion extends Bloque {
	constructor(x, y) {
		super(x, y, true);
		let spriteSheet = new Image();
		spriteSheet.src = "../statics/img/bomberman/sprites/crate.png";
		this.spriteSheet = spriteSheet;
	}
}

let map = Array.from(Array((VIRTUALHEIGHT / TILESIZE) -1), () => 
    Array.from(Array((VIRTUALWIDTH / TILESIZE)), () => null));

map.inicializar = function(x, y) {
	if ((y == 0 || y == map.length-1) || (x == 0 || x == map[y].length-1)) {
		map.setContentOfTile(x, y, new Pulpito(x*TILESIZE, y*TILESIZE, 1, 1, null))
	} else if (y % 2 == 0 && x % 2 == 0) {
		map.setContentOfTile(x, y, new Pulpito(x*TILESIZE, y*TILESIZE, 1, 1, null))
	}
}

map.setContentOfTile = function(x, y, object) {
	if (object instanceof Entidad) {
		map[y][x] = object;
	}
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