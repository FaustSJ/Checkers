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
var originalX=0;
var originaly=0;
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
var delayBlack;
var dud;//substitutes null check
var oob;//out-of-bounds var

var redQueensAmount = 0;
var blackQueensAmount = 0;

//sets up the board and the pieces.
function create() {
console.log("Creating everything.\n");
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
	redQueens = game.add.group();
	blackQueens = game.add.group();
	delayBlack = game.time.now;

	dud = game.add.sprite(222,222,'BlackQueen');
	dud.visible = false;
	oob = game.add.sprite(666,666,'RedQueen');
	oob.visible = false;
//the game pieces
	//seting up the red pieces
	reds = game.add.group();
	var alternate = true;
	for(i = 0; i<3; i++) //rows, y
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
		{
			selectedRedIndex = reds.getChildIndex(red);
		}
		originalX = red.x;
		originalY = red.y;
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
console.log("In releaseRed\n");
	if(oneIsSelected)
	{	
		//update the list
		listOfRedsCanJump();
		
		//if a jump is possible, can the selected one jump?	
		var found = false;
		for(a = 0; a<redsCanJump.length; a++)
		{
			if((redsCanJump[a]===selectedRedIndex)&&(!isRedQueen(red)))
			{
				found = true;
			}
		}
		for(a = 0; a<redQueensCanJump.length; a++)
		{
			if((redQueensCanJump[a]===selectedRedIndex)&&(isRedQueen(red)))
			{
				found = true;
			}
		}
		if((redsCanJump.length>0 || redQueensCanJump.length>0) && !found)
		{
console.log("Leaving releaseRed, a jump must be made!\n");
			oneIsSelected = false;
			return;
		}
		
		delayBlack = game.time.now;

		pickedX = game.input.x;
		pickedY = game.input.y;
		var red = reds.getChildAt(selectedRedIndex);
	
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

		//checkIfRedCanMoveHere moves the piece, the checks its location.
console.log("-->checkIfRedCanMoveHere");
		if(checkIfRedCanMoveHere(red, selectedRedStartPos[0], selectedRedStartPos[1], pickedX, pickedY))
		{			
			tween = game.add.tween(red).to({x: pickedX, y: pickedY}, 500, Phaser.Easing.Linear.None, true);
			tween.onComplete.removeAll();
			red.x = pickedX;
			red.y = pickedY;
			selectedRedStartPos[0] = pickedX;
			selectedRedStartPos[1] = pickedY;
			//did it jump?
			if(recentlyJumped)
			{
				//update the lists
				listOfRedsCanJump();
				
				//does it have more jumps to make?
				found = false;
console.log("--can it continue to jump?");				 
				for(a = 0; a<redsCanJump.length; a++)
				{
					if((redsCanJump[a]===selectedRedIndex)&&(!isRedQueen(red)))
					{
						found = true;
console.log("--yes");
					}
				}
				 
				for(a = 0; a<redQueensCanJump.length; a++)
				{
					if((redQueensCanJump[a]===selectedRedIndex)&&(isRedQueen(red)))
					{
						found = true;
console.log("--yes");
					}
				}
				if(!found)
				{
					recentlyJumped = false;
console.log("--no");
				}
			}
			//did it make it to the other side?
			if((red.y===750) && !isRedQueen(red))
			{
console.log("--make it a queen\n");
				var redQueen = redQueens.create(red.x, red.y, 'RedQueen');
				redQueen.inputEnabled = true;
				redQueen.anchor.x = 0.5;
				redQueen.anchor.y = 0.5;
				redQueen.events.onInputDown.add(selectRed, this, red);
				oneIsSelected = false;
				red.visible = false;
				red = redQueen;
				RedQueensAmount += 1;
				selectRed(redQueen);
			}
		}
		//If the selected piece has no more jumps it can make, move to next turn. 
		if(!recentlyJumped)
		{
			oneIsSelected = false;
			if((red.x!==originalX)||(red.y!==originalY))
			{
				playerTurn = false;
			}
		}
console.log("Leaving releaseRed\n");
	}
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
	if((!isRedQueen(red)) && (toPosY<fromPosY))
	{
		console.log("Leaving with false, can't move backwards\n");
		return false;
	}
	if(toPosX===fromPosX)
	{
		console.log("Leaving with false, must move diagonally\n");
		return false;
	}
		
	//...aaand that it isn't going too far
	if((Math.abs(fromPosX-toPosX)>200)||(Math.abs(fromPosY-toPosY)>200))
	{
		console.log("Leaving with false, going too far\n");
		return false;		
	}

	//then check if the space is already occupied
console.log("-->checkOccupancy of %i , %i \n", toPosX, toPosY);
	var checker = checkOccupancy(toPosX, toPosY);
	if(checker.x!==222)
	{
		console.log("Leaving with false, space occupied\n");
		return false;
	}
	
	//now we ask, did it jump?
	if((Math.abs(fromPosX-toPosX)===200)&&(Math.abs(fromPosY-toPosY)===200))
	{
		//was it supposed to?
		var found = false;
		 
		for(b = 0; b<redsCanJump.length; b++)
		{
			if(redsCanJump[b]===selectedRedIndex)
			{
				found = true;
			}
		}
		if(!found)
		{
			console.log("Leaving with false, can't jump that piece\n");
			return false;
		}
		
		//did it actually jump over anything?
		var checkX = (toPosX+fromPosX)/2;
		var checkY = (toPosY+fromPosY)/2;
console.log("-->checkOccupancy of %i , %i \n", toPosX, toPosY);
		var piece = checkOccupancy(checkX, checkY);
		if(piece.x!==222)
		{
			if((!isBlack(piece))&&(!isBlackQueen(piece)))
			{
				console.log("Leaving with false, didn't jump over anything\n");
				return false;
			}
			piece.visible = false;
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
			 
			for(b = 0; b<redsCanJump.length; b++)
			{
				if(redsCanJump[b]===selectedRedIndex)
				{
					found = true;
				}
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
	console.log("Leaving with false, can't move like a chess knight.\n");
	return false;
}
////////////////////////////////////////////////////////////////////////////////
function moveBlack()
{
console.log("In moveBlack\n");
	//update the lists
	listOfBlacksCanJump();
	
	//can any blacks jump?
	if((blacksCanJump.length>0)||(blackQueensCanJump.length>0))
	{
		var pick = Math.random();
console.log("---a black must jump\n");
		//randomly grab from queen or regular index list
		if((blacksCanJump.length>0)&&(pick<0.5 || blackQueensCanJump.length===0))
		{
			var black = blacks.getChildAt(blacksCanJump[0]);
			//modify checkifthisjump to find a jumping position and jump
			recentlyJumped = true;
		
			while(recentlyJumped)
			{
				 
				for(c = 0; c<12; c++)
				{
					var red = reds.getChildAt(c);
					if(!red.visible)
					{
						continue;
					}
					//is there a red piece to NE?
					if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
					{
						//move the black, kill the red
console.log("-->checkOccupancy at NE");
						var checker = checkOccupancy(red.x+100, red.y-100);
						if(checker.x===222)
						{
							var toX = black.x+200;
							var toY = black.y-200;
							
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black has jumped to %i , %i \n", toX, toY);
							//did it make it to the other side?
							if((black.y===50) && !isBlackQueen(black))
							{
console.log("--making black a queen\n");
								var blackQueen = blackQueens.create(black.x, black.y, 'BlackQueen');
								blackQueen.anchor.x = 0.5;
								blackQueen.anchor.y = 0.5;
								black.visible = false;
								black = blackQueen;
							}
							
							red.visible = false;
							break;
						}
					}
					//is there a red piece to NW?
					if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
					{
						//move the black, kill the red
console.log("-->checkOccupancy at NW");
						var checker = checkOccupancy(red.x-100, red.y-100);
						if(checker.x===222)
						{
							var toX = black.x-200;
							var toY = black.y-200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black has jumped to %i , %i \n", toX, toY);
							//did it make it to the other side?
							if((black.y===50) && !isBlackQueen(black))
							{
console.log("--making black a queen\n");
								var blackQueen = blackQueens.create(black.x, black.y, 'BlackQueen');
								blackQueen.anchor.x = 0.5;
								blackQueen.anchor.y = 0.5;
								black.visible = false;
								black = blackQueen;
							}
							
							red.visible = false;
							break;
						}
					}
				}
				//can it jump again?
console.log("-->checkIfTHISBlackCanJump");
				recentlyJumped = checkIfTHISBlackCanJump(black);	
console.log("<--moveBlack\n");
			}
		}
		//--------------------------------------------------------------------
		if((blackQueensCanJump>0)&&(pick>=0.5 || blacksCanJump.length===0))
		{
			var black = blackQueens.getChildAt(blacksCanJump[0]);
			//modify checkifthisjump to find a jumping position and jump
			recentlyJumped = true;
			while(recentlyJumped)
			{
				 
				for( c = 0; c<12; c++)
				{
					var red = reds.getChildAt(c);
					if(!red.visible)
					{
						continue;
					}
					//is there a red piece to SE?
					if((red.x===black.x+100) && (red.y===black.y+100)) /*SE*/
					{
console.log("-->checkOccupancy to SE");
						var checker = checkOccupancy(red.x+100, red.y+100);
						//move the black, kill the red
						if(checker.x===222)
						{
							var toX = black.x+200;
							var toY = black.y+200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped to %i , %i \n", toX, toY);
							red.visible = false;
							break;
						}
					}
					//is there a red piece to SW?
					if((red.x===black.x-100) && (red.y===black.y+100)) /*SW*/
					{
console.log("-->checkOccupancy to SW");
						//move the black, kill the red
						var checker = checkOccupancy(red.x-100, red.y+100);
						if(checker.x===222)
						{
							var toX = black.x-200;
							var toY = black.y+200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped to %i , %i \n", toX, toY);
							red.visible = false;
							break;
						}
					}
					//is there a red piece to NE?
					if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
					{
console.log("-->checkOccupancy to NE");
						//move the black, kill the red
						var checker = checkOccupancy(red.x+100, red.y-100);
						if(checker.x===222)
						{
							var toX = black.x+200;
							var toY = black.y-200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped to %i , %i \n", toX, toY);
							red.visible = false;
							break;
						}
					}
					//is there a red piece to NW?
					if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
					{
console.log("-->checkOccupancy at NW");
						//move the black, kill the red
						var checker = checkOccupancy(red.x-100, red.y-100);
						if(checker.x===222)
						{
							var toX = black.x-200;
							var toY = black.y-200;
							tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
							tween.onComplete.removeAll();
							black.x = toX;
							black.y = toY;
console.log("---a black queen has jumped to %i , %i \n", toX, toY);
							red.visible = false;
							break;
						}
					}
				}
				//update the lists
				listOfBlacksCanJump();
				//can it jump again?
console.log("-->checkIfTHISBlackCanJump");
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
			var moved = false;
			while(!moved)
			{
				var black = dud;
				while(black.visible===false)
				{
					var numPick = game.rnd.integerInRange(0, blackQueensAmount);
					black = blacks.getChildAt(numPick);
				}
				
				var black = blackQueens.getChildAt(c);
				if(!black.visible)
				{
					continue;
				}
				//if it can move, move it
	console.log("-->checkOccupancy at NE");
				var canMoveNE = checkOccupancy(black.x+100, black.y-100);
				if(canMoveNE.x===222)
				{
					var toX = black.x+100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
	console.log("---a black queen had been moved to %i , %i \n", toX, toY);
					break;
				}
	console.log("-->checkOccupancy at NW");
				var canMoveNW = checkOccupancy(black.x-100, black.y-100);
				if(canMoveNW.x===222)
				{
					var toX = black.x-100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
	console.log("---a black queen has been moved to %i , %i \n", toX, toY);
					break;
				}
	console.log("-->checkOccupancy at SE");
				var canMoveSE = checkOccupancy(black.x+100, black.y+100);
				if(canMoveSE.x===222)
				{
					var toX = black.x+100;
					var toY = black.y+100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
	console.log("---a black queen has been moved to %i , %i \n", toX, toY);
					break;
				}
	console.log("-->checkOccupancy at SW");
				var canMoveSW = checkOccupancy(black.x-100, black.y+100);
				if(canMoveSW.x===222)
				{
					var toX = black.x-100;
					var toY = black.y+100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
	console.log("---a black queen has been moved to %i , %i \n", toX, toY);
					break;
				}
			}
		}
		else//----------------------------------------------------------------
		{
			var moved =false;
			while(!moved)
			{
				var black = dud;
				while(black.visible===false)
				{
					var numPick = game.rnd.integerInRange(0, 11);
					black = blacks.getChildAt(numPick);
				}
	
				//if it can move, move it
	console.log("-->checkOccupancy at NE");
				var canMoveNE = checkOccupancy(black.x+100, black.y-100);
				if(canMoveNE.x===222)
				{
					var toX = black.x+100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
	console.log("---a black has been moved to %i , %i \n", toX, toY);
					//did it make it to the other side?
					if((black.y===50) && !isBlackQueen(black))
					{
	console.log("--making black a queen");
						var blackQueen = blackQueens.create(black.x, black.y, 'BlackQueen');
						blackQueen.anchor.x = 0.5;
						blackQueen.anchor.y = 0.5;
						black.visible = false;
						black = blackQueen;
					}
					break;
				}
	console.log("-->checkOccupancy at NW");
				var canMoveNW = checkOccupancy(black.x-100, black.y-100);
				if(canMoveNW.x===222)
				{
					var toX = black.x-100;
					var toY = black.y-100;
					tween = game.add.tween(black).to({x: toX, y: toY}, 500, Phaser.Easing.Linear.None, true);
					tween.onComplete.removeAll();
					black.x = toX;
					black.y = toY;
	console.log("---a black has been moved to %i , %i \n", toX, toY);
					//did it make it to the other side?
					if((black.y===50) && !isBlackQueen(black))
					{
	console.log("--making black a queen");
						var blackQueen = blackQueens.create(black.x, black.y, 'BlackQueen');
						blackQueen.anchor.x = 0.5;
						blackQueen.anchor.y = 0.5;
						black.visible = false;
						black = blackQueen;
					}
					break;
				}
			}
		}
	}
		
	if(!recentlyJumped)
	{
		playerTurn = true;
	}
console.log("Leaving moveBlack\n");
console.log("--------------------------------\n");
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////Various Checks///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//checks if a spot is occupied by a single piece
function checkOccupancy(x, y) //looks for singles
{	
	if(x<0 || x>750 || y<0 || y>750)
	{
		console.log(" %i , %i is out of bounds\n", x, y);
		return oob;
	}
	 
	for(d=0; d<12; d++)
	{
		var piece = reds.getChildAt(d);
		if(!piece.visible)
		{
			continue;
		}
		if((piece.x===x)&&(piece.y===y))
		{
			console.log(" %i , %i occupied with red piece\n", x, y);
			return piece;
		}
	}
	for(e=0; e<redQueensAmount; e++)
	{
		var piece = redQueens.getChildAt(e);
		if(!piece.visible)
		{
			continue;
		}
		if((piece.x===x)&&(piece.y===y))
		{
			console.log(" %i , %i occupied with red queen piece\n", x, y);
			return piece;
		}
	}

	for(d=0; d<12; d++)
	{
		var piece = blacks.getChildAt(d);
		if(!piece.visible)
		{
			continue;
		}
		if((piece.x===x)&&(piece.y===y))
		{
			console.log(" %i , %i occupied with black piece\n", x, y);
			return piece;
		}
	}

	for( e=0; e<blackQueensAmount; e++)
	{
		var piece = blackQueens.getChildAt(e);
		if(!piece.visible)
		{
			continue;
		}
		if((piece.x===x)&&(piece.y===y))
		{
			console.log(" %i , %i occupied with black queen piece\n", x, y);
			return piece;
		}
	}
	return dud;
}
//------------------------------------------------------------------------------
//is the piece red?
function isRed(red)
{
	 
	for(f=0; f<12; f++)
	{
		var red2 = reds.getChildAt(f);
		if(!red2.visible)
		{
			continue;
		}
		if(red.x===red2.x && red.y===red2.y)
		{
			return true;
		}
	}
	return false;
}
//------------------------------------------------------------------------------
//is the piece black?
function isBlack(black)
{
	 
	for(g=0; g<12; g++)
	{
		var black2 = blacks.getChildAt(g);
		if(!black2.visible)
		{
			continue;
		}
		if(black.x===black2.x && black.y===black2.y)
		{
			return true;
		}
	}
	return false;
}
//-----------------------------------------------------------------------------
//is the piece a red queen?
function isRedQueen(red)
{
	if(redQueensAmount>0)
	{
		 
		for(h=0; h<redQueensAmount; h++)
		{
			var red2 = redQueens.getChildAt(h);
			if(!red2.visible)
			{
				continue;
			}
			if(red.x===red2.x && red.y===red2.y)
			{
				return true;
			}
		}
	}
	return false;
}
//-----------------------------------------------------------------------------
//is the piece a black queen?
function isBlackQueen(black)
{
	if(blackQueensAmount>0)
	{
		 
		for(j=0; j<blackQueensAmount; j++)
		{
			var black2 = blackQueens.getChildAt(j);
			if(!black2.visible)
			{
				continue;
			}
			if(black.x===black2.x && black.y===black2.y)
			{
				return true;
			}
		}
	}
	return false;
}
//------------------------------------------------------------------------------
//are there any jumps available for a specific red?
function checkIfTHISRedCanJump(red)
{
	var jumpable = false;
	//is it a queen?
	if(isRedQueen(red)) 
	{
		 
		for( m = 0; m<12; m++)
		{
			var black = blacks.getChildAt(m);
			if(!black.visible)
			{
				continue;
			}
			//is there a black piece to SE?
			if((black.x===red.x+100) && (black.y===red.y+100)) /*SE*/
			{
				//is is jumpable?
				var checker = checkOccupancy(black.x+100, black.y+100);
				if(checker.x===222)
				{
					console.log("A red queen can jump to the SE\n");
					return true;
				}
			}
			//is there a black piece to SW?
			if((black.x===red.x-100) && (black.y===red.y+100)) /*SW*/
			{
				//is is jumpable?
				var checker = checkOccupancy(black.x-100, black.y+100);
				if(checker.x===222)
				{
					console.log("A red queen can jump to the SW\n");
					return true;
				}
			}
			//is there a black piece to NE?
			if((black.x===red.x+100) && (black.y===red.y-100)) /*NE*/
			{
				//is is jumpable?
				var checker = checkOccupancy(black.x+100, black.y-100);
				if(checker.x===222)
				{
					console.log("A red queen can jump to the NE\n");
					return true;
				}
			}
			//is there a black piece to NW?
			if((black.x===red.x-100) && (black.y===red.y-100))  /*NW*/ 
			{
				//is is jumpable?
				var checker = checkOccupancy(black.x-100, black.y-100);
				if(checker.x===222)
				{
					console.log("A red queen can jump to the NW\n");
					return true;
				}
			}
		}
	}
	else //if red is not a queen
	{
		 
		for( m = 0; m<12; m++)
		{
			var black = blacks.getChildAt(m);
			if(!black.visible)
			{
				continue;
			}
			//is there a black piece to SE?
			if((black.x===red.x+100) && (black.y===red.y+100)) /*SE*/
			{
				//is is jumpable?
				var checker = checkOccupancy(black.x+100, black.y+100);
				if(checker.x===222)
				{
					console.log("A red can jump to the SE\n");
					return true;
				}
			}
			//is there a black piece to SW?
			if((black.x===red.x-100) && (black.y===red.y+100)) /*SW*/
			{
				//is is jumpable?
				var checker = checkOccupancy(black.x-100, black.y+100);
				if(checker.x===222)
				{
					console.log("A red can jump to the SW\n");
					return true;
				}
			}
		}
	}
	return false;
}
//------------------------------------------------------------------------------
//are there any jumps available for a specific black?
function checkIfTHISBlackCanJump(black)
{
	var jumpable = false;
	//is it a queen?
	if(isBlackQueen(black)) 
	{ 
		for( n = 0; n<12; n++)
		{
			var red = reds.getChildAt(n);
			if(!red.visible)
			{
				continue;
			}
			//is there a red piece to SE?
			if((red.x===black.x+100) && (red.y===black.y+100)) /*SE*/
			{
				//is is jumpable?
				var checker = checkOccupancy(red.x+100, red.y+100);
				if(checker.x===222)
				{
					console.log("A black queen can jump to the SE\n");
					return true;
				}
			}
			//is there a red piece to SW?
			if((red.x===black.x-100) && (red.y===black.y+100)) /*SW*/
			{
				//is is jumpable?
				var checker = checkOccupancy(red.x-100, red.y+100);
				if(checker.x===222)
				{
					console.log("A black queen can jump to the SW\n");
					return true;
				}
			}
			//is there a red piece to NE?
			if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
			{
				//is is jumpable?
				var checker = checkOccupancy(red.x+100, red.y-100);
				if(checker.x===222)
				{
					console.log("A black queen can jump to the NE\n");
					return true;
				}
			}
			//is there a red piece to NW?
			if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
			{
				//is is jumpable?
				var checker = checkOccupancy(red.x-100, red.y-100);
				if(checker.x===222)
				{
					console.log("A black queen can jump to the NW\n");
					return true;
				}
			}
		}
	}
	else //if black is not a queen
	{
		for( n = 0; n<12; n++)
		{
			var red = reds.getChildAt(n);
			if(!red.visible)
			{
				continue;
			}
			//is there a red piece to NE?
			if((red.x===black.x+100) && (red.y===black.y-100)) /*NE*/
			{
				//is is jumpable?
				var checker = checkOccupancy(red.x+100, red.y-100);
				if(checker.x===222)
				{
					console.log("A black can jump to the NE\n");
					return true;
				}
			}
			//is there a red piece to NW?
			if((red.x===black.x-100) && (red.y===black.y-100))  /*NW*/ 
			{
				//is is jumpable?
				var checker = checkOccupancy(red.x-100, red.y-100);
				if(checker.x===222)
				{
					console.log("A black can jump to the NW\n");
					return true;
				}
			}
		}
	}
	return false;
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////Various Updates//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//which reds can jump?
function listOfRedsCanJump()
{
	redsCanJump = [];
	redQueensCanJump = [];
	var red;
	var count = 0;
	for(bleh = 0; bleh<12; bleh++)
	{
		red = reds.getChildAt(bleh);
		if(!red.visible)
		{
			continue;
		}
		if(checkIfTHISRedCanJump(red))
		{
			redsCanJump.push(bleh);
console.log("redsCanJump containsindex %i or %i",redsCanJump[count], bleh);
			count++;
		}
	}
	for( q=0; q<redQueensAmount; q++)
	{
		red = redQueens.getChildAt(q);
		if(!red.visible)
		{
			continue;
		}
		if(checkIfTHISRedCanJump(red))
		{
			redQueensCanJump.push(q);
		}
	}
}
//------------------------------------------------------------------------------
//which blacks can jump?
function listOfBlacksCanJump()
{
	blacksCanJump = [];
	blackQueensCanJump = [];
	for(r=0; r<12; r++)
	{
		var black = blacks.getChildAt(r);
		if(!black.visible)
		{
			continue;
		}
		if(checkIfTHISBlackCanJump(black))
		{
			blacksCanJump.push(r);
		}
	}
	for( s=0; s<blackQueensAmount; s++)
	{
		var black = blackQueens.getChildAt(s);
		if(!black.visible)
		{
			continue;
		}
		if(checkIfTHISBlackCanJump(red))
		{
			blackQueensCanJump.push(s);
		}
	}
}
//------------------------------------------------------------------------------
//move on to the next turn
function update()
{
	if(playerTurn && oneIsSelected)
	{
		game.input.onDown.add(releaseRed, this);
	}
	if(!playerTurn && (game.time.now > delayBlack + 1000))
	{
console.log("^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v\n");
		delayBlack = game.time.now;
		moveBlack();
	}
}




