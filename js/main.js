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
var redsCanJump = [];
var blacksCanJump = [];
var redQueensCanJump = [];
var blackQueensCanJump = [];
var tween;
var oneIsSelected = false;
var pickedX;
var pickedY;

var redQueensAmount = 0;
var blackQueensAmount = 0;

//sets up the board and the pieces.
function create() {
console.log("Creating everything.\n");
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
	redQueens = game.add.group();
	blackQueens = game.add.group();

//the game pieces
	//seting up the red pieces
	reds = game.add.group();
	var alternate = true;
	for( i = 0; i<3; i++) //rows, y
	{
		for( k = 0; k<4; k++) //columns, x
		{
			if(alternate)
			{
				if(k===0)////////////////////////////////
				{
					var red = reds.create(150, (i*100)+50, 'RedPiece');
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
				}
				if(k===1)
				{
					var red = reds.create(350, (i*100)+50, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
				}
				if(k===2)
				{
					var red = reds.create(550, (i*100)+50, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
				}
				if(k===3)
				{
					var red = reds.create(750, (i*100)+50, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
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
					red.events.onInputDown.add(selectRed, this, red);
				}
				if(k===1)
				{
					var red = reds.create(250, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
				}
				if(k===2)
				{
					var red = reds.create(450, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
				}
				if(k===3)
				{
					var red = reds.create(650, i*150, 'RedPiece');	
					red.inputEnabled = true;
					red.anchor.x = 0.5;
					red.anchor.y = 0.5;
					red.events.onInputDown.add(selectRed, this, red);
				}	
			}
		}
		alternate = !alternate;
	}
	//seting up the black pieces
	blacks = game.add.group();
	alternate = true;
	for( i = 1; i<4; i++) //rows, y
	{
		for( k = 0; k<4; k++) //columns, x
		{
			if(alternate)
			{
				if(k===0)
				{
					var black = blacks.create(50, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}
				if(k===1)
				{
					var black = blacks.create(250, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}
				if(k===2)
				{
					var black = blacks.create(450, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}
				if(k===3)
				{
					var black = blacks.create(650, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}	
			}
			else
			{
				if(k===0)
				{
					var black = blacks.create(150, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}
				if(k===1)
				{
					var black = blacks.create(350, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}
				if(k===2)
				{
					var black = blacks.create(550, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}
				if(k===3)
				{
					var black = blacks.create(750, (i*100)+450, 'BlackPiece');
					black.anchor.x = 0.5;
					black.anchor.y = 0.5;
				}	
			}
		}
		alternate = !alternate;
	}
console.log("Finished creating everything.\n");
}
//The game officially starts once the player clicks a red piece

////////////////////////////////////////////////////////////////////////////////
/////////////////////The Playing Process////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//stores information about the red piece currently being moved
function selectRed(red)
{
console.log("In selectRed\n");

	if(!oneIsSelected)
	{
		selectedRedIndex = -1;
		if(redQueensAmount>0)
		{
			if(isRedQueen(red))
			{
console.log("--Piece is a queen\n");
				selectedRedIndex = redQueens.getChildIndex(red);
			}
		}
		if(selectedRedIndex===-1)
			selectedRedIndex = reds.getChildIndex(red);
		selectedRedStartPos[0] = red.x;
		selectedRedStartPos[1] = red.y;
		oneIsSelected = true;
console.log("--Index: %i \n", selectedRedIndex);
console.log("--StartX: %i \n", selectedRedStartPos[0]);
console.log("--StartY: %i \n", selectedRedStartPos[1]);
console.log("Leaving selectRed\n");
	}
}
////////////////////////////////////////////////////////////////////////////////
//once the player drags the red piece, they drop it (unclick it)
//			and the game checks if it is a valid move.
function releaseRed()
{
	if(oneIsSelected)
	{
	console.log("In releaseRed\n");
		pickedX = game.input.x;
		pickedY = game.input.y;
		var red = reds.getChildAt(selectedRedIndex);
		
		//update the lists
console.log("-->");
		listOfBlacksCanJump();
console.log("<--releaseRed\n");
console.log("-->");
		listOfRedsCanJump();
console.log("<--ReleaseRed\n");
		
	console.log("--grabedRedX: %i\n", red.x);
	console.log("--grabedRedY: %i\n", red.y);	
	console.log("--preAdjXPos: %i\n", pickedX);
	console.log("--perAdjYPos: %i\n", pickedY);
		//first, adjust the coordinates
		var extra;
		extra = pickedX%100;
		pickedX -= extra;
		pickedX += 50;
		extra = pickedY%100;
		pickedY -= extra;
		pickedY += 50;
	
	console.log("--adjustedXPos: %i\n", pickedX);
	console.log("--adjustedYPos: %i\n", pickedY);
	
		//checkIfRedCanMoveHere moves the piece, the checks its location.
console.log("-->");
		if(checkIfRedCanMoveHere(red, selectedRedStartPos[0], selectedRedStartPos[1], pickedX, pickedY))
		{	
console.log("<--releaseRed\n");
			tween = game.add.tween(red).to({x: pickedX, y: pickedY}, 500, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();
			red.x = pickedX;
			red.y = pickedY;
			//did it jump?
			if(recentlyJumped)
			{
				//update the lists
console.log("-->");
				listOfBlacksCanJump();
console.log("<--releaseRed\n");
console.log("-->");
				listOfRedsCanJump();
console.log("<--releaseRed\n");
				//does it have more jumps to make?
				var found = false;
				for(i = 0; i<redsCanJump.length; i++)
				{
					console.log("-->");
					if((redsCanJump[i]===selectedRedIndex)&&(!isRedQueen(red)))
						found = true;
					console.log("<--\n");
				}
				for(i = 0; i<redQueensCanJump.length; i++)
				{
					console.log("-->");
					if((redQueensCanJump[i]===selectedRedIndex)&&(isRedQueen(red)))
						found = true;
					console.log("<--\n");
				}
				if(!found)
				{
					recentlyJumped = false;
				}
			}
			//did it make it to the other side?
console.log("-->");
			if((red.y===750) && !isRedQueen(red))
			{
console.log("<--releaseRed\n");
				var redQueen = redQueens.create(red.x, red.y, 'RedQueen');
				redQueen.inputEnabled = true;
				redQueen.anchor.x = 0.5;
				redQueen.anchor.y = 0.5;
				redQueen.events.onInputDown.add(selectRed, this, red);
				oneIsSelected = false;
console.log("-->");
				selectRed(redQueen);
console.log("<--releaseRed\n");
				red.kill();
				red = redQueen;
				livingRedQueensAmount += 1;
				livingRedsAmount -= 1;
			}
			
		}
		//If the selected piece has not more jumps it can make, move to next turn. 
		if(!recentlyJumped)
		{
			oneIsSelected = false;
			if(red.x!==selectedRedStartPos[0])
				playerTurn = false;
		}
	}
console.log("Leaving releaseRed\n");
}
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

	//first, make sure it's still on the board...
	if(toPosX<0 || toPosX>750 || toPosY<0 || toPosY>750)
	{
		console.log("Leaving with false, out-of-bounds\n");
		return false;
	}
	//...that it actually relocated...
	if(toPosX===fromPosX && toPosY===fromPosY)
	{
		console.log("Leaving with false, didn't relocate\n");
		return false;
	}
	//...that it moved in a legal direction...
console.log("-->");
	if((!isRedQueen(red)) && (toPosY<fromPosY))
	{
console.log("<--checkIfRedCanMoveHere\n");
		console.log("Leaving with false, can't move backwards\n");
		return false;
	}
	if(toPosX===fromPosX)
	{
		console.log("Leaving with false, must move diagonally\n");
	}
		
	//...aaand that it isn't going too far
	if((Math.abs(fromPosX-toPosX)>200)||(Math.abs(fromPosY-toPosY)>200))
	{
		console.log("Leaving with false, going too far\n");
		return false;		
	}

	//then check if the space is already occupied
console.log("-->");
	if(checkOccupancy(toPosX, toPosY)!==null)
	{
console.log("<--checkIfRedCanMoveHere\n");
		console.log("Leaving with false, space occupied\n");
		return false;
	}
	
	//now we ask, did it jump?
	if((Math.abs(fromPosX-toPosX)===200)&&(Math.abs(fromPosY-toPosY)===200))
	{
		//was it supposed to?
		var found = false;
		for(i = 0; i<redsCanJump.length; i++)
		{
			if(redsCanJump[i]===selectedRedIndex)
				found = true;
		}
		if(!found)
		{
			console.log("Leaving with false, can't jump that piece\n");
			return false;
		}
		
		//did it actually jump over anything?
		var checkX = (toPosX+fromPosX)/2;
		var checkY = (toPosY+fromPosY)/2;
console.log("-->");
		var piece = checkOccupancy(checkX, checkY);
console.log("<--checkIfRedCanMoveHere\n");
		if(piece !==null)
		{
			console.log("-->");
			if((!isBlack(piece))&&(!isBlackQueen(piece)))
			{
console.log("<--checkIfRedCanMoveHere\n");
				console.log("Leaving with false, didn't jump over anything\n");
				return false;
			}
			piece.kill();
		}
		recentlyJumped = true;
		console.log("Leaving with true, it can jump\n");
		return true;
	}
	else //it only moved one space
	{
		if((Math.abs(fromPosX-toPosX)===100)&&(Math.abs(fromPosY-toPosY)===100))
		{
			//was it supposed to jump?
			var found = false;
			for(i = 0; i<redsCanJump.length; i++)
			{
				if(redsCanJump[i]===selectedRedIndex)
					found = true;
			}
			if(found)
			{
				console.log("Leaving with false, supposed to jump\n");
				return false;
			}
			
			console.log("Leaving with true, it can move\n");
			return true;
		}
	}
	console.log("Leaving with false, (ERROR)\n");
	return false;
}
////////////////////////////////////////////////////////////////////////////////
function moveBlack()
{
console.log("In moveBlack\n");
	//update the lists
console.log("-->");
	listOfBlacksCanJump();
console.log("<--moveBlack\n");
console.log("-->");
	listOfRedsCanJump();
console.log("<--moveBlack\n");
	
	//can any blacks jump?
	if((blacksCanJump.length>0)||(blackQueensCanJump.length>0))
	{
		var pick = Math.random();
console.log("---a black must jump\n");
		//randomly grab from queen or regular index list
		if(pick<0.5 && blacksCanJump.length>0)
		{
			var black = blacks.getChildAt(blacksCanJump[0]);
			//modify checkifthisjump to find a jumping position and jump
			recentlyJumped = true;
		
			while(recentlyJumped)
			{
				for(i = 0; i<12; i++)
				{
					var red = reds.getChildAt(i);
					if(!red.alive)
						continue;
					//is there a red piece to NE?
					if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
					{
						//move the black, kill the red
console.log("-->");
						if(checkOccupancy(red.x+100, red.y-100)===null)
						{
console.log("<--moveBlack\n");
							var toX = black.x+200;
							var toY = black.y-200;
							
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black has jumped\n");
							//did it make it to the other side?
console.log("-->");
							if((black.y===50) && !isBlackQueen(black))
							{
console.log("<--moveBlack\n");
								var blackQueen = blackQueens.create(black.x, black.y, 'RedQueen');
								blackQueen.anchor.x = 0.5;
								blackQueen.anchor.y = 0.5;
								black.kill();
								black = blackQueen;
							}
							
							red.kill();
							break;
						}
					}
					//is there a red piece to NW?
					if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
					{
						//move the black, kill the red
console.log("-->");
						if(checkOccupancy(red.x-100, red.y-100)===null)
						{
console.log("<--moveBlack\n");
							var toX = black.x-200;
							var toY = black.y-200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black has jumped\n");
							//did it make it to the other side?
console.log("-->");
							if((black.y===50) && !isBlackQueen(black))
							{
console.log("<--moveBlack\n");
								var blackQueen = blackQueens.create(black.x, black.y, 'RedQueen');
								blackQueen.anchor.x = 0.5;
								blackQueen.anchor.y = 0.5;
								black.kill();
								black = blackQueen;
							}
							
							red.kill();
							break;
						}
					}
				}
				//can it jump again?
console.log("-->");
				recentlyJumped = checkIfTHISBlackCanJump(black);	
console.log("<--moveBlack\n");
			}
		}
		//--------------------------------------------------------------------
		if(pick>=0.5 && blackQueensCanJump>0)
		{
			var black = blackQueens.getChildAt(blacksCanJump[0]);
			//modify checkifthisjump to find a jumping position and jump
			recentlyJumped = true;
			while(recentlyJumped)
			{
				for( i = 0; i<12; i++)
				{
					var red = reds.getChildAt(i);
					if(!red.alive)
						continue;
					//is there a red piece to SE?
					if((red.x===black.x+100) && (red.y===black.y+100)) /*SE*/
					{
console.log("-->");
						//move the black, kill the red
						if(checkOccupancy(red.x+100, red.y+100)===null)
						{
console.log("<--moveBlack\n");
							var toX = black.x+200;
							var toY = black.y+200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped\n");
							red.kill();
							break;
						}
					}
					//is there a red piece to SW?
					if((red.x===black.x-100) && (red.y===black.y+100)) /*SW*/
					{
console.log("-->");
						//move the black, kill the red
						if(checkOccupancy(red.x-100, red.y+100)===null)
						{
console.log("<--moveBlack\n");
							var toX = black.x-200;
							var toY = black.y+200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped\n");
							red.kill();
							break;
						}
					}
					//is there a red piece to NE?
					if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
					{
console.log("-->");
						//move the black, kill the red
						if(checkOccupancy(red.x+100, red.y-100)===null)
						{
console.log("<--moveBlack\n");
							var toX = black.x+200;
							var toY = black.y-200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped\n");
							red.kill();
							break;
						}
					}
					//is there a red piece to NW?
					if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
					{
console.log("-->");
						//move the black, kill the red
						if(!checkOccupancy(red.x-100, red.y-100)===null)
						{
console.log("<--moveBlack\n");
							var toX = black.x-200;
							var toY = black.y-200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped\n");
							red.kill();
							break;
						}
					}
				}
				//update the lists
console.log("-->");
				listOfBlacksCanJump();
console.log("<--moveBlack\n");
console.log("-->");
				listOfRedsCanJump();
console.log("<--moveBlack\n");
				//can it jump again?
console.log("-->");
				recentlyJumped = checkIfTHISBlackCanJump(black);
console.log("<--moveBlack\n");
			}
		}
		
	}
	else
	{
	//------------------------------------------------------------------------
console.log("---no blacks can jump, moving a random black\n");
		//if a black can't jump, pick a random black and move it.
		var either = Math.random();
		
		if(either<0.5 && blackQueensAmount!==0)
		{
			for( i=0; i<blackQueensAmount; i++)
			{
				var black = blackQueens.getChildAt(i);
				if(!black.alive)
					continue;
				//if it can move, move it
console.log("-->");
				var canMoveNE = checkOccupancy(black.x+100, black.y-100);
console.log("<--\n");
				if(canMoveNE===null)
				{
					var toX = black.x+100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
console.log("---a black queen had been moved\n");
					break;
				}
console.log("-->");
				var canMoveNW = checkOccupancy(black.x-100, black.y-100);
console.log("<--\n");
				if(canMoveNW===null)
				{
					var toX = black.x-100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
console.log("---a black queen has been moved\n");
					break;
				}
console.log("-->");
				var canMoveSE = checkOccupancy(black.x+100, black.y+100);
console.log("<--\n");
				if(canMoveSE===null)
				{
					var toX = black.x+100;
					var toY = black.y+100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
console.log("---a black queen has been moved\n");
					break;
				}
console.log("-->");
				var canMoveSW = checkOccupancy(black.x-100, black.y+100);
console.log("<--\n");
				if(canMoveSW===null)
				{
					var toX = black.x-100;
					var toY = black.y+100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
console.log("---a black queen has been moved\n");
					break;
				}
			}
		}
		else//----------------------------------------------------------------
		{
			for( i=0; i<12; i++)
			{
				var black = blacks.getChildAt(i);
				if(!black.alive)
					continue;
				//if it can move, move it
console.log("-->");
				var canMoveNE = checkOccupancy(black.x+100, black.y-100);
console.log("<--\n");
				if(canMoveNE===null)
				{
					var toX = black.x+100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
console.log("---a black has been moved\n");
					//did it make it to the other side?
console.log("-->");
					if((black.y===50) && !isBlackQueen(black))
					{
console.log("<--\n");
						var blackQueen = blackQueens.create(black.x, black.y, 'RedQueen');
						blackQueen.anchor.x = 0.5;
						blackQueen.anchor.y = 0.5;
						black.kill();
						black = blackQueen;
					}
					break;
				}
console.log("-->");
				var canMoveNW = checkOccupancy(black.x-100, black.y-100);
console.log("<--\n");
				if(canMoveNW===null)
				{
					var toX = black.x-100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
console.log("---a black has been moved\n");
					//did it make it to the other side?
console.log("-->");
					if((black.y===50) && !isBlackQueen(black))
					{
console.log("<--\n");
						var blackQueen = blackQueens.create(black.x, black.y, 'RedQueen');
						blackQueen.anchor.x = 0.5;
						blackQueen.anchor.y = 0.5;
						black.kill();
						black = blackQueen;
					}
					break;
				}
			}
		}
	}
		
	if(!recentlyJumped)
		playerTurn = true;
console.log("Leaving moveBlack\n");
console.log("--------------------------------\n");
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////Various Checks///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//checks if a spot is occupied by a single piece
function checkOccupancy(x, y) //looks for singles
{	
console.log("In checkOccupancy\n");
	if(x<0 || x>750 || y<0 || y>750)
	{
console.log("Leaving with null, out of bounds\n");
		return null;
	}
	for( i=0; i<12; i++)
	{
		var piece = reds.getChildAt(i);
		if(!piece.alive)
			continue;
		if((piece.x===x)&&(piece.y===y))
		{
console.log("Leaving with red piece\n");
			return piece;
		}
	}
	for(k=0; k<redQueensAmount; k++)
	{
		var piece = redQueens.getChildAt(k);
		if(!piece.alive)
			continue;
		if((piece.x===x)&&(piece.y===y))
		{
console.log("Leaving with red queen piece\n");
			return piece;
		}
	}
	for( i=0; i<12; i++)
	{
		var piece = blacks.getChildAt(i);
		if(!piece.alive)
			continue;
		if((piece.x===x)&&(piece.y===y))
		{
console.log("Leaving with black piece\n");
			return piece;
		}
	}
	for( k=0; k<blackQueensAmount; k++)
	{
		var piece = blackQueens.getChildAt(k);
		if(!piece.alive)
			continue;
		if((piece.x===x)&&(piece.y===y))
		{
console.log("Leaving with black queen piece\n");
			return piece;
		}
	}
console.log("Leaving with null, nothing found\n");
	return null;
}
//------------------------------------------------------------------------------
//is the piece red?
function isRed(red)
{
console.log("In isRed\n");
	for(i=0; i<12; i++)
	{
		var red2 = reds.getChildAt(i);
		if(!red2.alive)
			continue;
		if(red.x===red2.x && red.y===red2.y)
		{
console.log("Leaving with true\n");
			return true;
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
	for(i=0; i<12; i++)
	{
		var black2 = blacks.getChildAt(i);
		if(!black2.alive)
			continue;
		if(black.x===black2.x && black.y===black2.y)
		{
console.log("Leaving with true\n");
			return true;
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
	if(redQueensAmount>0)
	{
		for(i=0; i<redQueensAmount; i++)
		{
			var red2 = redQueens.getChildAt(i);
			if(!red2.alive)
				continue;
			if(red.x===red2.x && red.y===red2.y)
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
	if(blackQueensAmount>0)
	{
		for(i=0; i<blackQueensAmount; i++)
		{
			var black2 = blackQueens.getChildAt(i);
			if(!black2.alive)
				continue;
			if(black.x===black2.x && black.y===black2.y)
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
//are there any jumps available for a specific red?
function checkIfTHISRedCanJump(red)
{
console.log("In checkIfTHISRedCanJump\n");
	var jumpable = false;
	//is it a queen?
	if(isRedQueen(red)) 
	{
		for( i = 0; i<12; i++)
		{
			var black = blacks.getChildAt(i);
			if(!black.alive)
				continue;
			//is there a black piece to SE?
			if((black.x===red.x+100) && (black.y===red.y+100)) /*SE*/
			{
				//is is jumpable?
				if(checkOccupancy(black.x+100, black.y+100)===null)
				{
console.log("Leaving with true, to the SE\n");
					return true;
				}
			}
			//is there a black piece to SW?
			if((black.x===red.x-100) && (black.y===red.y+100)) /*SW*/
			{
				//is is jumpable?
				if(checkOccupancy(black.x-100, black.y+100)===null)
				{
console.log("Leaving with true, to the SW\n");
					return true;
				}
			}
			//is there a black piece to NE?
			if((black.x===red.x+100) && (black.y===red.y-100)) /*NE*/
			{
				//is is jumpable?
				if(checkOccupancy(black.x+100, black.y-100)===null)
				{
console.log("Leaving with true, to the NE\n");
					return true;
				}
			}
			//is there a black piece to NW?
			if((black.x===red.x-100) && (black.y===red.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(checkOccupancy(black.x-100, black.y-100)===null)
				{
console.log("Leaving with true, to the NW\n");
					return true;
				}
			}
		}
	}
	else //if red is not a queen
	{
		for( i = 0; i<12; i++)
		{
			var black = blacks.getChildAt(i);
			if(!black.alive)
				continue;
			//is there a black piece to SE?
			if((black.x===red.x+100) && (black.y===red.y+100)) /*SE*/
			{
				//is is jumpable?
				if(checkOccupancy(black.x+100, black.y+100)===null)
				{
console.log("Leaving with true, to the SE\n");
					return true;
				}
			}
			//is there a black piece to SW?
			if((black.x===red.x-100) && (black.y===red.y+100)) /*SW*/
			{
				//is is jumpable?
				if(checkOccupancy(black.x-100, black.y+100)===null)
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
//are there any jumps available for a specific black?
function checkIfTHISBlackCanJump(black)
{
console.log("In checkIfTHISBlackCanJump\n");
	var jumpable = false;
	//is it a queen?
	if(isBlackQueen(black)) 
	{
		for( i = 0; i<12; i++)
		{
			var red = reds.getChildAt(i);
			if(!red.alive)
				continue;
			//is there a red piece to SE?
			if((red.x===black.x+100) && (red.y===black.y+100)) /*SE*/
			{
				//is is jumpable?
				if(checkOccupancy(red.x+100, red.y+100)===null)
				{
console.log("Leaving with true, to the SE\n");
					return true;
				}
			}
			//is there a red piece to SW?
			if((red.x===black.x-100) && (red.y===black.y+100)) /*SW*/
			{
				//is is jumpable?
				if(checkOccupancy(red.x-100, red.y+100)===null)
				{
console.log("Leaving with true, to the SW\n");
					return true;
				}
			}
			//is there a red piece to NE?
			if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
			{
				//is is jumpable?
				if(checkOccupancy(red.x+100, red.y-100)===null)
				{
console.log("Leaving with true, to the NE\n");
					return true;
				}
			}
			//is there a red piece to NW?
			if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(checkOccupancy(red.x-100, red.y-100)===null)
				{
console.log("Leaving with true, to the NW\n");
					return true;
				}
			}
		}
	}
	else //if black is not a queen
	{
		for( i = 0; i<12; i++)
		{
			var red = reds.getChildAt(i);
			if(!red.alive)
				continue;
			//is there a black piece to NE?
			if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
			{
				//is is jumpable?
				if(checkOccupancy(red.x+100, red.y-100)===null)
				{
console.log("Leaving with true, to the NE\n");
					return true;
				}
			}
			//is there a black piece to NW?
			if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
			{
				//is is jumpable?
				if(checkOccupancy(red.x-100, red.y-100)===null)
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
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Various Updates//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//which reds can jump?
function listOfRedsCanJump()
{
console.log("In listOfRedsCanJump\n");
	redsCanJump = [];
	redQueensCanJump = [];
	for( i=0; i<12; i++)
	{
		var red = reds.getChildAt(i);
		if(!red.alive)
			continue;
		if(checkIfTHISRedCanJump(red))
			redsCanJump.push(reds.getChildIndex(red));
	}
	for( k=0; k<redQueensAmount; k++)
	{
		var red = redQueens.getChildAt(k);
		if(!red.alive)
			continue;
		if(checkIfTHISRedCanJump(red))
			redQueensCanJump.push(redQueens.getChildIndex(red));
	}
console.log("Leaving listOfRedsCanJump\n");
}
//------------------------------------------------------------------------------
//which blacks can jump?
function listOfBlacksCanJump()
{
console.log("In listOfBlacksCanJumps\n");
	blacksCanJump = [];
	blackQueensCanJump = [];
	for( i=0; i<12; i++)
	{
		var black = blacks.getChildAt(i);
		if(!black.alive)
			continue;
		if(checkIfTHISBlackCanJump(black))
			blacksCanJump.push(blacks.getChildIndex(black));
	}
	for( k=0; k<blackQueensAmount; k++)
	{
		var black = blackQueens.getChildAt(k);
		if(!black.alive)
			continue;
		if(checkIfTHISBlackCanJump(red))
			blackQueensCanJump.push(blackQueens.getChildIndex(black));
	}
console.log("Leaving listOfBlacksCanJump\n");
}
//------------------------------------------------------------------------------
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




