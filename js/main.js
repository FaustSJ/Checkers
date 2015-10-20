//http://wonderdeep.github.io/Checkers/index.html
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'game', { preload: preload, create: create});

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
var selectedRedIndex;
var selectedRedStartPos;
var turnTrigger = 0;
var redCanJump = false;
var blackCanJump = false;
var mustJump = false;


function create() {
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
	game.input.addMoveCallback(slideRed, this); 
	selectedRedStartPos = {x: 0, y: 0};
	redQueens = game.add.group();
	blackQueens = game.add.group();

//the game pieces
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
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 100, i*100);
				}
				if(k==1)
				{
					var c = reds.create(300, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 300, i*100);
				}
				if(k==2)
				{
					var c = reds.create(500, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 500, i*100);
				}
				if(k==3)
				{
					var c = reds.create(700, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
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
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 0, i*100);
				}
				if(k==1)
				{
					var c = reds.create(200, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 200, i*100);
				}
				if(k==2)
				{
					var c = reds.create(400, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
					red.events.onInputUp.add(releaseRed, this);
					setRedPos(red, 400, i*100);
				}
				if(k==3)
				{
					var c = reds.create(600, i*100, 'RedPiece');	
					red.name = 'red' + redcount;
					redcount++;
					red.inputEnabled = true;
					red.events.onInputDown.add(selectRed, this);
					red.input.enableDrag(false, true);
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
	play();
}
////////////////////////////////////////////////////////////////////////////////
function selectRed(red)
{
	selectedRed = red;
	selectedRedIndex = reds.getChildIndex(red);
	selectedRedStartPos.x = red.posX;
	selectedRedStartPos.y = red.posY;
}
function releaseRed(selectedRed)
{
	if(checkIfRedCanMoveHere(selectedRed, selectedRedStartPos.x, selectedRedStartPos.y, selectedRed.posX, selectedRed.posY))
	{
		//update occupied space
	//check if it can continue to jump
		//check if it is at the other end
			//kill it
			//replace with redQueen group object
			/*
				var red = reds.getChildAt(selectedRedIndex);
			var redQueen = redQueens.create(red.x, red.y, 'RedQueen');
					redQueen.name = 'red' + redcount;
					//redcount++;
					redQueen.inputEnabled = true;
					redQueen.events.onInputDown.add(selectRed, this);
					redQueen.input.enableDrag(false, true);
					redQueen.events.onInputUp.add(releaseRed, this);
					setRedPos(redQueen, red.x, red.y);
					red.kill();
			*/
	}
	else
	{
		var red = reds.getChildAt(selectedRedIndex);
		red.x = selectedRedStartPos.x;
		red.y = selectedRedStartPos.y;
	}
	selectedRed = null;
	play();
}
function setRedPos(red, posX, posY)
{
	red.posX = posX;
	red.posY = posY;
}
function setBlackPos(black, posX, posY)
{
	black.posX = posX;
	black.posY = posY;
}
function checkIfRedCanMoveHere(red, fromPosX, fromPosY, toPosX, toPosY)
{
	//is a jump available?
	//should it be jumping?
	//is it jumping?
	
	//is the space adjacent and diagonal?
	//is the space empty?
	
	return false;
}
 function moveBlack()
{
	//is a jump available?
		//black = a random jumpable one
		//while this black can continue to jump
			//move black
	//else black = random
		//move black random left/right
}
////////////////////////////////////////////////////////////////////////////////
function checkIfTHISRedCanJump(red)
{
	//for each red, 
	//	is a black piece diagonal and adjacent?
	//	is the red a queen?
}
function checkIfARedCanJump()
{
	for(var i = 0; i<reds.children.length; i++)
	{
		var red = reds.children[i];
	}
	for(var i = 0; i<redQueens.children.length; i++)
	{
		var redQueen = redQueens.children[i];
	}
	//check reds.children AND redQueens.children
	return false;	
}
function checkIfTHISBlackCanJump(black)
{
	//for each black, 
	//	is a red piece diagonal and adjacent?
	//	is the black a queen?
}
function checkIfABlackCanJump()
{
	//check blacks.children AND blackQueens.children
	return false;
}
////////////////////////////////////////////////////////////////////////////////
function play() 
{
	if (turnTrigger==0)
	{	mustJump = true;
		while(mustJump)
		{
			mustJump = checkIfARedCanJump();
		}
		turnTrigger = 1;
	}
	if (turnTrigger==1)
	{
		mustJump = checkIfARedCanJump();
		turnTrigger = 0;
	}

}




