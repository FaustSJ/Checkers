//http://wonderdeep.github.io/ManlyDressUp/index.html
var game = new Phaser.Game(800, 664, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.image('bg', 'assets/background.jpg');
	game.load.image('intro', 'assets/intro.jpg');
	game.load.image('start', 'assets/start.png');
	game.load.image('ammo', 'assets/ammo.png');
	game.load.image('tank', 'assets/tank.png');
	game.load.image('beard', 'assets/beard.png');
	game.load.image('beard2', 'assets/beard2.png');
	game.load.image('weard', 'assets/weard.png');
	game.load.image('mustache', 'assets/mustache.png');
	game.load.image('cowboy', 'assets/cowboy.png');
	game.load.image('dracula', 'assets/dracula.png');
	game.load.image('sailor', 'assets/sailor.png');
	game.load.image('no1', 'assets/no1.png');
	game.load.image('no2', 'assets/no2.png');
	game.load.image('no3', 'assets/no3.png');
	game.load.image('no4', 'assets/no4.png');
	game.load.image('none', 'assets/none.png');
	game.load.image('ammoop', 'assets/ammoop.png');
	game.load.image('tankop', 'assets/tankop.png');
	game.load.image('sunglassop', 'assets/sunglassop.png');
	game.load.image('sunglasses', 'assets/sunglasses.png');
	//Polish
	game.load.image('warning1','assets/warning1.png');
	game.load.image('warning2','assets/warning2.png');
	game.load.image('dress','assets/dress.jpg');
	game.load.image('dresspick','assets/dresspick.png');
	game.load.image('runButton','assets/run.png');
	game.load.image('ending','assets/ending.jpg');
}

var background;
var start;
var ammo;
var ammopick;
var tank;
var tankpick;
var beard;
var beardpick;
var beard2;
var beard2pick;
var weard;
var weardpick;
var mustache;
var mustachepick;
var cowboy;
var cowboypick;
var dracula; 
var draculapick;
var sailor; 
var sailorpick;
var sunglasspick;
var nobeard;
var nohair;
var noother;
//polish
var dressCounter;
var dresspick;
var runBu;
var endbg;



