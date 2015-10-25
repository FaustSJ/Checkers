//http://wonderdeep.github.io/Checkers/index.html
//Created by Sarah Faust
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

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
var selectedRedIndex;
var selectedRedStartPos = new Array(0,0);
var playerTurn=true;
var redCanJump = false;
var blackCanJump = false;
var mustJump = false;
var recentlyJumped = false;
var redsCanJump = {};
var blacksCanJump = {};
var redQueensCanJump = {};
var blackQueensCanJump = {};
var tween;
var oneIsSelected = false;
var pickedX;
var pickedY;

var redtest;

//sets up the board and the pieces.
function create() {
console.log("Creating everything.\n");
//sets up the board and the mouse input
	game.physics.startSystem(Phaser.Physics.ARCADE);
	board = game.add.sprite(0, 0, 'CheckerBoard');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	redQueens = game.add.group();
	redQueens.enableBody = true;
	redQueens.physicsBodyType = Phaser.Physics.ARCADE;
	blackQueens = game.add.group();
	blackQueens.enableBody = true;
     blackQueens.physicsBodyType = Phaser.Physics.ARCADE;

//the game pieces
	//seting up the red pieces
	reds = game.add.group();
	reds.enableBody = true;
     reds.physicsBodyType = Phaser.Physics.ARCADE;
	var alternate = true;
	for(var i = 0; i<3; i++) //rows, y
	{
		for(var k = 0; k<4; k++) //columns, x
		{
			if(alternate)
			{
				if(k===0)////////////////////////////////
				{
					var red = reds.create(150, (i*100)+50, 'RedPiece');
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}
				if(k===1)
				{
					var red = reds.create(350, (i*100)+50, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}
				if(k===2)
				{
					var red = reds.create(550, (i*100)+50, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}
				if(k===3)
				{
					var red = reds.create(750, (i*100)+50, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}	
			}
			else
			{
				if(k===0)
				{
					var red = reds.create(50, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}
				if(k===1)
				{
					var red = reds.create(250, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}
				if(k===2)
				{
					var red = reds.create(450, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}
				if(k===3)
				{
					var red = reds.create(650, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this);
				}	
			}
		}
		alternate = !alternate;
	}
	
	//seting up the black pieces
	blacks = game.add.group();
	blacks.enableBody = true;
     blacks.physicsBodyType = Phaser.Physics.ARCADE;
	alternate = true;
	for(var i = 1; i<4; i++) //rows, y
	{
		for(var k = 0; k<4; k++) //columns, x
		{
			if(alternate)
			{
				if(k===0)
				{
					var black = blacks.create(0, (i*100)+400, 'BlackPiece');
				}
				if(k===1)
				{
					var black = blacks.create(200, (i*100)+400, 'BlackPiece');
				}
				if(k===2)
				{
					var black = blacks.create(400, (i*100)+400, 'BlackPiece');
				}
				if(k===3)
				{
					var black = blacks.create(600, (i*100)+400, 'BlackPiece');
				}	
			}
			else
			{
				if(k===0)
				{
					var black = blacks.create(100, (i*100)+400, 'BlackPiece');
				}
				if(k===1)
				{
					var black = blacks.create(300, (i*100)+400, 'BlackPiece');
				}
				if(k===2)
				{
					var black = blacks.create(500, (i*100)+400, 'BlackPiece');
				}
				if(k===3)
				{
					var black = blacks.create(700, (i*100)+400, 'BlackPiece');
				}	
			}
		}
		alternate = !alternate;
	}
console.log("Finished creating everything.\n");
}
//The game officially starts once the player clicks a red piece
////////////////////////////////////////////////////////////////////////////////
//stores information about the red piece currently being moved
function selectRed(red)
{
console.log("In selectRed\n");

	if(!oneIsSelected)
	{
		selectedRedIndex = -1;
		if(redQueens.children.length>0)
		{
			if(isRedQueen(red))
			{
console.log("--Piece is a queen\n");
				selectedRedIndex = redQueens.getChildIndex(red);
			}
		}
		if(selectedRedIndex===-1)
			selectedRedIndex = reds.getChildIndex(red);
		selectedRedStartPos[0] = red.body.x;
		selectedRedStartPos[1] = red.body.y;
		oneIsSelected = true;
console.log("--Index: %i \n", selectedRedIndex);
console.log("--StartX: %i \n", selectedRedStartPos[0]);
console.log("--StartY: %i \n", selectedRedStartPos[1]);
console.log("Leaving selectRed\n");
	}
	redtest = game.add.sprite(250, 250, 'RedPiece', 1);
	tween = game.add.tween(redtest).to({x: 400, y: 400}, 1000, Phaser.Easing.Bounce.Out, true);
	tween.onComplete.removeAll();
}
//once the player drags the red piece, they drop it (unclick it)
//			and the game checks if it is a valid move.
function releaseRed()
{
console.log("In releaseRed\n");
	pickedX = game.input.x;
	pickedY = game.input.y;
	var red = reds.getChildAt(selectedRedIndex);

	//checkIfRedCanMoveHere moves the piece, the checks its location.
	if(checkIfRedCanMoveHere(red, selectedRedStartPos[0], selectedRedStartPos[1], pickedX, pickedY))
	{	
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
		if(red.body.y===700)
		{
			var redQueen = redQueens.create(red.body.x, red.body.y, 'RedQueen');
			redQueen.inputEnabled = true;
			redQueen.anchor.x = 0.5;
			redQueen.anchor.y = 0.5;
			redQueen.events.onInputDown.add(selectRed, this);
			selectRed(redQueen);
			red.kill();
		}
		
	}
	else
	{
		tween = game.add.tween(red).to({x: selectedRedStartPos[0], y: selectedRedStartPos[1]});
		tween.onComplete.removeAll();
		
/*		while(red.body.x<selectedRedStartPos[0])
		{
			red.body.velocity.x = 150;
		}
		red.body.velocity.x = 0;
		while(red.body.x>selectedRedStartPos[0])
		{
			red.body.velocity.x = -150;
		}
		red.body.velocity.x = 0;
		while(red.body.y<selectedRedStartPos[1])
		{
			red.body.velocity.y = 150;
		}
		red.body.velocity.y = 0;
		while(red.body.y>selectedRedStartPos[1])
		{
			red.body.velocity.y = -150;
		}
		red.body.velocity.y = 0;
*/
	}
	//If the selected piece has not more jumps it can make, move to next turn. 
	if(!recentlyJumped)
	{
		playerTurn = false;
	}
console.log("Leaving releaseRed\n");
}
////////////////////////////////////////////////////////////////////////////////
//checks if a spot is occupied by a single piece
function checkOccupancy1(x, y) //looks for singles
{	
console.log("In checkOccupancy1\n");
	if(x<0 || x>700 || y<0 || y>700)
	{
console.log("Leaving with null, out of bounds\n");
		return null;
	}
	var piece;
	for(var i=0; i<reds.children.length; i++)
	{
		piece = reds.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("Leaving with red piece\n");
			return piece;
		}
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		piece = redQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("Leaving with red queen piece\n");
			return piece;
		}
	}
	for(var i=0; i<blacks.children.length; i++)
	{
		piece = blacks.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("Leaving with black piece\n");
			return piece;
		}
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		piece = blackQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("Leaving with black queen piece\n");
			return piece;
		}
	}
console.log("Leaving with null, nothing found\n");
	return null;
}
//------------------------------------------------------------------------------
//checks to see if a spotis occupied by two pieces
function checkOccupancy2(x, y) //looks for doubles
{	
console.log("In checkOccupancy2\n");
	if(x<0 || x>700 || y<0 || y>700)
	{
console.log("Leaving with true, out of bounds\n");
		return true;
	}
	var occupants = 0; //shouldn't be more than 1
	var piece;
	for(var i=0; i<reds.children.length; i++)
	{
		piece = reds.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("--there is a red piece\n");
			occupants++;
		}
		if(occupants=2)
		{
console.log("Leaving with true\n");
			return true;
		}
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		piece = redQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("--there is a red queen piece\n");
			occupants++;
		}
		if(occupants=2)
		{
console.log("Leaving with true\n");
			return true;
		}
	}
	for(var i=0; i<blacks.children.length; i++)
	{
		piece = blacks.getChildAt(i);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("--there is a black piece\n");
			occupants++;
		}
		if(occupants=2)
		{
console.log("Leaving with true\n");
			return true;
		}
	}
	for(var k=0; k<blackQueens.children.length; k++)
	{
		piece = blackQueens.getChildAt(k);
		if(!piece.isAlive)
			continue;
		if((piece.body.x===x)&&(piece.body.y===y))
		{
console.log("--there is a black queen piece\n");
			occupants++;
		}
		if(occupants=2)
		{
console.log("Leaving with true\n");
			return true;
		}
	}
