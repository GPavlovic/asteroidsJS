class Asteroid {
    constructor(x, y, radius, level, collisionRadius) {
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 1;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        this.level = level || 1;
    }

    Update() {
        let radians = this.angle / Math.PI * 2;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        // If we get to any edges of the screen, move to the opposite edge
        if (this.x < this.radius)
        {
            this.x = canvas.width;
        }
        if (this.x > canvas.width)
        {
            this.x = this.radius;
        }
        if (this.y < this.radius)
        {
            this.y = canvas.height;
        }
        if (this.y > canvas.height)
        {
            this.y = this.radius
        }
    }

    Draw() {
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        let radians = vertAngle / Math.PI * 180;
        for (let i = 0; i < 6; i++)
        {
            ctx.lineTo(
                this.x - this.radius * Math.cos(vertAngle * i + radians),
                this.y - this.radius * Math.sin(vertAngle * i + radians)
            );
        }
        ctx.closePath();
        ctx.stroke();
    }
}