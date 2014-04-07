/*
 * Webtags v0.4.0-pl, Dashboard for webtags v1.0.7-pl 
 * Webtags GitHub page (source code and links): https://github.com/earthperson/Webtags
 * Webtags site: http://earthperson.github.io/Webtags/
 * Dashboard for webtags: http://earthperson.github.io/Webtags/dashboard/
 * Author website: http://earthperson.info
 * 
 * Copyright (c) 2013 Dmitry Ponomarev (email: ponomarev.dev@gmail.com) 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
function Webtags (properties) {
	if (properties instanceof Object && properties['items']) {
		for (var a in properties) {
			this.properties[a] = properties[a];
		}
		this.canvas.render();
	}	
}
Webtags.prototype.properties = {};
Webtags.prototype.canvas = null;
(function(Webtags) {
	
	function Canvas() {
		var properties = {
			type: "rounded", // "square"
			width: 500,
			height: 350,
			border: true,
			donate: false,
			grid: false,
			style: {
				border: "1px solid #5e8cc2"
			}
		}, a;
		for (a in properties) {
			this.properties[a] = properties[a];
		}
	}
	Canvas.prototype = new Webtags();
	Canvas.prototype.items = [];
	Canvas.prototype.hover = null;
	Canvas.POWERED_BY = {
		LABEL: "Powered by Webtags v0.4.0-pl",
		URL: "https://github.com/earthperson/Webtags",
		FONT: "10px Helvetica"
	};
	Canvas.prototype.poweredBy = {
		x: null,
		y: null
	};
	Canvas.DONATE_LINK = {
		LABEL: "Donate...",
		URL: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RTRX3BMMVP3L8",
		FONT: "10px Helvetica"
	};
	Canvas.prototype.donateLink = {
		width: null,
		y: null
	};
	Canvas.prototype.element = null;
	Canvas.prototype.getMousePosition = function(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	};
	// Check if the mouse is over the webtag label or powered by and change cursor style
	Canvas.prototype.onMousemove = function(e) {
		var mousePosition = Canvas.prototype.getMousePosition(Canvas.prototype.element, e), x = mousePosition.x, y = mousePosition.y, a, o;
		document.body.style.cursor = Canvas.prototype.hover = null;
		for (a in Canvas.prototype.items) {
			o = Canvas.prototype.items[a].text;
			// Is the mouse over the webtag label?
			if (x >= parseInt(o.x+o.translating.x) && x <= (parseInt(o.x+o.translating.x) + parseInt(o.width)) && y >= parseInt(o.y+o.translating.y) && y <= (parseInt(o.y+o.translating.y) + parseInt(o.height))) {
				document.body.style.cursor = 'pointer';
				Canvas.prototype.hover = Canvas.prototype.items[a].item.url;
				break;
			}
		}
		if(Canvas.prototype.properties.border) {
			o = Canvas.prototype.poweredBy;
			// Is the mouse over the powered by?
			if (x >= o.x && x <= Canvas.prototype.properties.width && y >= o.y && y <= Canvas.prototype.properties.height) {
				document.body.style.cursor = 'pointer';
				Canvas.prototype.hover = Canvas.POWERED_BY.URL;
			}
		}
		if(Canvas.prototype.properties.donate) {
			// Is the mouse over the donate link?
			o = Canvas.prototype.donateLink;
			if (x >= 0 && x <= o.width && y >= o.y && y <= Canvas.prototype.properties.height) {
				document.body.style.cursor = 'pointer';
				Canvas.prototype.hover = Canvas.DONATE_LINK.URL;
			}
		}
	};
	Canvas.prototype.onClick = function(e) {
		if (Canvas.prototype.hover)  {
			window.open(Canvas.prototype.hover);
		}
	};
	Canvas.prototype.render = function() {
		var canvas = Canvas.prototype.element = document.getElementById('webtags');
		canvas.width = this.properties.width;
		canvas.height = this.properties.height;
		canvas.style.border = this.properties.border || this.properties.donate ? this.properties.style.border : 'none';
		if (canvas.getContext) {
			var context = canvas.getContext('2d'), i = 0, l = this.properties.items.length;
			context.clearRect(0, 0, canvas.width, canvas.height);
			Tag.prototype.count = 0;
			Tag.prototype.line = {
				width: 0,
				count: 0
			};
			// Add mouse listeners
			canvas.addEventListener('mousemove', Canvas.prototype.onMousemove, false);
			canvas.addEventListener('click', Canvas.prototype.onClick, false);
			// Render tags
			for(; i < l; i++) {
				Canvas.prototype.items.push(
					new (this.properties.type == 'square' ? SquareTag : RoundedTag)(context, this.properties.items[i])
				);
			}
			context.fillStyle = this.properties.style.border.match(/#\w{3,}$/) || '#5e8cc2';
			// Render powered by
			if (this.properties.border) {
				context.font = Canvas.POWERED_BY.FONT;
				this.poweredBy.x = parseInt(Canvas.prototype.properties.width - context.measureText(Canvas.POWERED_BY.LABEL).width);
				this.poweredBy.y = parseInt(Canvas.prototype.properties.height - parseInt(Canvas.POWERED_BY.FONT));
				context.fillText(Canvas.POWERED_BY.LABEL, this.poweredBy.x, this.poweredBy.y);
			}
			// Render donate link
			if (this.properties.donate) {
				context.font = Canvas.DONATE_LINK.FONT;
				this.donateLink.width = parseInt(context.measureText(Canvas.DONATE_LINK.LABEL).width);
				this.donateLink.y = parseInt(Canvas.prototype.properties.height - parseInt(Canvas.DONATE_LINK.FONT));
				context.fillText(Canvas.DONATE_LINK.LABEL, 1, this.donateLink.y);
			}
		}
		else {
			// Canvas-unsupported code here
		}
	};
	Canvas.prototype.toString = function() {
		this.render();
	};
	
	function Tag() {
		
	}
	Tag.prototype.properties = {
		width: 100,
		height: 40,
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
		return parseFloat((this.count % Math.floor(Canvas.prototype.properties.width / w)) * w);
	};
	Tag.prototype.offsetY = function() {
		var w = Tag.prototype.properties.width + this.edgeWidth();
		return Math.floor(this.count / Math.floor(Canvas.prototype.properties.width / w)) * Tag.prototype.properties.height;
	};
	Tag.prototype.translateX = function() {
		if(this.line.width + this.text.width > (Canvas.prototype.properties.width - this.edgeWidth())) {
			this.line.width = 0;
			this.line.count++;
			return 0;
		}
		else {
			return this.line.width;
		}
	};
	Tag.prototype.edgeWidth = function() {
		return Canvas.prototype.properties.type == 'rounded' ? 32+16+2 : 16+23+2;
	};
	Tag.prototype.translateY = function() {
		return Tag.prototype.properties.height * Tag.prototype.line.count;
	};
	Tag.prototype.render = function() {
		var k = this.getRandomFactor(), properties = Canvas.prototype.properties, a;
		if (properties['tag'] instanceof Object) {
			for (a in properties.tag) {
				if(a === 'context' && properties.tag.context instanceof Object) {
					for (a in properties.tag.context) {
						this.properties.context[a] = properties.tag.context[a];
					}
					continue;
				}
				this.properties[a] = properties.tag[a];
			}
		}
		for(a in this.properties.context) {
			this.context[a] = this.properties.context[a];
		}
		this.text = {
			x: 34,
			y: 15,
			translating: {
				x: 0,
				y: 0
			}
		};
		this.text.width = this.context.measureText(this.item.label).width;
		this.text.height = parseInt(this.context.font);
		this.context.save();
		if(Canvas.prototype.properties.grid) {
			this.text.translating.x = this.offsetX();
			this.text.translating.y = this.offsetY();
		}
		else {
			this.text.translating.x = this.translateX();
			this.text.translating.y = this.translateY();
		}
		this.context.translate(this.text.translating.x, this.text.translating.y);
		this.context.beginPath();
		this.context.arc(26,20,4,0,Math.PI*2);
		this.context.moveTo(4,18);
		this.context.bezierCurveTo(2+k,10+k,8,10,10,14);
		this.context.bezierCurveTo(13,23,16,17,27,20);
		this.context.moveTo(2,26);
		k = this.getRandomFactor();
		this.context.quadraticCurveTo(2+k,18+k,12,22);
		this.context.quadraticCurveTo(18,28,27,20);
		this.context.stroke();
		this.context.fillText(this.item.label,this.text.x,this.text.y);
		this.context.restore();
	};
	
	function RoundedTag(context, item) {
		this.context = context;
		this.item = item;
		Tag.prototype.render.call(this);
		this.render();
		Tag.prototype.line.width += Math.floor(this.edgeWidth()+this.text.width);
		Tag.prototype.count++;
	}
	RoundedTag.prototype = new Tag();
	RoundedTag.prototype.render = function() {
		this.context.save();
		if(Canvas.prototype.properties.grid) {
			this.context.translate(this.offsetX(), this.offsetY());
		}
		else {
			this.context.translate(this.translateX(), this.translateY());
		}
		this.context.beginPath();
		this.context.arc(32,20,16,0.5*Math.PI,1.5*Math.PI);
		if(Canvas.prototype.properties.grid) {
			this.context.lineTo(32+Tag.prototype.properties.width,4);
			this.context.arc(32+Tag.prototype.properties.width,20,16,1.5*Math.PI,0.5*Math.PI);
		}
		else {
			this.context.lineTo(32+this.text.width,4);
			this.context.arc(32+this.text.width,20,16,1.5*Math.PI,0.5*Math.PI);
		}
		this.context.closePath();
		this.context.stroke();
		this.context.restore();
	};
	
	function SquareTag(context, item) {
		this.context = context;
		this.item = item;
		Tag.prototype.render.call(this);
		this.render();
		Tag.prototype.line.width += Math.floor(16+23+2+this.text.width);
		Tag.prototype.count++;
	}
	SquareTag.prototype = new Tag();
	SquareTag.prototype.render = function() {
		this.context.save();
		if(Canvas.prototype.properties.grid) {
			this.context.translate(this.offsetX(), this.offsetY());
		}
		else {
			this.context.translate(this.translateX(), this.translateY());
		}
		this.context.beginPath();
		this.context.moveTo(16,20);
		this.context.lineTo(23,4);
		if(Canvas.prototype.properties.grid) {
			this.context.lineTo(23+Tag.prototype.properties.width,4);
			this.context.lineTo(23+Tag.prototype.properties.width,36);
		}
		else {
			this.context.lineTo(16+23+this.text.width,4);
			this.context.lineTo(16+23+this.text.width,36);
		}
		this.context.lineTo(23,36);
		this.context.closePath();
		this.context.stroke();
		this.context.restore();
	};
	
	Webtags.prototype.canvas = new Canvas();
	
})(Webtags);