console.log("Leaving with false, occupancy is 1 or 0\n");
	return false;
}
//------------------------------------------------------------------------------
//is the piece red?
function isRed(red)
{
console.log("In isRed\n");
	if(reds.children.length>0)
	{
		for(var i=0; i<reds.chlidren.length; i++)
		{
			var red2 = reds.getChildAt(i);
			if(!red2.isAlive)
				continue;
			if(red.body.x===red2.body.x && red.body.y===red2.body.y)
			{
console.log("Leaving with true\n");
				return true;
			}
		}
	}
console.log("Leaving with false\n");
	return false;
}
//------------------------------------------------------------------------------
//is the piece black?
function isBlack(black)
{
console.log("In isBlack\n");
	if(blacks.children.length>0)
	{
		for(var i=0; i<blacks.chlidren.length; i++)
		{
			var black2 = blacks.getChildAt(i);
			if(!black2.isAlive)
				continue;
			if(black.body.x===black2.body.x && black.body.y===black2.body.y)
			{
console.log("Leaving with true\n");
				return true;
			}
		}
	}
console.log("Leaving with false\n");
	return false;
}
//-----------------------------------------------------------------------------
//is the piece a red queen?
function isRedQueen(red)
{
console.log("In isRedQueen\n");
	if(redQueens.children.length>0)
	{
		for(var i=0; i<redQueens.chlidren.length; i++)
		{
			var red2 = redQueens.getChildAt(i);
			if(!red2.isAlive)
				continue;
			if(red.body.x===red2.body.x && red.body.y===red2.body.y)
			{
console.log("Leaving with true\n");
				return true;
			}
		}
	}
console.log("Leaving with false\n");
	return false;
}
//-----------------------------------------------------------------------------
//is the piece a black queen?
function isBlackQueen(black)
{
console.log("In isBlackQueen\n");
	if(blackQueens.children.length>0)
	{
		for(var i=0; i<blackQueens.chlidren.length; i++)
		{
			var black2 = blackQueens.getChildAt(i);
			if(!black2.isAlive)
				continue;
			if(black.body.x===black2.body.x && black.body.y===black2.body.y)
			{
console.log("Leaving with true\n");
				return true;
			}
		}
	}
console.log("Leaving with false\n");
	return false;
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//is the dopped location valid for the selected red piece
function checkIfRedCanMoveHere(red, fromPosX, fromPosY, toPosX, toPosY)
{
console.log("In checkIfRedCanMoveHere\n");
console.log("\tgiven:\n");
console.log("--fromX: %i\n", fromPosX);
console.log("--fromY: %i\n", fromPosY);
console.log("--toX: %i\n", toPosX);
console.log("--toY: %i\n", toPosY);

	//first, adjust the coordinates
	var extraX;
	var extraY;
	extra = toPosX%150;
	toPosX -= extraX;
	extra = toPosY%150;
	toPosY -= extraY;
	
/*
	while(red.body.x>extraX)
	{
		red.body.velocity.x = -150;
	}
	red.body.velocity.x = 0;
	while(red.body.y>extraY)
	{
		red.body.velocity.y = -150;
	}
	red.body.velocity.y = 0;
*/

console.log("--adjustedXPos: %i\n", toPosX);
console.log("--adjustedYPos: %i\n", toPosY);

	//and make sure they're still on the board
	if(toPosX<0 || toPosX>700 || toPosY<0 || toPosY>700)
	{
		console.log("Leaving with false, out-of-bounds\n");
		return false;
	}
	//and that they actually relocated
	if(toPosX===fromPosX && toPosY===fromPosY)
	{
		console.log("Leaving with false, didn't relocate\n");
		return false;
	}
	//aaand that they aren't going too far
	if((Math.abs(fromPosX-toPosX)>=300)&&(Math.abs(fromPosY-toPosY)>=300))
	{
		console.log("Leaving with false, going too far\n");
		return false;		
	}

console.log("--beforeMoveX: %i\n", red.x);
console.log("--beforeMoveX: %i\n", red.y);
	//Now move the piece
	tween = game.add.tween(red).to({x: toPosX, y: toPosY});
	tween.onComplete.removeAll();
console.log("--afterMoveX: %i\n", red.x);
console.log("--afterMoveX: %i\n", red.y);	

	//then check if the space is already occupied
	if(checkOccupancy2(red.body.x, red.body.y))
	{
		console.log("Leaving with false, space occupied\n");
		return false;
	}
	
	//now we ask, did it jump?
	if((Math.abs(fromPosX-red.body.x)===200)&&(Math.abs(fromPosY-red.body.y)===200))
	{
		//was it supposed to?
		if(redsCanJump.indexOf(selectedRedIndex)===-1)
		{
			console.log("Leaving with false, can't jump that piece\n");
			return false;
		}
		
		//did jump in a legal direction?
		if((!isRedQueen(red))&&(red.body.y<fromPosY))
		{
			console.log("Leaving with false, can't jump in that direction\n");
			return false;
		}
		
		//did it actually jump over anything?
		var checkX = (red.body.x+fromPosX)/2;
		var checkY = (red.body.y+fromPosY)/2;
		if(checkOccupancy1(checkX, checkY)!=null)
		{
			var piece = checkOccupancy1(checkX, checkY);
			if((!isBlack(piece))&&(!isBlackQueen(piece)))
			{
				console.log("Leaving with false, didn't jump over anything\n");
				return false;
			}
			piece.kill();
		}
		recentlyJumped = true;
		console.log("Leaving with true, it jumped\n");
		return true;
	}
	else //it only moved one space
	{
		if((Math.abs(fromPosX-red.body.x)===100)&&(Math.abs(fromPosY-red.body.y)===100))
		{
			//was it supposed to jump?
			if(redsCanJump.indexOf(selectedRedIndex)!=-1)
			{
				console.log("Leaving with false, has to jump\n");
				return false;
			}
			
			//did it move in a legal direction?
			if((!isRedQueen(red))&&(red.body.y<fromPosY))
			{
				console.log("Leaving with false, can't move in that direction\n");
				return false;
			}
			console.log("Leaving with true, it moved\n");
			return true;
		}
	}
	console.log("Leaving with false, (ERROR)\n");
	return false;
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function moveBlack()
{
console.log("In moveBlack\n");
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
					if((red.body.x===black.body.x+100) && (red.body.y===black.body.y-100)) /*NE*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.body.x+100, red.body.y-100))
						{
							var toX = black.body.x+100;
							var toY = black.body.y-100;
							/*
							while(black.body.x < (red.body.x+100))
							{
								black.body.velocity.x = 150;
							}
							black.body.velocity.x = 0;
							while(black.body.y > (red.body.y-100))
							{
								black.body.velocity.y = -150;
							}
							black.body.velocity.y = 0;
							*/
							tween = game.add.tween(black).to({x: toX, y: toY});
							tween.onComplete.removeAll();
							red.kill();
							break;
						}
					}
					//is there a red piece to NW?
					if((red.body.x===black.body.x-100) && (red.body.y===black.body.y-100))  /*NW*/ 
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.body.x-100, red.body.y-100))
						{
							var toX = black.body.x-100;
							var toY = black.body.y-100;
							/*
							while(black.body.x > (red.body.x-100))
							{
								black.body.velocity.x = -150;
							}
							black.body.velocity.x = 0;
							while(black.body.y > (red.body.y-100))
							{
								black.body.velocity.y = -150;
							}
							black.body.velocity.y = 0;
							*/
							tween = game.add.tween(black).to({x: toX, y: toY});
							tween.onComplete.removeAll();
							red.kill();
							break;
						}
					}
				}
				//can it jump again?
				if(!checkIfTHISBlackCanJump(black))
				{
					recentlyJumped = false;
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
					if((red.body.x===black.body.x+100) && (red.body.y===black.body.y+100)) /*SE*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.body.x+100, red.body.y+100))
						{
							var toX = black.body.x+100;
							var toY = black.body.y+100;
							/*
							while(black.body.x < (red.body.x+100))
							{
								black.body.velocity.x = 150;
							}
							black.body.velocity.x = 0;
							while(black.body.y < (red.body.y+100))
							{
								black.body.velocity.y = 150;
							}
							black.body.velocity.y = 0;
							*/
							tween = game.add.tween(black).to({x: toX, y: toY});
							tween.onComplete.removeAll();
							red.kill();
							break;
						}
					}
					//is there a red piece to SW?
					if((red.body.x===black.body.x-100) && (red.body.y===black.body.y+100)) /*SW*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.body.x-100, red.body.y+100))
						{
							var toX = black.body.x-100;
							var toY = black.body.y+100;
							/*
							while(black.body.x > (red.body.x-100))
							{
								black.body.velocity.x = -150;
							}
							black.body.velocity.x = 0;
							while(black.body.y < (red.body.y+100))
							{
								black.body.velocity.y = 150;
							}
							black.body.velocity.y = 0;
							*/
							tween = game.add.tween(black).to({x: toX, y: toY});
							tween.onComplete.removeAll();
							red.kill();
							break;
						}
					}
					//is there a red piece to NE?
					if((red.body.x===black.body.x+100) && (red.body.y===black.body.y-100)) /*NE*/
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.body.x+100, red.body.y-100))
						{
							var toX = black.body.x+100;
							var toY = black.body.y-100;
							/*
							while(black.body.x < (red.body.x+100))
							{
								black.body.velocity.x = 150;
							}
							black.body.velocity.x = 0;							
							while(black.body.y > (red.body.y-100))
							{
								black.body.velocity.y = -150;
							}
							black.body.velocity.y = 0;
							*/
							tween = game.add.tween(black).to({x: toX, y: toY});
							tween.onComplete.removeAll();
							red.kill();
							break;
						}
					}
					//is there a red piece to NW?
					if((red.body.x===black.body.x-100) && (red.body.y===black.body.y-100))  /*NW*/ 
					{
						//move the black, kill the red
						if(!checkOccupancy1(red.body.x-100, red.body.y-100))
						{
							var toX = black.body.x-100;
							var toY = black.body.y-100;
							/*
							while(black.body.x > (red.body.x-100))
							{
								black.body.velocity.x = -150;
							}
							black.body.velocity.x = 0;
							while(black.body.y > (red.body.y-100))
							{
								black.body.velocity.y = -150;
							}
							black.body.velocity.y = 0;
							*/
							tween = game.add.tween(black).to({x: toX, y: toY});
							tween.onComplete.removeAll();
							red.kill();
							break;
						}
					}
				}
				//can it jump again?
				if(!checkIfTHISBlackCanJump(black))
				{
					recentlyJumped = false;
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
				var canMoveNE = checkOccupancy1(black.body.x+100, black.body.y-100);
				if(canMoveNE)
				{
					var toX = black.body.x+100;
					var toY = black.body.y-100;
					/*
					while(black.body.x < toX)
					{
						black.body.velocity.x = 150;
					}
					black.body.velocity.x = 0;
					while(black.body.y > toY)
					{
						black.body.velocity.y = -150;
					}
					black.body.velocity.y = 0;
					*/
					tween = game.add.tween(black).to({x: toX, y: toY});
					tween.onComplete.removeAll();
				}
				var canMoveNW = checkOccupancy1(black.body.x-100, black.body.y-100);
				if(canMoveNW)
				{
					var toX = black.body.x-100;
					var toY = black.body.y-100;
					/*
					while(black.body.x > toX)
					{
						black.body.velocity.x = -150;
					}
					black.body.velocity.x = 0;
					while(black.body.y > toY)
					{
						black.body.velocity.y = -150;
					}
					black.body.velocity.y = 0;
					*/
					tween = game.add.tween(black).to({x: toX, y: toY});
					tween.onComplete.removeAll();
				}
				var canMoveSE = checkOccupancy1(black.body.x+100, black.body.y+100);
				if(canMoveSE)
				{
					var toX = black.body.x+100;
					var toY = black.body.y+100;
					/*
					while(black.body.x < toX)
					{
						black.body.velocity.x = 150;
					}
					black.body.velocity.x = 0;
					while(black.body.y < toY)
					{
						black.body.velocity.y = 150;
					}
					black.body.velocity.y = 0;
					*/
					tween = game.add.tween(black).to({x: toX, y: toY});
					tween.onComplete.removeAll();
				}
				var canMoveSW = checkOccupancy1(black.body.x-100, black.body.y+100);
				if(canMoveSW)
				{
					var toX = black.body.x-100;
					var toY = black.body.y+100;
					/*
					while(black.body.x > toX)
					{
						black.body.velocity.x = -150;
					}
					black.body.velocity.x = 0;
					while(black.body.y < toY)
					{
						black.body.velocity.y = 150;
					}
					black.body.velocity.y = 0;
					*/
					tween = game.add.tween(black).to({x: toX, y: toY});
					tween.onComplete.removeAll();
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
				var canMoveNE = checkOccupancy1(black.body.x+100, black.body.y-100);
				if(canMoveNE)
				{
					var toX = black.body.x+100;
					var toY = black.body.y-100;
					/*
					while(black.body.x < toX)
					{
						black.body.velocity.x = 150;
					}
					black.body.velocity.x = 0;
					while(black.body.y > toY)
					{
						black.body.velocity.y = -150;
					}
					black.body.velocity.y = 0;
					*/
					tween = game.add.tween(black).to({x: toX, y: toY});
					tween.onComplete.removeAll();
				}
				var canMoveNW = checkOccupancy1(black.body.x-100, black.body.y-100);
				if(canMoveNW)
				{
					var toX = black.body.x-100;
					var toY = black.body.y-100;
					/*
					while(black.body.x > toX)
					{
						black.body.velocity.x = -150;
					}
					black.body.velocity.x = 0;
					while(black.body.y > toY)
					{
						black.body.velocity.y = -150;
					}
					black.body.velocity.y = 0;
					*/
					tween = game.add.tween(black).to({x: toX, y: toY});
					tween.onComplete.removeAll();
				}
			}
		}
	}
		
	if(!recentlyJumped)
		playerTurn = true;
