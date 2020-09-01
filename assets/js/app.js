 const canvas = document.getElementById('gameCanvas');
 const ctx = canvas.getContext("2d");

 
//medias e posições no canvas dos steps
const steps = [];
//desenho dos steps

    // ctx.fillStyle = "#000000"
    // ctx.fillRect(300, 700, 200, 20);


//personagem => passar para uma const que fara via Class component linha 109
// let player;
// ctx.fillStyle = "#0000FF";
// ctx.fillRect(0, 760, 40, 40);


const gameArea = {
    canvasWidth: 500,
    canvasHeight: 800,
    canvas: canvas,
    frames: 0,
    star: function () {
        this.interval = setInterval(updateGameArea, 20)
    },
    stop: function () {
        clearInterval(this.interval);
    },
    clear: function ( ){
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    // score: function () {
        
    // }

}

function updateGameArea() {
    gameArea.clear();
    player.newPos(); //ainda nao declarei o player
    player.update(); // ainda nao declarei o player
    updateObstacles(); // ainda nao declarei func updateObstacles()
    checkGameOver(); //// ainda nao declarei essa func
    // myGameArea.score();
}

function updateObstacles() {
    gameArea.frames += 1;
    if(gameArea.frames % 120 === 0) {
        let y = gameArea.canvasHeight;
        let minWidth = 20;
        let maxWidth = 200;
        let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
        let minGap = 50;
        let maxGap = 200;
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        steps.push(new Component(width, 100, 'green', 0, y));
        steps.push( new Component(y - width - gap, 100, 'green', width + gap, y));

        // constructor(width, height, color, x, y)
    }

    for (i=0; i < steps.length; i++) {
        steps[i].x += -1;
        steps[i].update();
    }
}

function checkGameOver() {
    const crashed = steps.some(function (obstacle) {
        return player.crashWith(obstacle);
    });

    if (crashed) {
        gameArea.stop();
        alert('game over')
    }
}

class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
    }

    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }
    bottom () {
        return this.y + this.height
    }

    crashWith(obstacle) {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        );
    }

    update() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

const player = new Component(40, 40, "blue", 0, 760)

gameArea.star();

document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 37:
            player.speedX -= 1;
            break;
        case 39:
            player.speedX += 1;
            break;
        case 32:
            player.speedY -= 1;
            break;
    }
})

document.addEventListener("keyup", (e) => {
    player.speedX = 0;
    player.speedY = 0;
})


//posicao atual do obj x y ... w h, functions => update, clear
//bottom player = bottom obsta ... zerar velocidade y
// class step {

//     constructor (x, y, width, height, color){
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height =height;
//         this.color = color;
//     }

//     draw(){
//         ctx.beginPath();
//         ctx.lineWidth = '4';
//         ctx.fillStyle = "#FFFFFF";
//         ctx.fillRect(50, 50, 40, 50);
//     }
// }

// function startGame() {

// }

// window.onload = function () {
//     document.getElementById("")
// }


// const { start } = require("repl");

// const gameArea = {
//  canvas: document.createElement("canvas"),
//  steps: [],
//  frames: 0,
//  gravity: 0.1,
//  drawCanvas: function () {
//      this.canvas.width = 500;
//      this.canvas.height = 800;
//      this.ctx = this.canvas.getContext("2d");
//  },
//  start: function () {
//      this.drawCanvas();

//      this.reqAnimation = window.requestAnimationFrame()
//  }
// }