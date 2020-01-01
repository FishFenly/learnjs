var stage;
var paddle;
var ball;
var bricks = [];
const FULL_X_SPEED = 8;
const BALL_R = 8;
const PADDLE_W = 100;
const PADDLE_H = 20;
const BRICK_W = 40;
const BRICK_H = 15;
      
function init()
{
    stage = new createjs.Stage("myCanvas");

    drawBall();
    drawPaddle();
    drawBrickGrid();
    
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick",tick);
}

function tick(event)
{
    stage.update();

    if(ball.up)
    {
	ball.y -= ball.ySpeed;
    }
    else
    {
	ball.y += ball.ySpeed;
    }

    if(ball.right)
    {
	ball.x += ball.xSpeed;
    }
    else
    {
	ball.x -= ball.xSpeed;
    }

    for(var i = 0;i < bricks.length;i++)
    {
	if(checkColl(ball,bricks[i]))
	{
	    breakBrick(bricks[i]);
	    bricks.splice(i,1);
	    i--;
	}
    }

    if(checkColl(ball,paddle))
    {
	newBallX(ball,paddle);
    }

    if(ball.x + BALL_R >= stage.canvas.width)
    {
	ball.x = stage.canvas.width - BALL_R;
	ball.right = false;
    }

    if(ball.x - BALL_R <= 0)
    {
	ball.x = BALL_R;
	ball.right = true;
    }

    if(ball.y - BALL_R <= 0)
    {
	ball.y = BALL_R;
	ball.up = false;
    }

    if(ball.y + BALL_R >= stage.canvas.height)
    {
	ball.y = stage.canvas.height = BALL_R;
	ball.up = true;
    }

    ball.lastX = ball.x;
    ball.lastY = ball.y;
}

function checkColl(ballElement,hitElement)
{
    var leftBorder = (hitElement.x - hitElement.getBounds().width / 2);
    var rightBorder = (hitElement.x + hitElement.getBounds().width / 2);
    var topBorder = (hitElement.y - hitElement.getBounds().height / 2);
    var bottomBorder = (hitElement.y + hitElement.getBounds().height / 2);
    var previousBallLeftBorder = ballElement.lastX - BALL_R;
    var previousBallRightBorder = ballElement.lastX + BALL_R;
    var previousBallTopBorder = ballElement.lastY - BALL_R;
    var previousBallBottomBorder = ballElement.lastY + BALL_R;
    var ballLeftBorder = ballElement.x - BALL_R;
    var ballRightBorder = ballElement.x + BALL_R;
    var ballTopBorder = ballElement.y - BALL_R;
    var ballBottomBorder = ballElement.y + BALL_R;
    
    if((ballLeftBorder <= rightBorder) && (ballRightBorder >= leftBorder) && (ballTopBorder <= bottomBorder) && (ballBottomBorder >= topBorder))
    {
	if((ballTopBorder <= bottomBorder) && (previousBallTopBorder > bottomBorder))
	{
	    //Hit from the bottom
	    ballElement.up = false;
	    ballElement.y = bottomBorder + BALL_R;
	}
	
	if((ballBottomBorder >= topBorder) && (previousBallBottomBorder < topBorder))
	{
	    //Hit from the top
	    ballElement.up = true;
	    ballElement.y = topBorder - BALL_R;
	}
	if((ballLeftBorder<=rightBorder) && (previousBallLeftBorder>rightBorder))
	{
	    //Hit from the right
	    ballElement.right = true;
	    ballElement.x = rightBorder + BALL_R;
	}
	
	if((ballRightBorder >= leftBorder) && (previousBallRightBorder < leftBorder))
	{
	    //Hit from the left
	    ballElement.right = false;
	    ballElement.x = leftBorder - BALL_R;
	}
	
	ballElement.lastX = ballElement.x;
	ballElement.lastY = ballElement.y;
	return true;
    }
    return false;
}

function newBallX(ballElement,hitElement)
{
    var startPoint = hitElement.x - hitElement.getBounds().width / 2;
    var midPoint =  hitElement.x;
    var endPoint = hitElement.x + hitElement.getBounds().width / 2;
    
    if(ballElement.x < midPoint)
    {
	ball.right = false;
	ball.xSpeed = FULL_X_SPEED - ((ballElement.x - startPoint) / (midPoint - startPoint)) * FULL_X_SPEED
    }
    else
    {
	ball.xSpeed = FULL_X_SPEED - ((endPoint - ballElement.x) / (endPoint - midPoint)) * FULL_X_SPEED
	ball.right = true;	
    }
}


function drawBrick(x,y)
{
    var brick = new createjs.Shape();
    brick.graphics.beginFill("#000FFF");
    brick.graphics.drawRect(0,0,BRICK_W,BRICK_H);
    brick.graphics.endFill();

    brick.regX = BRICK_W / 2;
    brick.regY = BRICK_H / 2;
    brick.x = x;
    brick.y = y;

    brick.setBounds(brick.regX,brick.regY,BRICK_W,BRICK_H);

    stage.addChild(brick);
    bricks.push(brick);
}

function drawBrickGrid()
{
    for(var i = 0;i < 14;i++)
    {
	for(var j = 0;j < 7;j++)
	{
	    drawBrick(i * (BRICK_W + 10) + 40,j * (BRICK_H + 5) + 20);
	}
    }
}

function drawBall()
{
    ball = new createjs.Shape();
    ball.graphics.beginFill("Red").drawCircle(0,0,BALL_R);
    ball.x = stage.canvas.width / 2;
    ball.y = stage.canvas.height / 2;
    stage.addChild(ball);

    ball.up = true;
    ball.right = true;
    ball.xSpeed = 0;
    ball.ySpeed = 3;
    ball.lastX = 0;
    ball.lastY = 0;
}

function drawPaddle()
{
    paddle = new createjs.Shape();
    paddle.graphics.beginFill("#000000");
    paddle.graphics.drawRect(0,0,PADDLE_W,PADDLE_H);
    paddle.x = stage.canvas.width / 2;
    paddle.y = stage.canvas.height - PADDLE_H - 10;

    paddle.regX = PADDLE_W / 2;
    paddle.regY = PADDLE_H / 2;

    paddle.setBounds(paddle.regX,paddle.regY,PADDLE_W,PADDLE_H);
    
    stage.addChild(paddle);
}

function breakBrick(brick)
{
    createjs.Tween.get(brick,{}).to({scaleX:0,scaleY:0},550);
}