console.log("Leaving moveBlack\n");
}
////////////////////////////////////////////////////////////////////////////////
//are there any jumps available for a specific red?
function checkIfTHISRedCanJump(red)
{
console.log("In checkIfTHISRedCanJump\n");
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
			if((black.body.x===red.body.x+100) && (black.body.y===red.body.y+100)) /*SE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.body.x+100, black.body.y+100))
				{
console.log("Leaving with true, to the SE\n");
					return true;
				}
			}
			//is there a black piece to SW?
			if((black.body.x===red.body.x-100) && (black.body.y===red.body.y+100)) /*SW*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.body.x-100, black.body.y+100))
				{
console.log("Leaving with true, to the SW\n");
					return true;
				}
			}
			//is there a black piece to NE?
			if((black.body.x===red.body.x+100) && (black.body.y===red.body.y-100)) /*NE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.body.x+100, black.body.y-100))
				{
console.log("Leaving with true, to the NE\n");
					return true;
				}
			}
			//is there a black piece to NW?
			if((black.body.x===red.body.x-100) && (black.body.y===red.body.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(!checkOccupancy1(black.body.x-100, black.body.y-100))
				{
console.log("Leaving with true, to the NW\n");
					return true;
				}
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
			if((black.body.x===red.body.x+100) && (black.body.y===red.body.y+100)) /*SE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.body.x+100, black.body.y+100))
				{
console.log("Leaving with true, to the SE\n");
					return true;
				}
			}
			//is there a black piece to SW?
			if((black.body.x===red.body.x-100) && (black.body.y===red.body.y+100)) /*SW*/
			{
				//is is jumpable?
				if(!checkOccupancy1(black.body.x-100, black.body.y+100))
				{
console.log("Leaving with true, to the SW\n");
					return true;
				}
			}
		}
	}
