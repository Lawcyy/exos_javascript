const grid = document.getElementById('snake-grid');
const grid_ctx = grid.getContext('2d');

let point = [new Audio('./sounds/point.mp3'), new Audio('./sounds/point2.mp3'),
            new Audio('./sounds/point3.mp3'), new Audio('./sounds/point4.mp3')];

let lose = new Audio('./sounds/lose.mp3');
let start = new Audio('./sounds/start.mp3');

let cursed = false;
let cursedStatus = document.getElementById("status");

let dX;
let dY;

let foodX;
let foodY;

let scorePosition = document.getElementById("score");
let score = 0;

let gameOverScreen = document.getElementById("gameover-div");
let isGameOver = true;

let startScreen = document.getElementById("instruction");

let interval;

let snake;

function foodPosition(min, max) {  
   return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

function drawFood() {
    grid_ctx.fillStyle = '#ff001e';
    grid_ctx.strokeStyle = 'black';
    grid_ctx.fillRect(foodX, foodY, 20, 20);
    grid_ctx.strokeRect(foodX, foodY, 20, 20);
}


function spawnFood() 
{  
   foodX = foodPosition(0, grid.width - 20);
   foodY = foodPosition(0, grid.height - 20);

   snake.forEach(function foodEaten(snakePart) {
        if (snakePart.x == foodX && snakePart.y == foodY) {
            spawnFood();
        }
    });   
}

function clearGrid() {
     grid_ctx.fillStyle = 'black';
     grid_ctx.strokeStyle = 'black';
     grid_ctx.fillRect(0, 0, grid.width, grid.height);
     grid_ctx.strokeRect(0, 0, grid.width, grid.height);
}

//dessine le serpent
function drawSnake(snakeSquare) {
    grid_ctx.fillStyle = '#67aab3';
    grid_ctx.strokeStyle = 'black';
    grid_ctx.fillRect(snakeSquare.x, snakeSquare.y, 20, 20);
    grid_ctx.strokeRect(snakeSquare.x, snakeSquare.y, 20, 20);
}

//fait apparaître le serpent
function spawnSnake() {
    snake.forEach(drawSnake);
}

//fait bouger le serpent
function moveSnake() {  
  const head = {x: snake[0].x + dX, y: snake[0].y + dY};
  snake.unshift(head);
  if (snake[0].x === foodX && snake[0].y === foodY) {
    spawnFood();
    score++;
    if (cursed === true) {
        let randomSong = Math.floor(Math.random() * point.length);
        let song = point[randomSong];
        song.play();
    } 
  } else {
  snake.pop();
  }
}

//démarre la partie et bouge le serpent selon l'intervalle de temps
function startGame() {

    scorePosition.innerHTML = score;
    isGameOver = gameOver();
    if (isGameOver) {
        if (cursed === true) lose.play();
        gameOverScreen.setAttribute('id','game-over');
        clearInterval(interval);
    } else {
    clearGrid();
    moveSnake();
    spawnSnake(); 
    drawFood(); 
    }
}

function changeDirection(e) {  

    const up = [38,90];
    const down = [40,83];
    const left = [37,81];
    const right = [39,68];
   
    const key = e.keyCode;
    const goingUp = dY === -20;
    const goingDown = dY === 20;
    const goingRight = dX === 20;  
    const goingLeft = dX === -20;
    
    if (left.includes(key) && !goingRight)
    {    
        dX = -20;
        dY = 0;  
    }

    if (up.includes(key) && !goingDown)
    {    
        dX = 0;
        dY = -20;
    }

    if (right.includes(key) && !goingLeft)
    {    
        dX = 20;
        dY = 0;
    }

    if (down.includes(key) && !goingUp)
    {    
        dX = 0;
        dY = 20;
    }
}

function gameOver() {  

    for (let i = 4; i < snake.length; i++) {    

        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
        }
    }

    if (snake[0].x < 0) {
        return true;
    } 
    else if (snake[0].x > grid.width - 20) {
        return true;
    }
    else if (snake[0].y < 0) {
        return true;
    }
    else if (snake[0].y > grid.height - 20) {
        return true;
    }
}

document.addEventListener('keyup', event => {

    if (event.code === 'Space') {
        if (isGameOver) {
        
        startScreen.remove();
        clearGrid();
        gameOverScreen.removeAttribute('id','game-over');
        isGameOver = false;
        score = 0; 
        snake = [
            {x: 200, y: 200},
            {x: 180, y: 200},  
            {x: 160, y: 200},  
            {x: 140, y: 200},  
            {x: 120, y: 200}
        ];        
        dX = 20;
        dY = 0;
        spawnFood();
        if (cursed === true) {
            start.play();
            document.getElementById('alien').setAttribute('id','img');
        }
        interval = setInterval(startGame,90);
        }
    }
});

document.addEventListener("keydown", changeDirection);

document.getElementById("cursed").addEventListener('click', function() {
    if (cursed) {
        cursed = false;
        cursedStatus.innerHTML = 'Désactivé';
    }
    else  {
        cursed = true;
        cursedStatus.innerHTML = 'Activé';
    }
});