var Pen = Shape.extend({

	constructor: function(pos,color,width) {
		this.base("Pen",pos,color,width);
		this.arr = [];
	},

	draw: function(canvas) {
		canvas.beginPath();
  		canvas.lineWidth = this.width;
  		canvas.strokeStyle = this.color;
  		canvas.lineCap = 'round';
  		for(var i = 0 ; i < this.arr.length - 1 ; i++) {
  			canvas.moveTo(this.arr[i].x, this.arr[i].y);
  			canvas.lineTo(this.arr[i + 1].x, this.arr[i + 1].y);
  		}
  		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point) {
		this.arr.push(point);
	},

	added: function(canvas) {
		
	},	

	rmk: function(pos,color,width,arr) {
		this.base("Pen",pos,color,width);
		this.pos = pos;
		this.color = color;
		this.width = width;
		this.arr = arr;
	}

});