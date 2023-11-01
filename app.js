const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const startGame = document.getElementById('start');
const pause = document.getElementById('pause');
canvas.width = 1024;
canvas.height = 576;



function draw_grid(ctx, minor, major, stroke, fill) {
    minor = minor || 10;
    major = major || minor * 5;
    stroke = stroke || "#00FF00";
    fill = fill || "#009900";
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    let width = ctx.canvas.width,
        height = ctx.canvas.height
    for (let x = 0; x < width; x += minor) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
        ctx.stroke();
        if (x % major == 0) { ctx.fillText(x, x, 10); }
    }
    for (let y = 0; y < height; y += minor) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = (y % major == 0) ? 0.5 : 0.25;
        ctx.stroke();
        if (y % major == 0) { ctx.fillText(y, 0, y + 10); }
    }
    ctx.restore();
}
draw_grid(ctx);

class gameObject {
    constructor({ position, velocity }, size, ) {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
    };
    draw() {
        ctx.fillStyle = 'grey'
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    };
    update() {
        this.draw()
        this.position.y += this.velocity.y


        if (this.position.y + this.size.height + this.velocity.y >= canvas.height || this.position.y + this.size.height + this.velocity.y <= 0) {
            this.velocity.y = 0;
        }


    };
};
class projectile {
    constructor({ position, velocity }, radius, ) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    };
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'yellow';
        ctx.fill();

    };
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        let x1 = player.position.x + player.size.width / 2 || opponent.position.x + player.size.width / 2;
        let x2 = this.position.x;
        let y1 = player.position.y + player.size.height / 2 || opponent.position.y + player.size.width / 2;
        let y2 = this.position.y;
        let dX = x2 - x1;
        let dY = y2 - y1

        if (ball.position.x + ball.radius + this.velocity.x >= canvas.width) {
            ball.position.x = 500;
            ball.position.y = 270;
            ball.velocity.x *= 1 || -1
        }
        if (ball.position.x - ball.radius - this.velocity.x <= 0) {
            ball.position.x = 500;
            ball.position.y = 270;
            ball.velocity.x *= 1 || -1
        }

        if (this.position.y - this.radius <= 0) {
            ball.velocity.y *= -1;
        }
        if (this.position.y + this.radius + this.velocity.y >= canvas.height) {
            ball.velocity.y *= -1;
        }
        if (dX <= this.radius + player.size.width / 2 && dY <= this.radius + player.size.height / 2) {
            ball.position.x *= -1
        }
        if (dX <= this.radius + opponent.size.width / 2 && dY <= this.radius + opponent.size.height / 2) {
            this.position.x *= -1
        }


    };
}

const player = new gameObject({
    position: {
        x: 0,
        y: 180
    },
    velocity: {
        x: 0,
        y: 0
    }
}, {
    width: 25,
    height: 200
});

const opponent = new gameObject({
    position: {
        x: 999,
        y: 180
    },
    velocity: {
        x: 0,
        y: 0
    }
}, {
    width: 25,
    height: 200
});
const ball = new projectile({
    position: {
        x: 500,
        y: 270
    },
    velocity: {
        x: 0,
        y: 0
    }
}, 30);

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    opponent.update();
    ball.update();
}
animate();
window.addEventListener('keydown', (event) => {
    if (event.key == 'w') {
        player.velocity.y = -15;
        if (player.position.y + player.size.height + player.velocity.y <= 0) {
            player.velocity.y = 0;
        }
    } else if (event.key == 's') {
        player.velocity.y = 15;
    }
});
window.addEventListener('keyup', (event) => {
    if (event.key = 'w') {
        player.velocity.y = 0;
    } else if (event.key == 's') {
        player.velocity.y = 0;
    }
})
window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp') {
        opponent.velocity.y = -15;
    } else if (event.key == 'ArrowDown') {
        opponent.velocity.y = 15;
    }
});
window.addEventListener('keyup', (event) => {

    if (event.key = 'ArrowUp ') {
        opponent.velocity.y = 0;
    } else if (event.key == 'ArrowDown') {
        opponent.velocity.y = 0;
    }
})

function moveball() {
    ball.position.x = 500;
    ball.position.y = 270;
    ball.velocity.x = 10;
    ball.velocity.y = 10
}

startGame.addEventListener('click', moveball);