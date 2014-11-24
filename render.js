/*!
 * Webtags v0.4.6-pl, Dashboard for Webtags v1.0.17-pl
 * Webtags GitHub page (source code and links): (https://github.com/earthperson/Webtags)
 * Webtags website: (http://earthperson.github.io/Webtags/)
 * Dashboard for Webtags: (http://earthperson.github.io/Webtags/dashboard/)
 * Author website: (http://earthperson.info)
 *
 * Copyright (c) 2013-2014 Dmitry Ponomarev (email: ponomarev.dev@gmail.com)
 * Licensed under the MIT License: (http://www.opensource.org/licenses/mit-license.php)
 */

/*jshint -W056 */
/*jshint -W069 */
(function(window) {
	
	function Webtags(options) {
		if (options instanceof Object && options['items']) {
			Webtags.prototype.options = options;
			var canvas = new Canvas();
			if(canvas.render) {
				canvas.render.call(canvas);
			}
		}	
	}
	
	function Canvas() {
		this.settings = {
			items: [],
			id: "webtags",
			type: "rounded", // "square"
			width: 500,
			height: 350,
			border: true,
			grid: false,
			style: {
				border: "1px solid #5e8cc2"
			},
			tag: {
				
			},
			_poweredBy : {
				x: null,
				y: null
			},
			_url: null
		};
		var p = mergeRecursive(this.settings, Webtags.prototype.options);
		for(var a in p) {
			this[a] = p[a];
		}
		this._element = document.getElementById(this.id);
	}
	Canvas.POWERED_BY = {
		LABEL: "Powered by Webtags v0.4.6-pl",
		URL: "https://github.com/earthperson/Webtags",
		FONT: "10px Helvetica"
	};
	Canvas.prototype.getMousePosition = function(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	};
	// Check if the mouse is over the webtag label or powered by and change cursor style
	Canvas.prototype.onMousemove = function(e) {
		var mousePosition = Canvas.prototype.getMousePosition(this, e), x = mousePosition.x, y = mousePosition.y, a, o;
		document.body.style.cursor = this._url = null;
		for (a in this.items) {
			o = this.items[a].text;
			if(o) {
				// Is the mouse over the webtag label?
				if (x >= parseInt(o.x+o.translating.x) && x <= (parseInt(o.x+o.translating.x) + parseInt(o.width)) && y >= parseInt(o.y+o.translating.y) && y <= (parseInt(o.y+o.translating.y) + parseInt(o.height))) {
					document.body.style.cursor = 'pointer';
					this._url = this.items[a].item.url;
					break;
				}
			}
		}
		if(this.border) {
			o = this._poweredBy;
			// Is the mouse over the powered by?
			if (x >= o.x && x <= this.width && y >= o.y-1 && y <= this.height) {
				document.body.style.cursor = 'pointer';
				this._url = Canvas.POWERED_BY.URL;
			}
		}
	};
	Canvas.prototype.onClick = function(e) {
		if (this._url)  {
			window.open(this._url);
		}
	};
	Canvas.prototype.render = function() {
		this._element.width = this.width;
		this._element.height = this.height;
		this._element.style.border = this.border ? this.style.border : 'none';
		if (this._element.getContext) {
			var context = this._element.getContext('2d'), i = 0, l = this.items.length;
			context.clearRect(0, 0, this.width, this.height);
			Tag.prototype.count = 0;
			Tag.prototype.line = {
				width: 0,
				count: 0
			};
			// Add mouse listeners
			this._element.addEventListener('mousemove', Canvas.prototype.onMousemove, false);
			this._element.items = this.items;
			this._element.addEventListener('click', Canvas.prototype.onClick, false);
			// Render tags
			for(; i < l; i++) {
				this.items.push(
					new (this.type == 'square' ? SquareTag : RoundedTag)(context, this.items[i], this)
				);
			}
			context.fillStyle = this.style.border.match(/#\w{3,}$/) || '#5e8cc2';
			// Render powered by
			if (this.border) {
				context.font = Canvas.POWERED_BY.FONT;
				this._poweredBy.x = parseInt(this.width - context.measureText(Canvas.POWERED_BY.LABEL).width);
				this._poweredBy.y = parseInt(this.height - parseInt(Canvas.POWERED_BY.FONT));
				context.fillText(Canvas.POWERED_BY.LABEL, this._poweredBy.x, this._poweredBy.y-1);
			}
		}
		else {
			// Canvas-unsupported code here
		}
	};
	Canvas.prototype.toString = function() {
		return '[object Canvas]';
	};
	
	function Tag() {
		
	}
	Tag.prototype.properties = {
		width: 100,
		height: 32,
		context: {
			fillStyle: "#5e8cc2",
			textBaseline: "top",
			font: "12px Arial",
			strokeStyle: "#5e8cc2",
			lineWidth: 2, 
			lineJoin: "round",
			lineCap: "round",
			shadowOffsetX: 2,
			shadowOffsetY: 2,
			shadowBlur: 2,
			shadowColor: "rgba(54, 111, 179, 0.4)"
		}
	};
	Tag.prototype.context = null;
	Tag.prototype.item = null;
	Tag.prototype.text = null;
	Tag.prototype.getRandomFactor = function() {
		return (Math.random() * 10) + 1;
	};
	Tag.prototype.offsetX = function() {
		var w = Tag.prototype.properties.width + this.edgeWidth();
		return parseFloat((this.count % Math.floor(this.canvas.width / w)) * w);
	};
	Tag.prototype.offsetY = function() {
		var w = Tag.prototype.properties.width + this.edgeWidth();
		return Math.floor(this.count / Math.floor(this.canvas.width / w)) * (Tag.prototype.properties.height+8);
	};
	Tag.prototype.translateX = function() {
		if(this.line.width + this.text.width > (this.canvas.width - this.edgeWidth())) {
			this.line.width = 0;
			this.line.count++;
			return 0;
		}
		else {
			return this.line.width;
		}
	};
	Tag.prototype.edgeWidth = function() {
		return this.canvas.type == 'rounded' ? 16+Tag.prototype.properties.height+2 : 16+23+2;
	};
	Tag.prototype.translateY = function() {
		return (Tag.prototype.properties.height+8) * Tag.prototype.line.count;
	};
	Tag.prototype.render = function() {
		var k = this.getRandomFactor(), r, a;
		mergeRecursive(this.properties, this.canvas.tag);
		for(a in this.properties.context) {
			this.context[a] = this.properties.context[a];
		}
		r = Math.floor(Tag.prototype.properties.height/2);
		this.text = {
			x: 34,
			y: r,
			translating: {
				x: 0,
				y: 0
			}
		};
		this.text.width = this.context.measureText(this.item.label).width;
		this.text.height = parseInt(this.context.font);
		this.context.save();
		if(this.canvas.grid) {
			this.text.translating.x = this.offsetX();
			this.text.translating.y = this.offsetY();
		}
		else {
			this.text.translating.x = this.translateX();
			this.text.translating.y = this.translateY();
		}
		this.context.translate(this.text.translating.x, this.text.translating.y);
		this.context.beginPath();
		this.context.arc(26,4+r,4,0,Math.PI*2);
		this.context.moveTo(4,18);
		this.context.bezierCurveTo(2+k,10+k,8,10,10,14);
		this.context.bezierCurveTo(13,23,16,17,27,4+r);
		this.context.moveTo(2,26);
		k = this.getRandomFactor();
		this.context.quadraticCurveTo(2+k,18+k,12,22);
		this.context.quadraticCurveTo(18,28,27,4+r);
		this.context.stroke();
		this.context.fillText(this.item.label,this.text.x,this.text.y-2);
		this.context.restore();
	};
	
	function RoundedTag(context, item, canvas) {
		this.context = context;
		this.item = item;
		this.canvas = canvas;
		Tag.prototype.render.call(this);
		this.render();
		Tag.prototype.line.width += Math.floor(this.edgeWidth()+this.text.width);
		Tag.prototype.count++;
	}
	RoundedTag.prototype = new Tag();
	RoundedTag.prototype.render = function() {
		var r = Math.floor(Tag.prototype.properties.height/2);
		this.context.save();
		if(this.canvas.grid) {
			this.context.translate(this.offsetX(), this.offsetY());
		}
		else {
			this.context.translate(this.translateX(), this.translateY());
		}
		this.context.beginPath();
		this.context.arc(16+r,4+r,r,0.5*Math.PI,1.5*Math.PI);
		if(this.canvas.grid) {
			this.context.lineTo(16+r+Tag.prototype.properties.width,4);
			this.context.arc(16+r+Tag.prototype.properties.width,4+r,r,1.5*Math.PI,0.5*Math.PI);
		}
		else {
			this.context.lineTo(16+r+this.text.width,4);
			this.context.arc(16+r+this.text.width,4+r,r,1.5*Math.PI,0.5*Math.PI);
		}
		this.context.closePath();
		this.context.stroke();
		this.context.restore();
	};
	
	function SquareTag(context, item, canvas) {
		this.context = context;
		this.item = item;
		this.canvas = canvas;
		Tag.prototype.render.call(this);
		this.render();
		Tag.prototype.line.width += Math.floor(16+23+2+this.text.width);
		Tag.prototype.count++;
	}
	SquareTag.prototype = new Tag();
	SquareTag.prototype.render = function() {
		this.context.save();
		if(this.canvas.grid) {
			this.context.translate(this.offsetX(), this.offsetY());
		}
		else {
			this.context.translate(this.translateX(), this.translateY());
		}
		this.context.beginPath();
		this.context.moveTo(16,4+Math.floor(Tag.prototype.properties.height/2));
		this.context.lineTo(23,4);
		if(this.canvas.grid) {
			this.context.lineTo(23+Tag.prototype.properties.width,4);
			this.context.lineTo(23+Tag.prototype.properties.width,Tag.prototype.properties.height+4);
		}
		else {
			this.context.lineTo(16+23+this.text.width,4);
			this.context.lineTo(16+23+this.text.width,Tag.prototype.properties.height+4);
		}
		this.context.lineTo(23,Tag.prototype.properties.height+4);
		this.context.closePath();
		this.context.stroke();
		this.context.restore();
	};
	
	function mergeRecursive(obj1, obj2) {
		for (var p in obj2) {
			try {
				// Property in destination object set; update its value.
				if (obj2[p].constructor == Object) {
					obj1[p] = mergeRecursive(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
		    } catch(e) {
		    	// Property in destination object not set; create it and set its value.
		    	obj1[p] = obj2[p];
		    }
		}
		return obj1;
	}
	
	window.Webtags = Webtags;
	
})(window);
