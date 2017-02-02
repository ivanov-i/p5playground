function snowFlake(x, y){
	this.x = x;
	this.y = y;
	this.baseX = x;
	this.phase = 0;//random(0, 2*Math.PI);
	this.amplitude = 20;
	this.period = random(this.amplitude*10/2, this.amplitude*10);
	this.verticalSpeed = 0.1;
	
	this.draw = function(){
		strokeWeight(4);
		stroke(255);
		point(this.x, this.y);
	}
	
	this.move = function() {
		this.y += this.verticalSpeed;
		//var delta = random(-this.maxHorizontalSpeed, this.maxHorizontalSpeed);
		//var delta = sin(this.y*2.0*Math.PI/this.period + this.phase) * this.amplitude
		//this.x = this.baseX + delta;
		var wind = p5.Vector.random2D();
		//wind.mult(0.1);
		this.x += wind.x;
		this.y += wind.y;
	}
	
	this.isOut = function(width, height){
		return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
	}
}