//http://wonderdeep.github.io/Checkers/index.html
//Created by Sarah Faust
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'game', { preload: preload, create: create});

function preload() {
	game.load.image('BlackPiece', 'assets/BlackPiece.png');
	game.load.image('BlackQueen', 'assets/BlackQueen.png');
	game.load.image('CheckerBoard', 'assets/CheckerBoard.jpg');
	game.load.image('RedPiece', 'assets/RedPiece.png');
	game.load.image('RedQueen', 'assets/RedQueen.png');
}

var board;
var reds;
var blacks;
var selectedRed = null;
var selectedRedIndex = -1;
var selectedRedStartPos = new Array(0,0);
var turnTrigger = 0;
var redCanJump = false;
var blackCanJump = false;
var mustJump = false;
var recentlyJumped = false;
var redsCanJump = {};
var blacksCanJump = {};
var redQueensCanJump = {};
var blackQueensCanJump = {};

//sets up the board and the pieces.
function create() {
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
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
//The game officially starts once the player clicks a red piece
////////////////////////////////////////////////////////////////////////////////
//stores information about the red piece currently being moved
function selectRed(red)
{
	selectedRed = red;
	selectedIndex = -1;
	if(redQueens.children.length>0)
	{
		if(isRedQueen(red))
			selectedIndex.redQueens.getChildIndex(red);
		if(selectedIndex==-1)
			selectedIndex.reds.getChildIndex(red);
	}
	else
	{
		selectedIndex = reds.getChildIndex(red);
	}
	selectedRedStartPos[0] = red.posX;
	selectedRedStartPos[1] = red.posY;
}
//once the player drags the red piece, they drop it (unclick it)
//			and the game checks if it is a valid move.
function releaseRed(selectedRed)
{
	if(checkIfRedCanMoveHere(selectedRed, selectedRedStartPos[0], selectedRedStartPos[1], selectedRed.posX, selectedRed.posY))
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
		red.x = selectedRedStartPos[0];
		red.y = selectedRedStartPos[1];
	}
	//If the selected piece has not more jumps it can make, move to next turn. 
	if(!recentlyJumped)
	{
		selectedRed = null;
		turnToggle();
	}
}
////////////////////////////////////////////////////////////////////////////////
//sets up each pieces position
function setPos(piece, posX, posY)
{
	piece.posX = posX;
	piece.posY = posY;
}
//checks if a spot is occupied by a single piece
function checkOccupancy1(x, y) //looks for singles
{	
	if(x<0 || x>700 || y<0 || y>700)
		return true;
	var piece;
	for(var i=0; i<reds.children.length; i++)
	{
		piece = reds.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		piece = redQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	for(var i=0; i<blacks.children.length; i++)
	{
		piece = blacks.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		piece = blackQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			return piece;
	}
	return null;
}
//checks to see if a spotis occupied by two pieces
function checkOccupancy2(x, y) //looks for doubles
{	
	if(x<0 || x>700 || y<0 || y>700)
		return true;
	var occupants = 0; //shouldn't be more than 1
	var piece;
	for(var i=0; i<reds.children.length; i++)
	{
		piece = reds.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		piece = redQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	for(var i=0; i<blacks.children.length; i++)
	{
		piece = blacks.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		piece = blackQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.x==x)&&(piece.y==y))
			occupants++;
		if(occupants=2)
			return true;
	}
	return false;
}
//is the piece red?
function isRed(red)
{
	if(reds.children.length>0)
	{
		for(var i=0; i<reds.chlidren.length; i++)
		{
			var red2 = reds.getChildAt(i);
			if(!red2.isAlive)
				continue;
			if(red.x==red2.x && red.y==red2.y)
				return true;
		}
	}
	return false;
}
//is the piece black?
function isBlack(black)
{
	if(blacks.children.length>0)
	{
		for(var i=0; i<blacks.chlidren.length; i++)
		{
			var black2 = blacks.getChildAt(i);
			if(!black2.isAlive)
				continue;
			if(black.x==black2.x && black.y==black2.y)
				return true;
		}
	}
	return false;
}
//is the piece a red queen?
function isRedQueen(red)
{
	if(redQueens.children.length>0)
	{
		for(var i=0; i<redQueens.chlidren.length; i++)
		{
			var red2 = redQueens.getChildAt(i);
			if(!red2.isAlive)
				continue;
			if(red.x==red2.x && red.y==red2.y)
				return true;
		}
	}
	return false;
}
//is the piece a black queen?
function isBlackQueen(black)
{
	if(blackQueens.children.length>0)
	{
		for(var i=0; i<blackQueens.chlidren.length; i++)
		{
			var black2 = blackQueens.getChildAt(i);
			if(!black2.isAlive)
				continue;
			if(black.x==black2.x && black.y==black2.y)
				return true;
		}
	}
	return false;
}
///////////////////////////////////////////////////////////////////////////////
//is the dopped location valid for the selected red piece
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
	//and thet they actually moved
	if(red.x==fromPosX && red.y==fromPosY)
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
		if((!isRedQueen(red))&&(red.y<fromPosY))
			return false;
		
		//did it actually jump over anything?
		var checkX = (red.x+fromPosX)/2;
		var checkY = (red.y+fromPosY)/2;
		if(checkOccupancy1(checkX, checkY)!=null)
		{
			var piece = checkOccupancy1(checkX, checkY);
			if((!isBlack(piece))&&(!isBlackQueen(piece)))
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
			if((!isRedQueen(red))&&(red.y<fromPosY))
				return false;
			
			return true
		}
		
	}
	return false;
}
 function moveBlack()
{
	var black;
	var pick = Math.random();
	//can any blacks jump?
	if(checkIfABlackCanJump())
	{
		//grab from queen or regular index list
		if(pick<0.5 && blacksCanJump.length>0)
		{
			black = blacks.getChildAt(blacksCanJump[0]);
			//modify checkifthisjump to find a jumping position and jump
			recentlyJumped = true;
		
			while(recentlyJumped)
			{
				for(var i = 0; i<reds.children.length; i++)
				{
					red = reds.getChildAt(i);
					if(!red.isAlive)
						continue;
					//is there a red piece to NE?
					if((red.x==black.x+100) && (red.y==black.y-100)) /*NE*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.x+100, red.y-100))
						{
							black.x = red.x+100;
							black.y = red.y-100;
							red.kill();
							break;
						}
					}
					//is there a red piece to NW?
					if((red.x==black.x-100) && (red.y==black.y-100))  /*NW*/ 
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.x-100, red.y-100))
						{
							black.x = red.x-100;
							black.y = red.y-100;
							red.kill();
							break;
						}
					}
				}
				//can it jump again?
				if(!checkIfTHISBlackCanJump(black))
				{
					recentlyJumped = false
				}	
			}
		}
		if(pick>=0.5 && blackQueensCanJump>0)
		{
			black = blackQueens.getChildAt(blacksCanJump[0]);
			//modify checkifthisjump to find a jumping position and jump
			recentlyJumped = true;
			while(recentlyJumped)
			{
				for(var i = 0; i<reds.children.length; i++)
				{
					red = reds.getChildAt(i);
					if(!red.isAlive)
						continue;
					//is there a red piece to SE?
					if((red.x==black.x+100) && (red.y==black.y+100)) /*SE*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.x+100, red.y+100))
						{
							black.x = red.x+100;
							black.y = red.y+100;
							red.kill();
							break;
						}
					}
					//is there a red piece to SW?
					if((red.x==black.x-100) && (red.y==black.y+100)) /*SW*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.x-100, red.y+100))
						{
							black.x = red.x-100;
							black.y = red.y+100;
							red.kill();
							break;
						}
					}
					//is there a red piece to NE?
					if((red.x==black.x+100) && (red.y==black.y-100)) /*NE*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.x+100, red.y-100))
						{
							black.x = red.x+100;
							black.y = red.y-100;
							red.kill();
							break;
						}
					}
					//is there a red piece to NW?
					if((red.x==black.x-100) && (red.y==black.y-100))  /*NW*/ 
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.x-100, red.y-100))
						{
							black.x = red.x-100;
							black.y = red.y-100;
							red.kill();
							break;
						}
					}
				}
				//can it jump again?
				if(!checkIfTHISBlackCanJump(black))
				{
					recentlyJumped = false
				}	
			}
		}
		
	}
	else
	{//if a black can't jump, pick a random black and move it.
		var either = Math.random();
		
		if(either<0.5 && blackQueens.children.length!=0)
		{
			for(var i=0; i<blackQueens.children.length; i++)
			{
				black = blackQueens.getChildAt(i);
				if(!black.isAlive)
					continue;
				//if it can move, move it
				var canMoveNE = checkOccupancy1(black.x+100, black.y-100);
				if(canMoveNE)
				{
					black.x = black.x+100;
					black.y = black.y-100;
				}
				var canMoveNW = checkOccupancy1(black.x-100, black.y-100);
				if(canMoveNW)
				{
					black.x = black.x-100;
					black.y = black.y-100;
				}
				var canMoveSE = checkOccupancy1(black.x+100, black.y+100);
				if(canMoveSE)
				{
					black.x = black.x+100;
					black.y = black.y+100;
				}
				var canMoveSW = checkOccupancy1(black.x-100, black.y+100);
				if(canMoveSW)
				{
					black.x = black.x-100;
					black.y = black.y+100;
				}
			}
		}
		else
		{
			for(var i=0; i<blacks.children.length; i++)
			{
				black = blacks.getChildAt(i);
				if(!black.isAlive)
					continue;
				//if it can move, move it
				var canMoveNE = checkOccupancy1(black.x+100, black.y-100);
				if(canMoveNE)
				{
					black.x = black.x+100;
					black.y = black.y-100;
				}
				var canMoveNW = checkOccupancy1(black.x-100, black.y-100);
				if(canMoveNW)
				{
					black.x = black.x-100;
					black.y = black.y-100;
				}
			}
		}
	}
		
	if(!recentlyJumped)
		toggleTurn();
}
////////////////////////////////////////////////////////////////////////////////
//are there any jumps available for a specific red?
function checkIfTHISRedCanJump(red)
{
	var black;
	var black2;
	var jumpable = false;
	//is it a queen?
	if(isRedQueen(red)) 
	{
		for(var i = 0; i<blacks.children.length; i++)
		{
			black = blacks.getChildAt(i);
			if(!black.isAlive)
				continue;
			//is there a black piece to SE?
			if((black.x==red.x+100) && (black.y==red.y+100)) /*SE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.x+100, black.y+100))
					return true
			}
			//is there a black piece to SW?
			if((black.x==red.x-100) && (black.y==red.y+100)) /*SW*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.x-100, black.y+100))
					return true
			}
			//is there a black piece to NE?
			if((black.x==red.x+100) && (black.y==red.y-100)) /*NE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.x+100, black.y-100))
					return true
			}
			//is there a black piece to NW?
			if((black.x==red.x-100) && (black.y==red.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(!checkOccupancy1(black.x-100, black.y-100))
					return true
			}
		}
	}
	else //if red is not a queen
	{
		for(var i = 0; i<blacks.children.length; i++)
		{
			black = blacks.getChildAt(i);
			if(!black.isAlive)
				continue;
			//is there a black piece to SE?
			if((black.x==red.x+100) && (black.y==red.y+100)) /*SE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.x+100, black.y+100))
					return true
			}
			//is there a black piece to SW?
			if((black.x==red.x-100) && (black.y==red.y+100)) /*SW*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.x-100, black.y+100))
					return true
			}
		}
	}
	
	return false;
}
//are there any jumps available for reds?
function checkIfARedCanJump()
{
	var red;
	for(var i=0; i<reds.children.length; i++)
	{
		red = reds.getChildAt(i);
		if(!red.isAlive)
			continue;
		if(checkIfTHISRedCanJump(red))
			return true;
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		red = redQueens.getChildAt(k);
		if(!red.isAlive)
			continue;
		if(checkIfTHISRedCanJump(red))
			return true;
	}
	return false;	
}
//which reds can jump?
function listOfRedsCanJump()
{
	redsCanJump = {};
	redQueensCanJump = {};
	var red;
	for(var i=0; i<reds.children.length; i++)
	{
		red = reds.getChildAt(i);
		if(!red.isAlive)
			continue;
		if(checkIfTHISRedCanJump(red))
			redsCanJump.push(reds.getChildIndex(red));
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		red = redQueens.getChildAt(k);
		if(!red.isAlive)
			continue;
		if(checkIfTHISRedCanJump(red))
			redQueensCanJump.push(redQueens.getChildIndex(red));
	}
	return false;	
}
//-----------------------------------------------------------------------
//are there any jumps available for a specific black?
function checkIfTHISBlackCanJump(black)
{
	var red;
	var red2;
	var jumpable = false;
	//is it a queen?
	if(isBlackQueen(black)) 
	{
		for(var i = 0; i<reds.children.length; i++)
		{
			red = reds.getChildAt(i);
			if(!red.isAlive)
				continue;
			//is there a red piece to SE?
			if((red.x==black.x+100) && (red.y==black.y+100)) /*SE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.x+100, red.y+100))
					return true
			}
			//is there a red piece to SW?
			if((red.x==black.x-100) && (red.y==black.y+100)) /*SW*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.x-100, red.y+100))
					return true
			}
			//is there a red piece to NE?
			if((red.x==black.x+100) && (red.y==black.y-100)) /*NE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.x+100, red.y-100))
					return true
			}
			//is there a red piece to NW?
			if((red.x==black.x-100) && (red.y==black.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(!checkOccupancy1(red.x-100, red.y-100))
					return true
			}
		}
	}
	else //if black is not a queen
	{
		for(var i = 0; i<reds.children.length; i++)
		{
			red = reds.getChildAt(i);
			if(!red.isAlive)
				continue;
			//is there a black piece to NE?
			if((red.x==black.x+100) && (red.y==black.y-100)) /*NE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.x+100, red.y-100))
					return true
			}
			//is there a black piece to NW?
			if((red.x==black.x-100) && (red.y==black.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(!checkOccupancy1(red.x-100, red.y-100))
					return true
			}
		}
	}
	
	return false;
}
//are there any jumps available for blacks?
function checkIfABlackCanJump()
{
	var black;
	for(var i=0; i<blacks.children.length; i++)
	{
		black = blacks.getChildAt(i);
		if(!black.isAlive)
			continue;
		if(checkIfTHISBlackCanJump(black))
		{
			
			return true;
		}
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		black = blackQueens.getChildAt(k);
		if(!black.isAlive)
			continue;
		if(checkIfTHISBlackCanJump(black))
		{
			return true;
		}
	}
	return false;
}
//which blacks can jump?
function listOfBlacksCanJump()
{
	blacksCanJump = {};
	blackQueensCanJump = {};
	var black;
	for(var i=0; i<blacks.children.length; i++)
	{
		black = blacks.getChildAt(i);
		if(!black.isAlive)
			continue;
		if(checkIfTHISBlackCanJump(black))
			blacksCanJump.push(blacks.getChildIndex(black));
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		black = blackQueens.getChildAt(k);
		if(!black.isAlive)
			continue;
		if(checkIfTHISBlackCanJump(red))
			blackQueensCanJump.push(blackQueens.getChildIndex(black));
	}
	return false;	
}
////////////////////////////////////////////////////////////////////////////////
//move on to the next turn
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




