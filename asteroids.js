let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let ship;
let keys = [];
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvasWidth = document.getElementById('container').clientWidth;
    canvasHeight = document.getElementById('container').clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ship = new Ship();

    for (let i = 0; i < 8; i++)
    {
        asteroids.push(new Asteroid());
    }

    document.body.addEventListener('keydown', function (e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener('keyup', function (e) {
        keys[e.keyCode] = false;
        if (e.keyCode == 32) // Space
        {
            bullets.push(new Bullet(ship.angle));
        }
    });
    Render();
}

function CircleCollisions(p1x, p1y, r1, p2x, p2y, r2) {
    const radiusSum = r1 + r2;
    const xDiff = p1x - p2x;
    const yDiff = p1y - p2y;;
    if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff)))
    {
        return true;
    }
    return false;
}

function DrawLifeShips() {
    let startX = canvasWidth - 50;
    let startY = 10;
    let points = [[9, 9], [-9, 9]];
    ctx.strokeStyle = 'white';
    for (let i = 0; i < lives; i++)
    {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let j = 0; j < points.length; j++)
        {
            ctx.lineTo(startX + points[j][0], startY + points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX -= 30;
    }
}

function Render() {
    ship.movingForward = (keys[87]); //W
    if (keys[68]) //D
    {
        ship.Rotate(1);
    }
    if (keys[65]) //A
    {
        ship.Rotate(-1);
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText('SCORE: ' + score.toString(), 20, 35);
    if (lives <= 0)
    {
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', canvasWidth / 2 - 150, canvasHeight / 2);
    }
    DrawLifeShips();

    if (asteroids.length > 0)
    {
        asteroids.map((a, i) => {
            if (CircleCollisions(ship.x, ship.y, 11, a.x, a.y, a.collisionRadius))
            {
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1;
            }
        });
    }

    if (bullets.length > 0)
    {
        loop1:
        for (let b = 0; b < bullets.length; b++)
        {
            // If we get to any edges of the screen, delete the bullet
            if (bullets[b].x < bullets[b].radius
                || bullets[b].x > canvas.width
                || bullets[b].y < bullets[b].radius
                || bullets[b].y > canvas.height)
            {
                bullets.splice(b, 1);
                break loop1;
            }
        }
    }

    if (asteroids.length > 0
        && bullets.length > 0)
    {
        loop1:
        for (let a = 0; a < asteroids.length; a++)
        {
            for (let b = 0; b < bullets.length; b++)
            {
                if (CircleCollisions(asteroids[a].x, asteroids[a].y, asteroids[a].collisionRadius, bullets[b].x, bullets[b].y, 3))
                {
                    if (asteroids[a].level === 1)
                    {
                        asteroids.push(new Asteroid(asteroids[a].x - 5, asteroids[a].y - 5, 25, 2, 22));
                        asteroids.push(new Asteroid(asteroids[a].x + 5, asteroids[a].y + 5, 25, 2, 22));
                    }
                    else if (asteroids[a].level === 2)
                    {
                        asteroids.push(new Asteroid(asteroids[a].x - 5, asteroids[a].y - 5, 15, 3, 12));
                        asteroids.push(new Asteroid(asteroids[a].x + 5, asteroids[a].y + 5, 15, 3, 12));
                    }
                    asteroids.splice(a, 1);
                    bullets.splice(b, 1);
                    score += 10;
                    break loop1;
                }
            }
        }
    }

    if (ship.visible)
    {
        ship.Update();
        ship.Draw();
    }

    if (bullets.length > 0)
    {
        for (let bullet of bullets)
        {
            bullet.Update();
            bullet.Draw();
        }
    }
    if (asteroids.length > 0)
    {
        for (let j = 0; j < asteroids.length; j++)
        {
            asteroids[j].Update();
            asteroids[j].Draw(j);
        }
    }
    requestAnimationFrame(Render);
}