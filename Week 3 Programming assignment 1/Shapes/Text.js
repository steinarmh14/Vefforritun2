var Text = Shape.extend({

	constructor: function(pos,color) {
		this.base("Text",pos,color,fontstyle,fontsize);
		this.input = document.getElementById('textinput').value;
		this.fontsize = document.getElementById('fontsize').value;
		this.fontstyle = document.getElementById('fontstyle').value;
	},

	draw: function(canvas) {
		canvas.fillStyle = this.color;
		canvas.font = this.fontsize + " " + this.fontstyle;
		canvas.fillText(this.input,this.pos.x,this.pos.y);
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x;
		this.size.y = point.y;
	},

	added: function(canvas) {
		
	},

	rmk: function(pos,color,fontsize,fontstyle) {
		this.base("Text",pos,color,fontstyle,fontsize);
		this.pos = pos;
		this.color = color;
		this.fontsize = fontsize;
		this.fontstyle = fontstyle;
	}

});