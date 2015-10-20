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
var recentlyJumped = false;
var redsCanJump = {};
var blacksCanJump = {};
var redQueensCanJump = {};
var blackQueensCanJump = {};


function create() {
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
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
					setPos(red, 100, i*100);
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
					setPos(red, 300, i*100);
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
					setPos(red, 500, i*100);
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
					setPos(red, 700, i*100);
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
					setPos(red, 0, i*100);
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
					setPos(red, 200, i*100);
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
					setPos(red, 400, i*100);
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
					setPos(red, 600, i*100);
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
					setPos(black, 0, (i*100)+400);
				}
				if(k==1)
				{
					var black = blacks.create(200, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 200, (i*100)+400);
				}
				if(k==2)
				{
					var black = blacks.create(400, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 400, (i*100)+400);
				}
				if(k==3)
				{
					var black = blacks.create(600, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 600, (i*100)+400);
				}	
			}
			else
			{
				if(k==0)
				{
					var black = blacks.create(100, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 100, (i*100)+400);
				}
				if(k==1)
				{
					var black = blacks.create(300, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 300, (i*100)+400);
				}
				if(k==2)
				{
					var black = blacks.create(500, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 500, (i*100)+400);
				}
				if(k==3)
				{
					var black = blacks.create(700, (i*100)+400, 'BlackPiece');
					black.name = 'black' + blackcount;
					blackcount++;
					setPos(black, 700, (i*100)+400);
				}	
			}
		}
		alternate = !alternate;
	}
}
////////////////////////////////////////////////////////////////////////////////
function selectRed(red)
{
	selectedRed = red;
	if(redQueens.getChildIndex(red)==-1)
		selectedRedIndex = reds.getChildIndex(red);
	else
		selectedRedIndex = redQueens.getChildIndex(red);
	selectedRedStartPos.x = red.posX;
	selectedRedStartPos.y = red.posY;
}
function releaseRed(selectedRed)
{
	if(checkIfRedCanMoveHere(selectedRed, selectedRedStartPos.x, selectedRedStartPos.y, selectedRed.posX, selectedRed.posY))
	{
		var red = reds.getChildAt(selectedRedIndex);
		//did it jump?
		if(recentlyJumped)
		{
			//does it have more jumps to make?
			if(!checkIfTHISRedCanJump(red))
			{
				recentlyJumped = false;
			}
		}
		//did it make it to the other side?
		if(red.y==700)
		{
			var redQueen = redQueens.create(red.x, red.y, 'RedQueen');
			redQueen.inputEnabled = true;
			redQueen.events.onInputDown.add(selectRed, this);
			redQueen.input.enableDrag(false, true);
			redQueen.events.onInputUp.add(releaseRed, this);
			setRedPos(redQueen, red.x, red.y);
			selectRed(redQueen);
			red.kill();
		}
		
	}
	else
	{
		var red = reds.getChildAt(selectedRedIndex);
		red.x = selectedRedStartPos.x;
		red.y = selectedRedStartPos.y;
	}
	//If the selected piece still has 
	if(!recentlyJumped)
	{
		selectedRed = null;
		turnToggle();
	}
}
function setPos(piece, posX, posY)
{
	piece.posX = posX;
	piece.posY = posY;
}
function checkOccupancy1(x, y) //looks for singles
{	
	var piece;
	for(var i=0; i<reds.children.length; i++)
	{
		piece = reds.getChildAt(i);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		piece = redQueens.getChildAt(k);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	for(var i=0; i<blacks.children.length; i++)
	{
		piece = blacks.getChildAt(i);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		piece = blackQueens.getChildAt(k);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	return null;
}
function checkOccupancy2(x, y) //looks for doubles
{	
	var occupants = 0; //shouldn't be more than 1
	var piece;
	for(var i=0; i<reds.children.length; i++)
	{
		piece = reds.getChildAt(i);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		piece = redQueens.getChildAt(k);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	for(var i=0; i<blacks.children.length; i++)
	{
		piece = blacks.getChildAt(i);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		piece = blackQueens.getChildAt(k);
		if(!piece.isAlive())
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	return false;
}
function checkIfRedCanMoveHere(red, fromPosX, fromPosY, toPosX, toPosY)
{
	//first, adjust the coordinates
	var extra;
	extra = toPosX%100;
	red.x = red.x-extra;
	extra = toPosY%100;
	red.y = red.y-extra;
	//and make sure they're still on the board
	if(red.x<0 || red.x>700 || red.y<0 || red.y>700)
		return false;
	//then check if the space is already occupied
	if(checkOccupancy2(red.x, red.y))
		return false
	
	//now we ask, did it jump?
	if((Math.abs(fromPosX-red.x)==200)&&(Math.abs(fromPosY-red.y)==200))
	{
		//was it supposed to?
		if(redsCanJump.indexOf(selectedRedIndex)==-1)
			return false;
		
		//did jump in a legal direction?
		if((redQueens.getChildIndex(red)==-1)&&(red.y<fromPosY))
			return false;
		
		//did it actually jump over anything?
		var checkX = (red.x+fromPosX)/2;
		var checkY = (red.y+fromPosY)/2;
		if(checkOccupancy1(checkX, checkY)!=null)
		{
			var piece = checkOccupancy1(checkX, checkY);
			if((blacks.getChildIndex(piece)==-1)&&(blackQueens.children.indexOf(piece)==-1))
				return false;
			piece.kill();
		}
		recentlyJumped = true;
		return true;
	}
	else //it only moved one space
	{
		if((Math.abs(fromPosX-red.x)==100)&&(Math.abs(fromPosY-red.y)==100))
		{
			//was it supposed to jump?
			if(redsCanJump.indexOf(selectedRedIndex)!=-1)
				return false;
			
			//did it move in a legal direction?
			if((redQueens.getChildIndex(red)==-1)&&(red.y<fromPosY))
				return false;
			
			return true
		}
		
	}
	return false;
}
 function moveBlack()
{
	var black;
	//can any blacks jump?
	If(checkIfABlackCanJump())
	{
		//grab from queen or regular index list
		//modify checkifthisjump to find a jumping position and jump
		recentlyJumped = true;
		
		//can it jump again?
		if(!checkIfTHISBlackCanJump(black))
		{
			recentlyJumped = false
		}
	}
	else
	{
		var either = random;//////
		
		if(either==1 && blackQueens.children.length!=0)
		{
			for(var i=0; i<blackQueens.children.length; i++)
			{
				black = blackQueens.getChildAt(i);
				if(!black.isAlive())
					continue;
				//if it can move, move it
			}
		}
		else
		{
			for(var i=0; i<blackQueens.children.length; i++)
			{
				black = blacks.getChildAt(i);
				if(!black.isAlive())
					continue;
				//if it can move, move it
			}
		}
	}
		
	if(!recentlyJumped)
		toggleTurn();
}
////////////////////////////////////////////////////////////////////////////////
function checkIfTHISRedCanJump(red)
{
	var black;
	var black2;
	var jumpable = false;
	//is it a queen?
	if(redQueens.chidren.indexOf(red)!=-1) 
	{
		for(var i = 0; i<blacks.children.length; i++)
		{
			black = blacks.getChildAt(i);
			if(!black.isAlive())
				continue;
			//is there a black piece to SE?
			if((black.x==red.x+100) && (black.y==red.y+100)) /*SE*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<blacks.children.length; k++)
				{
					black2 = blacks.getChildAt(k);
					if(!black2.isAlive())
						continue;
					if((black2.x==black.x+100) && (black2.y==black.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to SW?
			if((black.x==red.x-100) && (black.y==red.y+100)) /*SW*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<blacks.children.length; k++)
				{
					black2 = blacks.getChildAt(k);
					if(!black2.isAlive())
						continue;
					if((black2.x==black.x-100) && (black2.y==black.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to NE?
			if((black.x==red.x+100) && (black.y==red.y-100)) /*NE*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<blacks.children.length; k++)
				{
					black2 = blacks.getChildAt(k);
					if(!black2.isAlive())
						continue;
					if((black2.x==black.x+100) && (black2.y==black.y-100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to NW?
			if((black.x==red.x-100) && (black.y==red.y-100))  /*NW*/ 
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<blacks.children.length; k++)
				{
					black2 = blacks.getChildAt(k);
					if(!black2.isAlive())
						continue;
					if((black2.x==black.x-100) && (black2.y==black.y-100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
		}
	}
	else //if red is not a queen
	{
		for(var i = 0; i<blacks.children.length; i++)
		{
			black = blacks.getChildAt(i);
			if(!black.isAlive())
				continue;
			//is there a black piece to SE?
			if((black.x==red.x+100) && (black.y==red.y+100)) /*SE*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<blacks.children.length; k++)
				{
					black2 = blacks.getChildAt(k);
					if(!black2.isAlive())
						continue;
					if((black2.x==black.x+100) && (black2.y==black.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to SW?
			if((black.x==red.x-100) && (black.y==red.y+100)) /*SW*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<blacks.children.length; k++)
				{
					black2 = blacks.getChildAt(k);
					if(!black2.isAlive())
						continue;
					if((black2.x==black.x-100) && (black2.y==black.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
		}
	}
	
	return false;
}
function checkIfARedCanJump()
{
	var red;
	for(var i=0; i<reds.children.length; i++)
	{
		red = reds.getChildAt(i);
		if(!red.isAlive())
			continue;
		if(checkIfTHISRedCanJump(red))
			return true;
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		red = redQueens.getChildAt(k);
		if(!red.isAlive())
			continue;
		if(checkIfTHISRedCanJump(red))
			return true;
	}
	return false;	
}
function listOfRedsCanJump()
{
	redsCanJump = {};
	redQueensCanJump = {};
	var red;
	for(var i=0; i<reds.children.length; i++)
	{
		red = reds.getChildAt(i);
		if(!red.isAlive())
			continue;
		if(checkIfTHISRedCanJump(red))
			redsCanJump.push(reds.getChildIndex(red));
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		red = redQueens.getChildAt(k);
		if(!red.isAlive())
			continue;
		if(checkIfTHISRedCanJump(red))
			redQueensCanJump.push(redQueens.getChildIndex(red));
	}
	return false;	
}
function checkIfTHISBlackCanJump(black)
{
	var red;
	var red2;
	var jumpable = false;
	//is it a queen?
	if(blackQueens.chidren.getChildIndex(black)!=-1) 
	{
		for(var i = 0; i<reds.children.length; i++)
		{
			red = reds.getChildAt(i);
			if(!red.isAlive())
				continue;
			//is there a black piece to SE?
			if((red.x==black.x+100) && (red.y==black.y+100)) /*SE*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<reds.children.length; k++)
				{
					red2 = reds.getChildAt(k);
					if(!red2.isAlive())
						continue;
					if((red2.x==red.x+100) && (red2.y==red.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to SW?
			if((red.x==black.x-100) && (red.y==black.y+100)) /*SW*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<reds.children.length; k++)
				{
					red2 = reds.getChildAt(i);
					if(!red2.isAlive())
						continue;
					if((red2.x==red.x-100) && (red2.y==red.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to NE?
			if((red.x==black.x+100) && (red.y==black.y-100)) /*NE*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<reds.children.length; k++)
				{
					red2 = reds.getChildAt(k);
					if(!red2.isAlive())
						continue;
					if((red2.x==red.x+100) && (red2.y==red.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to NW?
			if((red.x==black.x-100) && (red.y==black.y-100))  /*NW*/ 
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<reds.children.length; k++)
				{
					red2 = reds.getChildAt(k);
					if(!red2.isAlive())
						continue;
					if((red2.x==red.x+100) && (red2.y==red.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
		}
	}
	else //if black is not a queen
	{
		for(var i = 0; i<reds.children.length; i++)
		{
			red = reds.getChildAt(i);
			if(!red.isAlive())
				continue;
			//is there a black piece to NE?
			if((red.x==black.x+100) && (red.y==black.y-100)) /*NE*/
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<reds.children.length; k++)
				{
					red2 = reds.getChildAt(k);
					if(!red2.isAlive())
						continue;
					if((red2.x==red.x+100) && (red2.y==red.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
			//is there a black piece to NW?
			if((red.x==black.x-100) && (red.y==black.y-100))  /*NW*/ 
			{
				jumpable = true;
				//is is jumpable?
				for(var k = 0; k<reds.children.length; k++)
				{
					red2 = reds.getChildAt(k);
					if(!red2.isAlive())
						continue;
					if((red2.x==red.x+100) && (red2.y==red.y+100))
						jumpable = false;
				}
				if(jumpable)
					return true
			}
		}
	}
	
	return false;
}
function listOfBlacksCanJump()
{
	blacksCanJump = {};
	blackQueensCanJump = {};
	var black;
	for(var i=0; i<blacks.children.length; i++)
	{
		black = blacks.getChildAt(i);
		if(!black.isAlive())
			continue;
		if(checkIfTHISBlackCanJump(black))
			blacksCanJump.push(blacks.getChildIndex(black));
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		black = blackQueens.getChildAt(k);
		if(!black.isAlive())
			continue;
		if(checkIfTHISBlackCanJump(red))
			blackQueensCanJump.push(blackQueens.getChildIndex(black));
	}
	return false;	
}
function checkIfABlackCanJump()
{
	var black;
	for(var i=0; i<blacks.children.length; i++)
	{
		black = blacks.getChildAt(i);
		if(!black.isAlive())
			continue;
		if(checkIfTHISBlackCanJump(black))
		{
			
			return true;
		}
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		black = blackQueens.getChildAt(k);
		if(!black.isAlive())
			continue;
		if(checkIfTHISBlackCanJump(black))
		{
			return true;
		}
	}
	return false;
}
////////////////////////////////////////////////////////////////////////////////
function turnToggle() 
{
	listOfRedsCanJump();
	listOfBlacksCanJump();
	if (turnTrigger==0)
	{	
		turnTrigger = 1;
	}
	if (turnTrigger==1)
	{
		moveBlack();
		turnTrigger = 0;
	}

}




