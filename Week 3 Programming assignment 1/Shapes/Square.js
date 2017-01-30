var Square = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Square",pos,color,width);
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x - this.pos.x;
		this.size.y = point.y - this.pos.y;
	},

	added: function(canvas) {
		if(this.size.x < 0) {
			this.pos.x += this.size.x;
			this.size.x = Math.abs(this.size.x);
		}

		if(this.size.y < 0) {
			this.pos.y += this.size.y;
			this.size.y = Math.abs(this.size.y);
		}
	},	

	rmk: function(pos,color,width,size) {
		this.base("Square",pos,color,width);
		this.pos = pos;
		this.color = color;
		this.width = width;
		this.size = size;
	}

});