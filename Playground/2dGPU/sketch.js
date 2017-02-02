console.log("_-")

var data;
var gpu = new GPU();
var renderBubbles;
var renderPlasma;
var fill;

p5.disableFriendlyErrors = true;
var pts = [];
var N =10;
var pointsArr = [];

function setup() {
  createCanvas(600,600);
  data = new dataToSort(20);
  for(var i = 0; i < N; i++) {
  	var point = createVector(random(900),random(600));
  	switch(floor(random(3))){
  		case 0:
		  	point.color = color(255,0,0);
		  	break;
	}
  	pts.push(point);
  }
  
  renderBubbles = gpu.createKernel(function(pointsArr, N) {
	var minDist = 100000;
	for(var i = 0; i < 3; i++){
		var x = pointsArr[i][0] - this.thread.x;
		var y = pointsArr[i][1] - this.thread.y;
		var distance = x*x + y*y;
		if(minDist > distance){
			minDist = distance;
		}
	}
	minDist = Math.sqrt(minDist);
	var maxDistance = Math.sqrt(90*90+60*60);
	var normalizedDistance = minDist/maxDistance;
	var c = 1 - normalizedDistance;
	
    this.color(0,0,c);
}, {loopMaxIterations: N}).dimensions([900, 600]).graphical(true);


  renderPlasma = gpu.createKernel(function(pointsArr, t) {
  	var x = this.thread.x;
  	var y = this.thread.y;
  	var value = Math.sin(Math.sqrt((x + t - 128)*(x+t - 128) + (y-128)*(y-128))/20)
             + Math.sin(Math.sqrt((x-64)*(x-64) + (y-64)*(y-64))/20)
             + Math.sin(Math.sqrt((x-192)*(x-192) + ((y + t)/7 - 64)*((y + t)/7 - 64))/20)
             + Math.sin(Math.sqrt((x-192)*(x-192) + (y-100)*(y-100))/20);
    var color = (4 + value) * 32 / 256;
    this.color(color, color * 2, 1 - color);
}, {loopMaxIterations: N}).dimensions([900, 600]).graphical(true);

  
}

var clr = 0.0;
var step = 1.0/30;

var t = 0;

function draw() {
	
var speed = 5;
for(var i = 0; i < pts.length; i++){
	var v = pts[i];
	var obj = [v.x, v.y];
	pointsArr[i] = obj;
	var delta = createVector(random(-speed, speed), random(-speed,speed));
	v.add(delta);
}

//renderBubbles(pointsArr, N);
//var canvas = renderBubbles.getCanvas();
renderPlasma(pointsArr, t);
var canvas = renderPlasma.getCanvas();

context = document.getElementById('myCanvas').getContext("2d");
context.drawImage(canvas, 0, 0)
context.strokeStyle = "white";
//context.beginPath();
//context.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI);
//context.stroke();


background(51);

var fps = frameRate();
fill(255);
stroke(0);
text("FPS: " + fps.toFixed(2), 10, height - 10);

clr += step;
if(clr > 1){
	clr = 0;
}

	t += 1;
}
