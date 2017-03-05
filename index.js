function getRandomVelocity() {
  var velocity = Math.round(Math.random() * 2);
  velocity = velocity - 1;
  if (velocity === 0) {
    return getRandomVelocity();
  }
  return velocity;
}

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player1 = {
  score: 0,
  speed: 1,
  x: 10,
  y: 270,
};

var player2 = {
  score: 0,
  speed: 1,
  x: 785,
  y: 270,
};

var puck = {
  x: 400,
  y: 310,
  velocity: {
    x: getRandomVelocity() * 2.5,
    y: getRandomVelocity() * 2.5,
  }
};

var keysDown = {
  w: false,
  s: false,
  upArrow: false,
  downArrow: false,
};

function gameLoop() {
  puck.x = puck.x + puck.velocity.x;
  puck.y = puck.y + puck.velocity.y;

  if (puck.y === 10 || puck.y === 590) {
    puck.velocity.y = puck.velocity.y * -1;
  }

  if (puck.y >= player1.y - 10 &&
      puck.y <= player1.y + 80 &&
      puck.x <= 25 &&
      puck.y >= 0) {
        puck.velocity.x = puck.velocity.x * -1
  };

  if (puck.y >= player2.y - 10 &&
    puck.y <= player2.y + 80 &&
    puck.x >= 775 &&
    puck.x <= 795) {
      puck.velocity.x = puck.velocity.x * -1
  };

  if (keysDown.w) {
    player1.y = Math.max(0, player1.y - 3 * player1.speed);
  }

  if (keysDown.s) {
    player1.y = Math.min(540, player1.y + 3 * player1.speed);
  }

  if (keysDown.upArrow) {
    player2.y = Math.max(0, player2.y - 3 * player2.speed);
  }

  if (keysDown.downArrow) {
    player2.y = Math.min(540, player2.y + 3 * player2.speed);
  }

  if (puck.x > 800) {
    restartGame();
  }

  if (puck.x < -10) {
    restartGame();
  }

 renderGame()
};

function renderGame() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, 800, 800);

  context.beginPath();
  context.arc(puck.x, puck.y, 10, 0, 2 * Math.PI, false);
  context.fillStyle = 'red';
  context.closePath();
  context.fill();

  context.fillStyle = 'green';
  context.fillRect(player1.x, player1.y, 5, 60);
  context.fillRect(player2.x, player2.y, 5, 60);

}

document.addEventListener('keydown' , function (event) {
  switch(event.which) {
    case 87:
      keysDown.w = true;
      break;

    case 83:
      keysDown.s = true;
      break;

    case 38:
      keysDown.upArrow = true;
      break;

    case 40:
      keysDown.downArrow = true;
      break;

    default: break;
  }
});

document.addEventListener('keyup' , function (event) {
  switch(event.which) {
    case 87:
      keysDown.w = false;
      break;

    case 83:
      keysDown.s = false;
      break;

    case 38:
      keysDown.upArrow = false;
      break;

    case 40:
      keysDown.downArrow = false;
      break;

  default: break;
}
});

restartGame()

function restartGame () {
  puck.x = 400;
  puck.y = 300;
  puck.velocity.x = getRandomVelocity() * 2.5;
  puck.velocity.y = getRandomVelocity() * 2.5;
  }


setInterval(gameLoop, 1000 / 60);
