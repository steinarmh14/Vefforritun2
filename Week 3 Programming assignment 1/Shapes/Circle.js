var Circle = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Circle",pos,color,width);
		this.radius = 0;
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.beginPath();
		canvas.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
		canvas.lineWidth = this.width;
		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x - this.pos.x;
		this.size.y = point.y - this.pos.y;
		this.radius = Math.sqrt(Math.pow(this.size.x, 2) + Math.pow(this.size.y, 2));
	},

	added: function(canvas) {
		if(this.size.x < 0) {
			this.size.x = Math.abs(this.size.x);
		}

		if(this.size.y < 0) {
			this.size.y = Math.abs(this.size.y);
		}
	},	

	rmk: function(pos,color,width,radius) {
		this.base("Circle",pos,color,width);
		this.pos = pos;
		this.color = color;
		this.width = width;
		this.radius = radius;
	}

});