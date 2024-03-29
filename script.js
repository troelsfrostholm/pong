var ballPosition = [100, 100];
var ballVelocity = [1, 1];
var leftPaddle = rightPaddle = 50;
var score = [0, 0];
var context, canvasDim;

window.onload = function() {
  context = document.getElementById("canvas").getContext("2d");
  canvasDim = [context.canvas.width, context.canvas.height];
  context.canvas.onmousemove = move;
  context.canvas.addEventListener('touchmove', move, false);
  setInterval(render, 1000/60);
  setInterval(update, 1000/60);
}

//Tegneri
function render() {
  context.clearRect(0, 0, canvasDim[0], canvasDim[1]);
  context.fillRect(ballPosition[0],ballPosition[1],10, 10);
  context.fillRect(30, leftPaddle, 30, 100);
  context.fillRect(canvasDim[0]-60, rightPaddle, 30, 100);
}

//Spilleregler
function update() {
  /*collision with top or bottom: change ball direction
  collision with left or right: left or right player scores
  collision with a paddle: change ball direction
  always: Move ball in the direction of its velocity
  */

  if(ballPosition[1] < 0 || ballPosition[1] > canvasDim[1])
    ballVelocity[1] = -ballVelocity[1];
  if(ballPosition[0] < 60 &&
     ballPosition[0] > 30 &&
     ballPosition[1] < leftPaddle+100 && 
     ballPosition[1] > leftPaddle) {
     ballVelocity[0] = 1;
  }
  if(ballPosition[0] > canvasDim[0]-60 &&
     ballPosition[0] < canvasDim[0]-30 &&
     ballPosition[1] < rightPaddle+100 && 
     ballPosition[1] > rightPaddle) {
     ballVelocity[0] = -1;
  }
  if(ballPosition[0] < 0) goal(1);
  if(ballPosition[0] > canvasDim[0]) goal(0);
  for(var i=0; i<2; i++) {
    ballPosition[i] += ballVelocity[i];
  }
  var sign = function(n) { return n >= 0 ? 1 : -1 }
	leftPaddle += sign(ballPosition[1] - 50 - leftPaddle)*0.5;
}

function move(evt) {
  rightPaddle =  event.pageY - canvas.offsetTop - 50;
}

function goal(player) {
  ballPosition = [100, 100];
  score[player]++;
}


