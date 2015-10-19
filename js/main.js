//http://wonderdeep.github.io/Checkers/index.html
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.image('BlackPiece', 'assets/BlackPiece.png');
	game.load.image('BlackQueen', 'assets/BlackQueen.png');
	game.load.image('CheckerBoard', 'assets/CheckerBoard.jpg');
	game.load.image('RedPiece', 'assets/RedPiece.png');
	game.load.image('RedQueen', 'assets/RedQueen.png');
}

var board;
/*var red1;
var red2;
var red3;
var red4;
var red5;
var red6;
var red7;
var red8;
var red9;
var red10;
var red11;
var red12;
var black1;
var black2;
var black3;
var black4;
var black5;
var black6;
var black7;
var black8;
var black9;
var black10;
var black11;
var black12;*/
var reds;
var blacks;
var selectedRed = null;
var turnTrigger = 0;
var redCanJump = false;
var blackCanJump = false;





function create() {
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
	
//What the player clicks
/*	red1 = game.add.sprite(100, 0, 'RedPiece');
	red1.inputenabled = true;
	//red1.events.onInputDown.add(,this);
	red2 = game.add.sprite(300, 0, 'RedPiece');
	red2.inputenabled = true;
	red3 = game.add.sprite(500, 0, 'RedPiece');
	red3.inputenabled = true;
	red4 = game.add.sprite(700, 0, 'RedPiece');
	red4.inputenabled = true;
	red5 = game.add.sprite(0, 100, 'RedPiece');
	red5.inputenabled = true;
	red6 = game.add.sprite(200, 100, 'RedPiece');
	red6.inputenabled = true;
	red7 = game.add.sprite(400, 100, 'RedPiece');
	red7.inputenabled = true;
	red8 = game.add.sprite(600, 100, 'RedPiece');
	red8.inputenabled = true;
	red9 = game.add.sprite(100, 200, 'RedPiece');
	red9.inputenabled = true;
	red10 = game.add.sprite(300, 200, 'RedPiece');
	red10.inputenabled = true;
	red11 = game.add.sprite(500, 200, 'RedPiece');
	red11.inputenabled = true;
	red12 = game.add.sprite(700, 200, 'RedPiece');
	red12.inputenabled = true;
	
	black1 = game.add.sprite(0, 500, 'BlackPiece');
	black1.inputenabled = true;
	black2 = game.add.sprite(200, 500, 'BlackPiece');
	black2.inputenabled = true;
	black3 = game.add.sprite(400, 500, 'BlackPiece');
	black3.inputenabled = true;
	black4 = game.add.sprite(600, 500, 'BlackPiece');
	black4.inputenabled = true;
	black5 = game.add.sprite(100, 600, 'BlackPiece');
	black5.inputenabled = true;
	black6 = game.add.sprite(300, 600, 'BlackPiece');
	black6.inputenabled = true;
	black7 = game.add.sprite(500, 600, 'BlackPiece');
	black7.inputenabled = true;
	black8 = game.add.sprite(700, 600, 'BlackPiece');
	black8.inputenabled = true;
	black9 = game.add.sprite(0, 700, 'BlackPiece');
	black9.inputenabled = true;
	black10 = game.add.sprite(200, 700, 'BlackPiece');
	black10.inputenabled = true;
	black11 = game.add.sprite(400, 700, 'BlackPiece');
	black11.inputenabled = true;
	black12 = game.add.sprite(600, 700, 'BlackPiece');
	black12.inputenabled = true;
*/

	//seting up the red pieces
	reds = game.add.group();
	var alternate = true;
	var redcount = 0;
	for(var i = 0; i<3; i++) //rows, y
	{
		for(var k = 0; k<4; k++) //columns, x
		{
			if(alternate)
			{
				if(k==0)
				{
					var red = reds.create(100, i*100, 'RedPiece');
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 100, i*100);
				}
				if(k==1)
				{
					var c = reds.create(300, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 300, i*100);
				}
				if(k==2)
				{
					var c = reds.create(500, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 500, i*100);
				}
				if(k==3)
				{
					var c = reds.create(700, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 700, i*100);
				}	
			}
			else
			{
				if(k==0)
				{
					var c = reds.create(0, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 0, i*100);
				}
				if(k==1)
				{
					var c = reds.create(200, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 200, i*100);
				}
				if(k==2)
				{
					var c = reds.create(400, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 400, i*100);
				}
				if(k==3)
				{
					var c = reds.create(600, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.events.onInputDown.add(selectRed, this);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 600, i*100);
				}	
			}
		}
		alternate = !alternate;
	}
	
	//seting up the black pieces
	blacks = game.add.group();
	alternate = true;
	var blackcount = 0;
	for(var i = 1; i<4; i++) //rows, y
	{
		for(var k = 0; k<4; k++) //columns, x
		{
			if(alternate)
			{
				if(k==0)
				{
					var black = blacks.create(0, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 0, (i*100)+400);
				}
				if(k==1)
				{
					var black = blacks.create(200, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 200, (i*100)+400);
				}
				if(k==2)
				{
					var black = blacks.create(400, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 400, (i*100)+400);
				}
				if(k==3)
				{
					var black = blacks.create(600, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 600, (i*100)+400);
				}	
			}
			else
			{
				if(k==0)
				{
					var black = blacks.create(100, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 100, (i*100)+400);
				}
				if(k==1)
				{
					var black = blacks.create(300, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 300, (i*100)+400);
				}
				if(k==2)
				{
					var black = blacks.create(500, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 500, (i*100)+400);
				}
				if(k==3)
				{
					var black = blacks.create(700, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setRedPos(black, 700, (i*100)+400);
				}	
			}
		}
		alternate = !alternate;
	}
	
}
////////////////////////////////////////////////////////////////////////////////
function selectRed(red, pointer)
{
	selectedRed = red;
	selectedRedStartPos.x = red.posX;
	selectedRedStartPos.y = red.posY;
}
function releaseRed(selectedRed)
{
	
	selectedRem = null;
}
function setRedPos(red, posX, posY)
{
	red.posX = posX;
	red.posY = posY;
	red.id = calcRedId();
}
function checkIfRedCanMoveHere(fromPosX, fromPosY, toPosX, toPosY)
{
	//is the space adjacent and diagonal?
	//is the space empty?
}
////////////////////////////////////////////////////////////////////////////////
function checkIfRedCanJump()
{
	
}
function checkIfBlackCanJump()
{
	
}
////////////////////////////////////////////////////////////////////////////////
function update() 
{
	if (turnTrigger==0)
	{
		checkIfRedCanJump();
		turnTrigger = 1;
	}
	if (turnTrigger==1)
	{
		checkIfRedCanJump();
		turnTrigger = 0;
	}

}
////////////////////////////////////////////////////////////////////////////////


function render()
{

}



