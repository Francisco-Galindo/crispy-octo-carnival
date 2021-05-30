const VIRTUALHEIGHT = 224;
const VIRTUALWIDTH = 256;
const TILESIZE = 16;
const SPRITESIZE = 16;

let map = Array.from(Array((VIRTUALHEIGHT / TILESIZE) -2), () => 
    Array.from(Array((VIRTUALWIDTH / TILESIZE)), () => null));

map[0][0] = "lel"
map[1][0] = "lel"


class Entidad {
	constructor(spriteSheet, xPos, yPos, tileSpanX, tileSpanY) {
		this.spriteSheet = spriteSheet;
		this.spritePos =  [0,0]
		this.xPos = xPos;
		this.yPos = yPos;
		this.tileSpanX = tileSpanX;
		this.tileSpanY = tileSpanY;
	}

	draw(ctx, scalingFactor) {
		// Evitar que se aplique Anti-Aliasing, que volvería la imagen borrosa
		ctx.imageSmoothingEnabled = false;


		ctx.drawImage(this.spriteSheet, SPRITESIZE * this.spritePos[0], SPRITESIZE * this.spritePos[1], SPRITESIZE, SPRITESIZE, this.xPos * scalingFactor, this.yPos * scalingFactor, (this.tileSpanX * TILESIZE) * scalingFactor, (this.tileSpanY * TILESIZE) * scalingFactor)
	}
}

class Pulpito extends Entidad {
	constructor(xPos, yPos, lives, maxBombsInBag, powerUp) {
		super(null, xPos, yPos, 1, 1)

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