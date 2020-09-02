const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// variaveis

let player;
let gravity;
let keys = {};
let obstacles = [];
let gameSpeed;
let currentStep;
let score;
let scoreText;
// let steps = [{ width: 300, height: 30, x: canvas.width, y: 0 }];
// let frame = ;
// fazer os listeners
document.addEventListener("keydown", function (evt) {
  keys[evt.code] = true;
});
document.addEventListener("keyup", function (evt) {
  keys[evt.code] = false;
});

//descrever melhor os parametros
class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0;
    this.jumpForce = 15;
    
    this.grounded = false;
    this.jumpTimer = 0;
    this.currentStep;
    this.isAboveStep = false;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }

  stepOver(obstacle) {
    const stepedOver =
      this.bottom() > obstacle.top() &&
      // this.top() > obstacle.bottom() ||
      this.right() < obstacle.right() &&
      this.left() > obstacle.left();
    this.currentStep = obstacle;
    if (stepedOver) {
      this.isAboveStep = true;
    } else {
      this.isAboveStep = false;
    }
    

    //para cada frame atualizar o Y no update.
    // player.y = current
  }

  Animate() {
    // controles
    if (keys["Space"] || keys["KeyW"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys["ArrowLeft"]) {
      this.x -= 4;
    }

    if (keys["ArrowRight"]) {
      this.x += 4;
    }
    this.y += this.dy;

    // Gravity
    
    if (this.isAboveStep) {
      console.log(this.currentStep)
      this.dy = this.currentStep.y + 5;
    
    } else if (this.y + this.h < canvas.height) {
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

class Obstacle {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = -gameSpeed;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.h;
  }

  Update() {
    this.y -= this.dy;
    this.Draw();
    this.dy = -gameSpeed;
  }
  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

class Text {
  constructor (t, x, y, a, c, s){
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }
  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif"
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}

function SpawnObstacle() {
  let obstaclePositionX = RandomX(0, 900);
  let size = RandomIntInRange(20, 70);
  let type = RandomIntInRange(0, 1);
  let obstacle = new Obstacle(100, 0, 200, 20, "#00FF00");

  obstacle.x = obstaclePositionX;

  obstacles.push(obstacle);
}

SpawnObstacle();

function RandomX(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function RandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start() {
  canvas.width = 900;
  canvas.height = window.innerHeight * 0.9;

  gameSpeed = 3;
  gravity = 1;

  score = 0;

  player = new Player(25, 0, 50, 50, "#FF5858");
  //   steps = new Steps(25, 40, 100, 150, "#00FF00");

scoreText = new Text("Score: " + score, 25, 25, 'left', '#0000FF', '20')

  requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.Animate();

  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnObstacle();
    spawnTimer = initialSpawnTimer - gameSpeed * 8;

    if (spawnTimer < 60) {
      spawnTimer = 60;
    }
  }

  //aqui vai gerar na tela os obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    o.Update();
  }

  // if (player.x > canvas.width){
  //   this.y = player.x - canvas.height
  // }
 
  // width: 300, height: 30, x: canvas.width, y: 0
  // if (frame % 100 == 0)
  //   steps.push({
  //     width: 300,
  //     height: 30,
  //     x: canvas.width,
  //     y: canvas.height * Math.random(),
  //     speedX: 0.0,
  //     speedY: 0.0,
  //   });
  // steps.forEach((o) => {
  //   o.y += 4;

  //   ctx.fillRect(o.x, o.y, o.width, o.height);
  // });

  // stepOver.forEach((step) =>{

  // })
  // obstacles.forEach((frame) =>{
  //   player.y += currentStep;
  // })



// player.y = playerFrameUpdate;


// playerFrameUpdate.Update();

  obstacles.forEach((obstacle) => {
    player.stepOver(obstacle);
    
    //  player.y = currentStep;   
    
    
  });
  
  requestAnimationFrame(Update);

  // pl
  //para cada frame atualizar o Y no update.
  // player.y = current

  //   steps.Animate();
  score++
  scoreText.t = 'Score: ' + score;
  scoreText.Draw();
}
// requestAnimationFrame(Update);



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
