/*!
 * Webtags v0.4.8-pl, Dashboard for Webtags v1.0.19-pl
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
	"use strict";
	
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
		var settings = {
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
		mergeRecursive(settings, Webtags.prototype.options);
		for(var a in settings) {
			this[a] = settings[a];
		}
		this._element = document.getElementById(this.id);
	}
	Canvas.POWERED_BY = {
		LABEL: "Powered by Webtags v0.4.8-pl",
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
			if(this.items[a].prototype instanceof Tag) {
				o = this.items[a].prototype._text;
				// Is the mouse over the webtag label?
				if (x >= parseInt(o.x+o.translating.x) && x <= (parseInt(o.x+o.translating.x) + parseInt(o.width)) && y >= parseInt(o.y+o.translating.y) && y <= (parseInt(o.y+o.translating.y) + parseInt(o.height))) {
					document.body.style.cursor = 'pointer';
					this._url = this.items[a].prototype._item.url;
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
		if(this._element !== null) {
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
				this._element.items = this.items;
				this._element.border = this.border;
				this._element._poweredBy = this._poweredBy;
				// Add mouse listeners
				this._element.addEventListener('mousemove', Canvas.prototype.onMousemove, false);
				this._element.addEventListener('click', Canvas.prototype.onClick, false);
				// Render tags
				for(; i < l; i++) {
					this.items.push(
						new (Tag.prototype.factory(this.type))(context, this.items[i], this)
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
		}
	};
	
	function Tag(context, item, canvas) {
		var settings = {
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
		mergeRecursive(settings, canvas.tag);
		mergeRecursive(context, settings.context);
		delete settings.context;
		for(var a in settings) {
			this[a] = settings[a];
		}
		this._context = context;
		this._item = item;
		this._canvas = canvas;
		this._text = null;
	}
	Tag.prototype.factory = function(type) {
		switch(Tag.prototype.getType(type)) {
			case 'SquareTag':
				return SquareTag;
			default:
				return RoundedTag;
		}
	};
	Tag.prototype.getType = function(option) {
		return option.charAt(0).toUpperCase() + option.substr(1, option.length-1) + 'Tag';
	};
	Tag.prototype.getRandomFactor = function() {
		return (Math.random() * 10) + 1;
	};
	Tag.prototype.offsetX = function() {
		var w = this.width + this.edgeWidth();
		return parseFloat((this.count % Math.floor(this._canvas.width / w)) * w);
	};
	Tag.prototype.offsetY = function() {
		var w = this.width + this.edgeWidth();
		return Math.floor(this.count / Math.floor(this._canvas.width / w)) * (this.height+8);
	};
	Tag.prototype.translateX = function() {
		if(this.line.width + this._text.width > (this._canvas.width - this.edgeWidth())) {
			this.line.width = 0;
			this.line.count++;
			return 0;
		}
		else {
			return this.line.width;
		}
	};
	Tag.prototype.edgeWidth = function() {
		switch(Tag.prototype.getType(this._canvas.type)) {
			case 'SquareTag':
				return 16+23+2;
			default:
				return 16+this.height+2;
		}
	};
	Tag.prototype.translateY = function() {
		return (this.height+8) * this.line.count;
	};
	Tag.prototype.render = function() {
		var k = this.getRandomFactor(), r;
		r = Math.floor(this.height/2);
		this._text = {
			x: 34,
			y: r,
			translating: {
				x: 0,
				y: 0
			}
		};
		this._text.width = this._context.measureText(this._item.label).width;
		this._text.height = parseInt(this._context.font);
		this._context.save();
		if(this._canvas.grid) {
			this._text.translating.x = this.offsetX();
			this._text.translating.y = this.offsetY();
		}
		else {
			this._text.translating.x = this.translateX();
			this._text.translating.y = this.translateY();
		}
		this._context.translate(this._text.translating.x, this._text.translating.y);
		this._context.beginPath();
		this._context.arc(26,4+r,4,0,Math.PI*2);
		this._context.moveTo(4,18);
		this._context.bezierCurveTo(2+k,10+k,8,10,10,14);
		this._context.bezierCurveTo(13,23,16,17,27,4+r);
		this._context.moveTo(2,26);
		k = this.getRandomFactor();
		this._context.quadraticCurveTo(2+k,18+k,12,22);
		this._context.quadraticCurveTo(18,28,27,4+r);
		this._context.stroke();
		this._context.fillText(this._item.label,this._text.x,this._text.y-2);
		this._context.restore();
	};
	
	function RoundedTag(context, item, canvas) {
		this.prototype = new Tag(context, item, canvas);
		this.prototype.render();
		this.render.call(this.prototype);
		Tag.prototype.line.width += Math.floor(this.prototype.edgeWidth()+this.prototype._text.width);
		Tag.prototype.count++;
	}
	RoundedTag.prototype.render = function() {
		var r = Math.floor(this.height/2);
		this._context.save();
		if(this._canvas.grid) {
			this._context.translate(this.offsetX(), this.offsetY());
		}
		else {
			this._context.translate(this.translateX(), this.translateY());
		}
		this._context.beginPath();
		this._context.arc(16+r,4+r,r,0.5*Math.PI,1.5*Math.PI);
		if(this._canvas.grid) {
			this._context.lineTo(16+r+this.width,4);
			this._context.arc(16+r+this.width,4+r,r,1.5*Math.PI,0.5*Math.PI);
		}
		else {
			this._context.lineTo(16+r+this._text.width,4);
			this._context.arc(16+r+this._text.width,4+r,r,1.5*Math.PI,0.5*Math.PI);
		}
		this._context.closePath();
		this._context.stroke();
		this._context.restore();
	};
	
	function SquareTag(context, item, canvas) {
		this.prototype = new Tag(context, item, canvas);
		this.prototype.render();
		this.render.call(this.prototype);
		Tag.prototype.line.width += Math.floor(16+23+2+this.prototype._text.width);
		Tag.prototype.count++;
	}
	SquareTag.prototype.render = function() {
		this._context.save();
		if(this._canvas.grid) {
			this._context.translate(this.offsetX(), this.offsetY());
		}
		else {
			this._context.translate(this.translateX(), this.translateY());
		}
		this._context.beginPath();
		this._context.moveTo(16,4+Math.floor(this.height/2));
		this._context.lineTo(23,4);
		if(this._canvas.grid) {
			this._context.lineTo(23+this.width,4);
			this._context.lineTo(23+this.width,this.height+4);
		}
		else {
			this._context.lineTo(16+23+this._text.width,4);
			this._context.lineTo(16+23+this._text.width,this.height+4);
		}
		this._context.lineTo(23,this.height+4);
		this._context.closePath();
		this._context.stroke();
		this._context.restore();
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
