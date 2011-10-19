var context;

window.onload = function() {
    context = document.getElementById("canvas").getContext("2d");
}

var GameObject = function() {
    this.components = [];
};

GameObject.prototype.sendMessage = function() {
    message = [].shift.apply(arguments);
    for(i=0; i<this.components.length; i++) {
	if(typeof(this.components[i][message]) == "function") {
	    this.components[i][message].apply(this.components[i], arguments);
	}
    }
};

GameObject.prototype.addComponent = function(component) {
    component.parent = this;
    this.components.push(component);
};

//g.renderComponent = new RenderComponent

var RenderComponent = function(image) {
    this.image = new Image();
    this.image.src = image ? image : "default.png";
};

RenderComponent.prototype.update = function() {
    this.parent.sendMessage("beforeRender");
    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
    this.parent.sendMessage("afterRender");
};

var TransformationComponent = function(position, angle) {
    this.position = position || [0, 0];
    this.angle = angle || 0;
};

TransformationComponent.prototype.beforeRender = function() {
    context.save();
    context.translate(this.position[0], this.position[1]);
    context.rotate(this.angle);
};

TransformationComponent.prototype.afterRender = function() {
    context.restore();
};

g = new GameObject();
r = new RenderComponent();
t = new TransformationComponent([100, 100], 1);
g.addComponent(r);
g.addComponent(t);

