const VIRTUALHEIGHT = 224;
const VIRTUALWIDTH = 256;
const TILESIZE = 16;

class Entidad {
    constructor(xPos, yPos, tileSpanX, tileSpanY) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.tileSpanX = tileSpanX;
        this.tileSpanY = tileSpanY;
    }

    draw(ctx, scalingFactor) {
        
    }
}

class Pulpito extends Entidad {
    constructor(xPos, yPos, lives, maxBombsInBag, powerUp) {
        super(xPos, yPos, 1, 1)
        this.lives = lives;
        this.score = 0;
        this.maxBombsInBag = maxBombsInBag;
        this.powerUp = powerUp;
        this.powerUpTimer = 0;
    }
}