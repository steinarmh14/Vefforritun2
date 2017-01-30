function App(canvasSelector) {
	var self = this;
	self.getEventPoint = function(e) {
		return new Point(e.pageX - self.canvasOffset.x,e.pageY - self.canvasOffset.y);
	}

	self.drawingStart = function(e) {	
		var startPos = self.getEventPoint(e);
		var shape = new self.shapeConstructor(startPos,self.color,self.width);

		shape.startDrawing(startPos,self.canvasContext);
		startPos.log('drawing start');
	
		var drawing = function(e) {
			var pos = self.getEventPoint(e);
			
			shape.drawing(pos,self.canvasContext);

			self.redraw();
			shape.draw(self.canvasContext);
		}

		var drawingStop = function(e) {
			var pos = self.getEventPoint(e);

			shape.stopDrawing(pos,self.canvasContext);

			pos.log('drawing stop')

			self.shapes.push(shape);
			shape.added(self.canvasContext);

			// Remove drawing and drawingStop functions from the mouse events
			self.canvas.off({
				mousemove:drawing,
				mouseup:drawingStop
			});

			self.redraw();
		}

		// Add drawing and drawingStop functions to the mousemove and mouseup events
		self.canvas.on({
			mousemove:drawing,
			mouseup:drawingStop
		});	
	}

	self.mousedown = function(e) {
		if(self.shapeConstructor != null) {
			self.drawingStart(e);
		} else {
		}

		self.redraw();
	}

	self.redraw = function() {
		self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
		for(var i = 0; i < self.shapes.length; i++) {
			self.shapes[i].draw(self.canvasContext);
		}
	}
	
	self.clear = function() {
		self.shapes = [];
		self.redraw();
	}
	
	self.setColor = function(color) {
		self.color = color;
	}

	self.setWidth = function(width) {
		self.width = width;
	}

	self.undo = function() {
		if(self.shapes.length > 0) {
			self.temp.push(self.shapes.pop());
			self.redraw();
		}
	}

	self.redo = function() {
		if(self.temp.length > 0) {
			self.shapes.push(self.temp.pop());
			self.redraw();
		}
	}

	self.save = function() {
		var stringifiedArray = JSON.stringify(self.shapes);
		var param = { "user": "quang14", // You should use your own username!
			"name": "drawing",
			"content": stringifiedArray,
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/Save",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				console.log("The save was successful");
				self.loadimages();
				// The save was successful...
			},
			error: function (xhr, err) {
				console.log(xhr.status + ' ' + err);
				// Something went wrong...
			}
		});
	}

	self.loadimages = function() {
		var param = { "user": "quang14",
			"template": true
		}

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetList",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				self.savedDrawings = [];
				for(var i = 0 ; i < data.length ; i++) {
					tp = new Array();
					var object = JSON.parse('[' + data[i].WhiteboardContents + ']');
					for(var j = 0 ; j < object[0].length; j++) {
						if(object[0][j].name == 'Pen') {
							var shape = new Pen();
							shape.rmk (
								object[0][j].pos, 
								object[0][j].color, 
								object[0][j].width, 
								object[0][j].arr
							);
							tp.push(shape);
						}
						else if(object[0][j].name == 'Square') {
							var shape = new Square();
							shape.rmk (
								object[0][j].pos,
								object[0][j].color,
								object[0][j].width,
								object[0][j].size
							);
							tp.push(shape);
						}
						else if(object[0][j].name == 'Circle') {
							var shape = new Circle();
							shape.rmk (
								object[0][j].pos,
								object[0][j].color,
								object[0][j].width,
								object[0][j].radius
							);
							tp.push(shape);
						}
						else if(object[0][j].name == 'Line') {
							var shape = new Line();
							shape.rmk (
								object[0][j].pos,
								object[0][j].color,
								object[0][j].width,
								object[0][j].size
							);
							tp.push(shape);
						}
						else if(object[0][j].name == 'Text') {
							var shape = new Text();
							shape.rmk (
								object[0][j].pos,
								object[0][j].color,
								object[0][j].fontsize,
								object[0][j].fontstyle
							);
							tp.push(shape);
						}
					}
					self.savedDrawings.push(tp);
				}
				console.log(self.savedDrawings);
			},
			error: function (xhr, err) {
				console.log(xhr.status + ' ' + err);
				// Something went wrong...
			}
		});
	}

	self.nextload = function() {
		if(self.img < self.savedDrawings.length) {
			self.img = self.img + 1;
			self.shapes = self.savedDrawings[self.img];
			self.redraw();
		}
		else {
			self.shapes = [];
			self.redraw();
		}
	}

	self.prevload = function() {
		if(self.img >= 0) {
			self.img = self.img - 1;
			self.shapes = self.savedDrawings[self.img];
			self.redraw();
		}
		else {
			self.shapes = [];
			self.redraw();
		}
	}

	self.init = function() {
		// Make pen the default tool
		$(document).ready(function() {
			$('#penbutton').click();
		});

		// Initialize App	
		self.canvas = $(canvasSelector);
		self.canvasOffset = new Point(self.canvas.offset().left,self.canvas.offset().top);
		self.canvas.on({
			mousedown:self.mousedown
		});
		self.shapeConstructor = null;
		self.canvasContext = canvas.getContext("2d");
		self.shapes = new Array();
		self.temp = new Array();
		self.savedDrawings = new Array();
		self.img = -1;

		// Set defaults
		self.color = '#ff0000';	
		self.width = 2;
		// TODO: Set sensible defaults ...
	}
	
	self.init();
}

var app = null;
$(function() {
	// Wire up events
	app = new App('#canvas');
	$('#penbutton').click(function(){app.shapeConstructor = Pen;});
	$('#squarebutton').click(function(){app.shapeConstructor = Square;});
	$('#circlebutton').click(function(){app.shapeConstructor = Circle;});
	$('#linebutton').click(function(){app.shapeConstructor = Line;});
	$('#textbutton').click(function(){app.shapeConstructor = Text;});
	$('#undobutton').click(function(){app.undo()});
	$('#redobutton').click(function(){app.redo()});
	$('#prevbutton').click(function(){app.prevload()});
	$('#nextbutton').click(function(){app.nextload()});
	$('#savebutton').click(function(){app.save()});
	$('#clearbutton').click(function(){app.clear()});
	$('#color').change(function(){app.setColor($(this).val())});
	$('#width').change(function(){app.setWidth($(this).val())});
});