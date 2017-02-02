function snowPile(){
	this.pile = [];
	this.boundingBox = {
		minX: Number.POSITIVE_INFINITY,
		maxX: Number.NEGATIVE_INFINITY,
		minY: Number.POSITIVE_INFINITY,
		maxY: Number.NEGATIVE_INFINITY
	};
		
	this.draw = function(){
		strokeWeight(4);
		fill(255);
		for(var snowflake of this.pile){
			snowflake.draw();
		}
		strokeWeight(1);
		noFill();
		rect(this.boundingBox.minX, this.boundingBox.minY, this.boundingBox.maxX - this.boundingBox.minX, this.boundingBox.maxY - this.boundingBox.minY);
	}
	
	this.add = function(flake){
		this.pile.push(flake);
		if(this.boundingBox.minX > flake.x - 4)
		{
			this.boundingBox.minX = flake.x - 4;
		}
		if(this.boundingBox.maxX < flake.x  + 4)
		{
			this.boundingBox.maxX = flake.x + 4;
		}
		if(this.boundingBox.minY > flake.y - 4)
		{
			this.boundingBox.minY = flake.y - 4;
		}
		if(this.boundingBox.maxY < flake.y + 4)
		{
			this.boundingBox.maxY = flake.y + 4;
		}
	}
	
	this.inside = function(snowFlake){
		return (this.boundingBox.minX <= snowFlake.x) && (this.boundingBox.maxX >= snowFlake.x)  && (this.boundingBox.minY <= snowFlake.y) && (this.boundingBox.maxY >= snowFlake.y);
	}
	
	this.isSticking = function(fallingFlake){
		if(!this.inside(fallingFlake)){
			return false;
		}
		for(var i = this.pile.length-1; i >= 0; i--){
			var lyingFlake = this.pile[i];
			var d = Math.pow(fallingFlake.x - lyingFlake.x, 2) + Math.pow(fallingFlake.y - lyingFlake.y, 2);
			if(d < 16){
				return true;
			}
		}
		return false;
	}
}