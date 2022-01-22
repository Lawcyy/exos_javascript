const grid = document.getElementById('snake-grid');
const grid_ctx = grid.getContext('2d');
let dX = 20;
let dY = 0;

//position de départ du serpent
let snake = [
    {x: 200, y: 200},
    {x: 180, y: 200},  
    {x: 160, y: 200},  
    {x: 140, y: 200},  
    {x: 120, y: 200}
];

function clearGrid() {
     grid_ctx.fillstyle = 'black';
     grid_ctx.strokestyle = 'black';
     grid_ctx.fillRect(0, 0, grid.width, grid.height);
     grid_ctx.strokeRect(0, 0, grid.width, grid.height);
}

//dessine le serpent
function drawSnake(snakeSquare) {
    grid_ctx.fillStyle = '#3cff00';
    grid_ctx.strokestyle = '#3cff00';
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
  snake.pop();
}

//démarre la partie et bouge le serpent selon l'intervalle de temps
function startGame() {
    if (gameOver()) {
        clearInterval(interval);
    } else {
    clearGrid();   
    moveSnake();
    spawnSnake();  
    }
}

function changeDirection(e) {  

    const up = 38;
    const down = 40;
    const left = 37;
    const right = 39;
   
    const key = e.keyCode;
    const goingUp = dY === -20;
    const goingDown = dY === 20;
    const goingRight = dX === 20;  
    const goingLeft = dX === -20;
    
    if (key === left && !goingRight)
    {    
        dX = -20;
        dY = 0;  
    }

    if (key === up && !goingDown)
    {    
        dX = 0;
        dY = -20;
    }

    if (key === right && !goingLeft)
    {    
        dX = 20;
        dY = 0;
    }

    if (key === down && !goingUp)
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
        let interval = setInterval(startGame,90);
    }
});

document.addEventListener("keydown", changeDirection);