var snow = [];
var pile;
var N = 1000;
var SPEED = 100;
var initialPileSize = 100;

function createNewSnowFlake(){
	var x = random(windowWidth);
	var y = 0;
	return new snowFlake(x,y);    
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	pile = new snowPile();
	for(var i = 0; i < N; i++){
		var x = random(windowWidth);
		var y = random(windowHeight); 
		snow[i] = new snowFlake(x,y);
	}
//	for(var x = windowWidth/2 - windowWidth / initialPileSize; x < windowWidth / 2 +  windowWidth / initialPileSize; x++){
//		pile.add(new snowFlake(x, windowHeight-1));
//	}
	pile.add(new snowFlake(windowWidth/2, windowHeight-10))
}

function update(){
	for(var i = 0; i < snow.length; i ++){
		var snowFlake = snow[i];
		snowFlake.move();
		if(snowFlake.isOut(windowWidth, windowHeight))
		{
			snow[i] = createNewSnowFlake();			
		}
		else if(pile.isSticking(snow[i])){
			pile.add(snowFlake);
			snow[i] = createNewSnowFlake();			
		}
	}	
}

function draw(){
	background(55);
	for(var snowflake of snow){
		snowflake.draw()
	}
	pile.draw();
	for(var i = 0; i < SPEED; i++){
		update();
	}
}