function create() {
	
/*	background = game.add.sprite(0, 0, 'intro');
	start = game.add.sprite(350, 500, 'intro');
	start.inputEnabled = true;
	start.events.onInputDown.add(setup,this);*/
	
	background = game.add.sprite(0, 0, 'bg');

//What the player clicks
	ammopick = game.add.sprite(555,370, 'ammoop');
	ammopick.inputEnabled = true;
  	ammopick.events.onInputDown.add(ammof, this);
	tankpick = game.add.sprite(555,400, 'tankop');
	tankpick.inputEnabled = true;
  	tankpick.events.onInputDown.add(tankf, this);
  	sunglasspick = game.add.sprite(555,430, 'sunglassop');
  	sunglasspick.inputEnabled = true;
  	sunglasspick.events.onInputDown.add(sunglassesf, this);
  	//polish
  	dresspick = game.add.sprite(555,460, 'dresspick');
  	dresspick.inputEnabled = true;
  	dresspick.events.onInputDown.add(dressf, this);
  	dressCounter = 0;
  	
  	
	beardpick = game.add.sprite(550,230, 'no1');
	beardpick.inputEnabled = true;
  	beardpick.events.onInputDown.add(beardf, this); 	
	beard2pick = game.add.sprite(575,229, 'no2');
	beard2pick.inputEnabled = true;
 	beard2pick.events.onInputDown.add(beard2f, this);	
	weardpick = game.add.sprite(617,231, 'no3');
	weardpick.inputEnabled = true;
  	weardpick.events.onInputDown.add(weardf, this);	
	mustachepick = game.add.sprite(655,230, 'no4');
	mustachepick.inputEnabled = true;
  	mustachepick.events.onInputDown.add(mustachef, this);
  	
	cowboypick = game.add.sprite(617,86, 'no3');
	cowboypick.inputEnabled = true;
  	cowboypick.events.onInputDown.add(cowboyf, this);
	draculapick = game.add.sprite(550,85, 'no1');
	draculapick.inputEnabled = true;
  	draculapick.events.onInputDown.add(draculaf, this);
	sailorpick = game.add.sprite(575,84, 'no2');
	sailorpick.inputEnabled = true;
  	sailorpick.events.onInputDown.add(sailorf, this);
  	
	nohair = game.add.sprite(550,130, 'none');
	nohair.inputEnabled = true;
  	nohair.events.onInputDown.add(nohairf, this);
	nobeard = game.add.sprite(550,270, 'none');
	nobeard.inputEnabled = true;
  	nobeard.events.onInputDown.add(nobeardf, this);
  	noother = game.add.sprite(685,395, 'none');
	noother.inputEnabled = true;
  	noother.events.onInputDown.add(nootherf, this);
  	//polish
  	runBu = game.add.sprite(550,270,'runButton');
  	runBu.visible = false;
  	
	//--------------------------------------------
//What the player sees
	tank = game.add.sprite(0,0, 'tank');
	tank.visible = false;
	ammo = game.add.sprite(93,248, 'ammo');
	ammo.visible = false;
	sunglasses = game.add.sprite(0,0, 'sunglasses');
	sunglasses.visible = false;
	beard = game.add.sprite(185,180, 'beard');
	beard.visible = false;
	beard2 = game.add.sprite(206,214, 'beard2');
	beard2.visible = false;
	weard = game.add.sprite(140,145, 'weard');
	weard.visible = false;
	mustache = game.add.sprite(184,202, 'mustache');
	mustache.visible = false;
	cowboy = game.add.sprite(156,35, 'cowboy');
	cowboy.visible = false;
	dracula = game.add.sprite(155,51, 'dracula');
	dracula.visible = false;
	sailor = game.add.sprite(185,100, 'sailor');
	sailor.visible = false; 
	
	endbg = game.add.sprite(0,0, 'ending' );
	endbg.visible = false;
}
/*
function setup () {
	background.loadTexture('bg',0);
	start.kill();
	
	ammopick.visible = true;
	ammopick.inputEnabled = true;
  	ammopick.events.onInputDown.add(ammof, this);
  	tankpick.visible = true;
	tankpick.inputEnabled = true;
  	tankpick.events.onInputDown.add(tankf, this);
  	sunglasspick.visible = true;
  	sunglasspick.inputEnabled = true;
  	sunglasspick.events.onInputDown.add(sunglassesf, this);
  	beardpick.visible = true;
	beardpick.inputEnabled = true;
  	beardpick.events.onInputDown.add(beardf, this); 
  	beard2pick.visible = true;
	beard2pick.inputEnabled = true;
 	beard2pick.events.onInputDown.add(beard2f, this);
 	weardpick.visible = true;
	weardpick.inputEnabled = true;
  	weardpick.events.onInputDown.add(weardf, this);	
  	mustachepick.visible = true;
	mustachepick.inputEnabled = true;
  	mustachepick.events.onInputDown.add(mustachef, this);
  	cowboypick.visible = true;
	cowboypick.inputEnabled = true;
  	cowboypick.events.onInputDown.add(cowboyf, this);
  	draculapick.visible = true;
	draculapick.inputEnabled = true;
  	draculapick.events.onInputDown.add(draculaf, this);
  	sailorpick.visible = true;
	sailorpick.inputEnabled = true;
  	sailorpick.events.onInputDown.add(sailorf, this);
  	nohair.visible = true;
	nohair.inputEnabled = true;
  	nohair.events.onInputDown.add(nohairf, this);
  	nobeard.visible = true;
	nobeard.inputEnabled = true;
  	nobeard.events.onInputDown.add(nobeardf, this);
  	noother.visible = true;
	noother.inputEnabled = true;
  	noother.events.onInputDown.add(nootherf, this);
	

}*/
////////////////////////////////////////////////////////////////////////////////
//These functions control what the player can and cannot see.
function ammof () {
	ammo.visible = true;	
	sunglasses.visible = false;
}
function tankf () {
	tank.visible = true;
	sunglasses.visible = false;
}
function sunglassesf () {
	sunglasses.loadTexture('sunglasses',0);
	sunglasses.visible = true;	
}
function dressf () {
	if(dressCounter===0)
	{
		sunglasses.loadTexture('warning1',0);
		sunglasses.visible = true;
	}
	if(dressCounter===1)
	{
		sunglasses.loadTexture('warning2',0);
		sunglasses.visible = true;
	}
	if(dressCounter>1)
	{
		ammo.visible = false;
		tank.visible = false;
		sunglasses.visible = false;
		beard.visible = false;
		beard2.visible = false;
		weard.visible = false;
		mustache.visible = false;
		cowboy.visible = false;
		dracula.visible = false;
		sailor.visible = false;
		background.loadTexture('dress',0);
		
		runBu.visible = true;
		ammopick.visible = false;
		tankpick.visible = false;
		sunglasspick.visible = false;
		dresspick.visible = false;
		beardpick.visible = false;
		beard2pick.visible = false;
		weardpick.visible = false;
		mustachepick.visible = false;
		cowboypick.visible = false;
		draculapick.visible = false;
		sailorpick.visible = false;
		nohair.visible = false;
		nobeard.visible = false;
		noother.visible = false;
		
		runBu.inputEnabled = true;
		runBu.events.onInputDown.add(endf, this);
/*		ammopick.inputEnabled = false;
		tankpick.inputEnabled = false;
		sunglasspick.inputEnabled = false;
		dresspick.inputEnabled = false;
		beardpick.inputEnabled = false;
		beard2pick.inputEnabled = false;
		weardpick.inputEnabled = false;
		mustachepick.inputEnabled = false;
		cowboypick.inputEnabled = false;
		draculapick.inputEnabled = false;
		sailorpick.inputEnabled = false;
		nohair.inputEnabled = false;
		nobeard.inputEnabled = false;
		noother.inputEnabled = false;*/
		
	}
	dressCounter++;
}
function beardf () {
	beard.visible = true;
	beard2.visible = false;
	weard.visible = false;
	mustache.visible = false;
	sunglasses.visible = false;
}
function beard2f () {
	beard.visible = false;
	beard2.visible = true;
	weard.visible = false;
	mustache.visible = false;
	sunglasses.visible = false;
}
function weardf () {
	beard.visible = false;
	beard2.visible = false;
	weard.visible = true;
	mustache.visible = false;
	sunglasses.visible = false;
}
function mustachef () {
	beard.visible = false;
	beard2.visible = false;
	weard.visible = false;
	mustache.visible = true;
	sunglasses.visible = false;
}
function cowboyf () {
	cowboy.visible = true;
	dracula.visible = false;
	sailor.visible = false;
	sunglasses.visible = false;
}
function draculaf () {
	cowboy.visible = false;
	dracula.visible = true;
	sailor.visible = false;
	sunglasses.visible = false;
}
function sailorf () {
	cowboy.visible = false;
	dracula.visible = false;
	sailor.visible = true;
	sunglasses.visible = false;
}
function nohairf () {
	cowboy.visible = false;
	dracula.visible = false;
	sailor.visible = false;
	sunglasses.visible = false;
}
function nobeardf () {
	beard.visible = false;
	beard2.visible = false;
	weard.visible = false;
	mustache.visible = false;
	sunglasses.visible = false;
}
function nootherf () {
	ammo.visible = false;
	tank.visible = false;
	sunglasses.visible = false;
}

function endf ()
{
	endbg.visible = true;
}

////////////////////////////////////////////////////////////////////////////////
function update() {
//These summon a function from above depending on what the player picks.
	ammopick.events.onInputDown.add(ammof, this);
	tankpick.events.onInputDown.add(tankf, this);
	sunglasspick.events.onInputDown.add(sunglassesf, this);
	
  	beardpick.events.onInputDown.add(beardf, this);
  	beard2pick.events.onInputDown.add(beard2f, this);
  	weardpick.events.onInputDown.add(weardf, this);
  	mustachepick.events.onInputDown.add(mustachef, this);
  	
  	cowboypick.events.onInputDown.add(cowboyf, this);
  	draculapick.events.onInputDown.add(draculaf, this);
  	sailorpick.events.onInputDown.add(sailorf, this);
  	
  	nohair.events.onInputDown.add(nohairf, this);
  	nobeard.events.onInputDown.add(nobeardf, this);	
  	noother.events.onInputDown.add(nootherf, this);
}
////////////////////////////////////////////////////////////////////////////////


function render() {

}