console.log("Leaving with false, can't jump anywhere\n");
	return false;
}
//------------------------------------------------------------------------------
//are there any jumps available for reds?
function checkIfARedCanJump()
{
console.log("In checkIfARedCanJump\n");
	var red;
	for(var i=0; i<reds.children.length; i++)
	{
		red = reds.getChildAt(i);
		if(!red.isAlive)
			continue;
		if(checkIfTHISRedCanJump(red))
		{
console.log("Leaving with true\n");
			return true;
		}
	}
	for(var k=0; k<redQueens.children.length; k++)
	{
		red = redQueens.getChildAt(k);
		if(!red.isAlive)
			continue;
		if(checkIfTHISRedCanJump(red))
		{
console.log("Leaving with true\n");
			return true;
		}
	}
console.log("Leaving with false, no reds can jump\n");
	return false;	
}
//------------------------------------------------------------------------------
//which reds can jump?
function listOfRedsCanJump()
{
console.log("In listOfRedsCanJump\n");
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
console.log("Leaving listOfRedsCanJump\n");
}
//------------------------------------------------------------------------------
//are there any jumps available for a specific black?
function checkIfTHISBlackCanJump(black)
{
console.log("In checkIfTHISBlackCanJump\n");
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
			if((red.body.x===black.body.x+100) && (red.body.y===black.body.y+100)) /*SE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.body.x+100, red.body.y+100))
				{
console.log("Leaving with true, to the SE\n");
					return true;
				}
			}
			//is there a red piece to SW?
			if((red.body.x===black.body.x-100) && (red.body.y===black.body.y+100)) /*SW*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.body.x-100, red.body.y+100))
				{
console.log("Leaving with true, to the SW\n");
					return true;
				}
			}
			//is there a red piece to NE?
			if((red.body.x===black.body.x+100) && (red.body.y===black.body.y-100)) /*NE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.body.x+100, red.body.y-100))
				{
console.log("Leaving with true, to the NE\n");
					return true;
				}
			}
			//is there a red piece to NW?
			if((red.body.x===black.body.x-100) && (red.body.y===black.body.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(!checkOccupancy1(red.body.x-100, red.body.y-100))
				{
console.log("Leaving with true, to the NW\n");
					return true;
				}
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
			if((red.body.x===black.body.x+100) && (red.body.y===black.body.y-100)) /*NE*/
			{
				//is is jumpable?
				if(!checkOccupancy1(red.body.x+100, red.body.y-100))
				{
console.log("Leaving with true, to the NE\n");
					return true;
				}
			}
			//is there a black piece to NW?
			if((red.body.x===black.body.x-100) && (red.body.y===black.body.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(!checkOccupancy1(red.body.x-100, red.body.y-100))
				{
console.log("Leaving with true, to the NW\n");
					return true;
				}
			}
		}
	}
console.log("Leaving with false, this black can't jump\n");
	return false;
}
//------------------------------------------------------------------------------
//are there any jumps available for blacks?
function checkIfABlackCanJump()
{
console.log("In checkIfABlackCanJump\n");
	var black;
	for(var i=0; i<blacks.children.length; i++)
	{
		black = blacks.getChildAt(i);
		if(!black.isAlive)
			continue;
		if(checkIfTHISBlackCanJump(black))
		{
console.log("Leaving with true\n");
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
console.log("Leaving with true\n");
			return true;
		}
	}
console.log("Leaving with false, no blacks can jump\n");
	return false;
}
//------------------------------------------------------------------------------
//which blacks can jump?
function listOfBlacksCanJump()
{
console.log("In listOfBlacksCanJumps\n");
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
console.log("Leaving listOfBlacksCanJump\n");
}
////////////////////////////////////////////////////////////////////////////////
//move on to the next turn
function update()
{
	if(playerTurn && oneIsSelected)
	{
		game.input.onDown.add(releaseRed, this);
	}
	if(!playerTurn)
		moveBlack();
}




