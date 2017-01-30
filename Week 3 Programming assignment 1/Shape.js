var Shape = Base.extend({

	constructor:function(name,pos,color,width) {
		this.name = name;
		this.pos = pos;
		this.size = new Point(0,0);
		this.width = width;
		this.color = color;
		this.selected = false;
	},


	draw:function(canvas) {		
		if ( this.selected === true ) {
			// show selection
		}
	},

	startDrawing:function(point) {

	},

	drawing:function(point) {

	},

	stopDrawing:function(point) {

	},

	added: function(canvas) {

	},

	rmk: function(pos, color, width, size, fontsize, fontstyle) {
		
	}
});