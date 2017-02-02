// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/kKT0v3qhIQY

var tree;
var max_dist = 200;
var min_dist = 10;

function setup() {
  createCanvas(800, 400);
  tree = new Tree();
}

var n = 0;
var counter = 0;

function draw() {
  background(51);
  tree.show();
  if(counter++ >= n) {
	  tree.grow();
	  counter = 0;
  }
}
