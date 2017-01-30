var Line = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Line",pos,color,width);
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.beginPath();
		canvas.lineCap = 'round';
		canvas.lineWidth = this.width;
		canvas.moveTo(this.pos.x, this.pos.y);
		canvas.lineTo(this.size.x, this.size.y);
		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x;
		this.size.y = point.y;
	},

	added: function(canvas) {
		if(this.size.x == 0) {
			this.size.x = this.pos.x;
		}

		if(this.size.y == 0) {
			this.size.y = this.pos.y;
		}
	},

	rmk: function(pos,color,width,size) {
		this.base("Line",pos,color,width);
		this.pos = pos;
		this.color = color;
		this.width = width;
		this.size = size;
	}
});