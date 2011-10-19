var context;
var gameobjects = [];
var fps = 400;

var octopus;

window.onload = function() {
    context = document.getElementById("canvas").getContext("2d");
    setInterval(update, 1000/fps);
    octopus = new Sprite();
    octopus.image.src = "squid.png";
    gameobjects.push(octopus);
};

Sprite = function(image, position, velocity, angle, angularvelocity ) {
    this.image = new Image();
    this.image.src = image ? image : "default.png";
    this.position = position || [0, 0];
    this.velocity = velocity || [0, 0];
    this.angle = angle || 0;
    this.angularvelocity = angularvelocity || 0;
};

Sprite.prototype.render = function() {
    context.save();
    context.translate(this.position[0], this.position[1]);
    context.rotate(this.angle);
    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
    context.restore();
};

add = function(a, b) { return zip(a, b).map(sum);};

sum = function(a) { return (a.length>0) ? a[0] + sum(a.slice(1)) : 0; };

zip = function(a, b) { if (a.length<=0 || b.length<=0) return []; 
		       return [[a[0], b[0]]].concat(zip(a.slice(1), b.slice(1))); };

clear = function() {
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

update = function() {
    clear();
    for(i in gameobjects) {
	gameobjects[i].position = add(gameobjects[i].position, 
				      gameobjects[i].velocity);
	gameobjects[i].angle += gameobjects[i].angularvelocity;
	gameobjects[i].render();
    }
};

window.onkeydown = function(evt) {
    var keymap = {
	37 : function() { octopus.angularvelocity = -0.1; },
	38 : function() { octopus.velocity = add(octopus.velocity,
						 [Math.cos(octopus.angle),
						  Math.sin(octopus.angle)]); },
	39 : function() { octopus.angularvelocity = 0.1 },
	40 : function() { octopus.velocity = add(octopus.velocity,
						 [-Math.cos(octopus.angle),
						  -Math.sin(octopus.angle)]); } };
    if(keymap[evt.which]) {
	keymap[evt.which]();
    }
    return false;
};

window.onkeyup = function(evt) {
    octopus.angularvelocity = 0;
    return false;
};