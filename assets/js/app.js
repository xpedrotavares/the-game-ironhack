const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// variaveis

let player;
let gravity;
let keys = {};
let steps;

// fazer os isteners
document.addEventListener("keydown", function (evt) {
  keys[evt.code] = true;
});
document.addEventListener("keyup", function (evt) {
  keys[evt.code] = false;
});

class Steps {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

  
    this.originalHeight = h;
    
  }
}



class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0;
    this.jumpForce = 15;
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;
  }

  Animate() {
    // controles
    if (keys["Space"] || keys["KeyW"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys['ArrowLeft']){
        this.x -= 4; 
    } 

    if (keys['ArrowRight']){
        this.x += 4;

    }
    this.y += this.dy;

    // Gravity
    if (this.y + this.h < canvas.height) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h;
    }

    this.Draw();
  }

  Jump() {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}



function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gravity = 1;

  player = new Player(25, 0, 50, 50, "#FF5858");
  
  requestAnimationFrame(Update);
}

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  player.Animate();
}


 
Start();

// -----------------------------------------------

// // canvas
// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');

// // variaveis

// let score;
// let highscore;
// let player;
// let gravity;
// let obstacles;
// let gameSpeed;
// let keys = {};

// // listeners
// document.addEventListener('keydown', function (evt) {
//     keys[evt.code] = true;
//   });
//   document.addEventListener('keyup', function (evt) {
//     keys[evt.code] = false;
//   });
// //desenhar player

// class Player {
//     constructor (x, y, width, height, color) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height =height;
//         this.color = color;

//         this.dy = 0;
//         this.jumpForce = 15;
//         this.originalHeight = height;
//         this.grounded = false;
//         this.jumpTimer = 0;
//     }

//     Animate () {
//         //jump
//         if (keys['Space'] || keys['KeyW']) {
//             this.Jump();
//             // console.log('jump')
//         } else {
//             this.jumpTimer = 0;
//         }

//         this.y  += this.dy;

//         //gravity
//         if (this.y + this.height < canvas.height){
//             this.dy += gravity;
//             this.grounded = false;
//         }else {
//             this.dy = 0;
//             this.y = canvas.height - this.height;
//         }

//         this.Draw();
//     }

//     Jump () {
//         if (this.grounded && this.jumpTimer == 0) {
//           this.jumpTimer = 1;
//           this.dy = -this.jumpForce;
//         } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
//           this.jumpTimer++;
//           this.dy = -this.jumpForce - (this.jumpTimer / 50);
//         }
//     }

//     Draw () {
//         ctx.beginPath();
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//         ctx.closePath();
//     }
// }

// function Start() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     ctx.font = '20px';

//     gameSpeed = 3;
//     gravity = 1;

//     score = 0;
//     highscore = 0;

//     //criando um player
// player = new Player(25, canvas.height - 150, 50, 50, "#0000FF")

// requestAnimationFrame(Update)
// }

// // Limpa os frames para dar a impressao de que o rect tá se movendo
// function Update() {
//     requestAnimationFrame(Update);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     player.Animate();
// }

// Start()
