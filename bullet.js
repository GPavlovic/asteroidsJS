class Bullet {
    constructor(
        angle
    ) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }

    Update() {
        var radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }

    Draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}