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
var red1;
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
var black12;
var turnTrigger = 0;





function create() {
//sets up the board and the mouse input
	board = game.add.sprite(0, 0, 'CheckerBoard');
//	game.input.onDown.add(mouseDragStart, this);
//	game.input.addMoveCallback(mouseDragMove, this);
//	game.input.onUp.add(mouseDragEnd, this);
	
//What the player clicks
	red1 = game.add.sprite(100, 0, 'RedPiece');
	red1.inputenabled = true;
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

}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*function update() 
{
//These summon a function from above depending on what the player picks.

}*/
////////////////////////////////////////////////////////////////////////////////


function render()
{

}



