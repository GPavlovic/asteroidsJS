class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 2.5;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }

    Rotate(dir) {
        this.angle += this.rotateSpeed * dir
    }

    Update() {
        let radians = this.angle / Math.PI * 180;
        // If moving forward calculate the x and y speeds
        if (this.movingForward)
        {
            this.velX = Math.cos(radians) * this.speed;
            this.velY = Math.sin(radians) * this.speed;
        }
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
        // Reduce speed over time of the ship
        this.velX *= 0.99;
        this.velY *= 0.99;
        this.x -= this.velX;
        this.y -= this.velY;
    }

    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 3);
        let radians = this.angle / Math.PI * 180;
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
        for (let i = 0; i < 3; i++)
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