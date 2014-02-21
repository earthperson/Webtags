/*
 * Webtags v0.1.3-alpha1, Dashboard for webtags v1.0.2-alpha1 
 * Webtags GitHub page: https://github.com/earthperson/Webtags
 * Dashboard for webtags: http://earthperson.github.io/Webtags/dashboard/
 * Author website: http://earthperson.info
 * 
 * Copyright (c) 2013 Dmitry Ponomarev (email: ponomarev.dev@gmail.com) 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
function Webtags (properties) {
	if (properties instanceof Object && properties['items']) {
		for (var a in properties) {
			Webtags.prototype.properties[a] = properties[a];
		}
		this.canvas.render();
	}	
}
Webtags.prototype.properties = {};
Webtags.prototype.canvas = null;
(function(Webtags) {
	
	function Canvas() {
		this.properties.width = 500;
		this.properties.height = 350;
		this.properties.style = {
			border: "1px solid #5e8cc2"
		}
	}
	Canvas.prototype = new Webtags();
	Canvas.prototype.items = [];
	Canvas.prototype.hover = null;
	Canvas.prototype.text = {
		label: "Powered by Webtags v0.1.3-alpha1",
		url: "https://github.com/earthperson/Webtags",
		width: null,
		height: null,
		x: 332,
		y: 338,
		context: {
			font: "10px Helvetica"
		}
	}
	Canvas.prototype.element = null;
	Canvas.prototype.getMousePosition = function(canvas, e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		}
	}
	// Check if the mouse is over the webtag label and change cursor style
	Canvas.prototype.onMousemove = function(e) {
		var mousePosition = Canvas.prototype.getMousePosition(Canvas.prototype.element, e), x = mousePosition.x, y = mousePosition.y, a, o;
		document.body.style.cursor = Canvas.prototype.hover = null;
		for (a in Canvas.prototype.items) {
			o = Canvas.prototype.items[a].text;
			// Is the mouse over the webtag label?
			if (x >= parseInt(o.x) && x <= (parseInt(o.x) + parseInt(o.width)) && y >= parseInt(o.y) && y <= (parseInt(o.y) + parseInt(o.height))){
				document.body.style.cursor = 'pointer';
				Canvas.prototype.hover = Canvas.prototype.items[a].item.url;
				break;
			}
		}
		o = Canvas.prototype.text;
		if (x >= parseInt(o.x) && x <= (parseInt(o.x) + parseInt(o.width)) && y >= parseInt(o.y) && y <= (parseInt(o.y) + parseInt(o.height))){
			document.body.style.cursor = 'pointer';
			Canvas.prototype.hover = Canvas.prototype.text.url;
		}
	}
	Canvas.prototype.onClick = function(e) {
		if (Canvas.prototype.hover)  {
			window.open(Canvas.prototype.hover);
		}
	}
	Canvas.prototype.render = function() {
		var canvas = Canvas.prototype.element = document.getElementById('canvas');
		canvas.width = this.properties.width;
		canvas.height = this.properties.height;
		canvas.style.border = this.properties.border ? this.properties.style.border : 'none';
		if (canvas.getContext) {
			var context = canvas.getContext('2d'), i = 0, l = this.properties.items.length;
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Add mouse listeners
			canvas.addEventListener('mousemove', Canvas.prototype.onMousemove, false);
			canvas.addEventListener('click', Canvas.prototype.onClick, false);
			Tag.prototype.count = 0;
			for(; i < l; i++) {
				Canvas.prototype.items.push(
					new (this.properties.type == 'rounded' ? RoundedTag : SquareTag)(context, this.properties.items[i])
				);
			}
			if (this.properties.border) {
				for(var a in this.text.context) {
					context[a] = this.text.context[a];
				}
				context.fillText(this.text.label, this.text.x, this.text.y);
				this.text.width = context.measureText(this.text.label).width;
				this.text.height = parseInt(this.text.context.font);
			}
		}
		else {
			// Canvas-unsupported code here
		}
	}
	Canvas.prototype.toString = function() {
		this.render();
	}
	
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
	}
	Tag.prototype.context = null;
	Tag.prototype.item = null;
	Tag.prototype.text = null;
	Tag.prototype.getRandomFactor = function() {
		return (Math.random() * 10) + 1;
	}
	Tag.prototype.count = 0;
	Tag.prototype.getMx = function() {
		return parseFloat((this.count % (Canvas.prototype.properties.width / Tag.prototype.properties.width)) * Tag.prototype.properties.width);
	}
	Tag.prototype.getMy = function() {
		return Math.floor(this.count / (Canvas.prototype.properties.width / Tag.prototype.properties.width)) * Tag.prototype.properties.height;
	}
	Tag.prototype.render = function() {
		var k = this.getRandomFactor(), mx = this.getMx(), my = this.getMy(), a;
		for(a in this.properties.context) {
			this.context[a] = this.properties.context[a];
		}
		this.context.beginPath();
		this.context.arc(26+mx,20+my,4,0,Math.PI*2);
		this.context.moveTo(4+mx,18+my);
		this.context.bezierCurveTo(2+k+mx,10+k+my,8+mx,10+my,10+mx,14+my);
		this.context.bezierCurveTo(13+mx,23+my,16+mx,17+my,27+mx,20+my);
		this.context.moveTo(2+mx,26+my);
		k = this.getRandomFactor();
		this.context.quadraticCurveTo(2+k+mx,18+k+my,12+mx,22+my);
		this.context.quadraticCurveTo(18+mx,28+my,27+mx,20+my);
		this.context.stroke();
		this.text = {
			x: 34+mx,
			y: 15+my
		};
		this.context.fillText(this.item.label,this.text.x,this.text.y);
		this.text.width = this.context.measureText(this.item.label).width;
		this.text.height = parseInt(this.context.font);
	}
	
	function RoundedTag(context, item) {
		this.context = context;
		this.item = item;
		Tag.prototype.render.call(this);
		this.render();
		Tag.prototype.count++;
	}
	RoundedTag.prototype = new Tag();
	RoundedTag.prototype.render = function() {
		var mx = this.getMx(), my = this.getMy();
		this.context.beginPath();
		this.context.arc(32+mx,20+my,16,0.5*Math.PI,1.5*Math.PI);
		this.context.lineTo(80+mx,4+my);
		this.context.arc(80+mx,20+my,16,1.5*Math.PI,0.5*Math.PI);
		this.context.closePath();
		this.context.stroke();
	}
	
	function SquareTag(context, item) {
		this.context = context;
		this.item = item;
		Tag.prototype.render.call(this);
		this.render();
		Tag.prototype.count++;
	}
	SquareTag.prototype = new Tag();
	SquareTag.prototype.render = function() {
		var mx = this.getMx(), my = this.getMy();
		this.context.beginPath();
		this.context.moveTo(16+mx,20+my);
		this.context.lineTo(23+mx,4+my);
		this.context.lineTo(96+mx,4+my);
		this.context.lineTo(96+mx,36+my);
		this.context.lineTo(23+mx,36+my);
		this.context.closePath();
		this.context.stroke();
	}
	
	Webtags.prototype.canvas = new Canvas();
	
})(Webtags);
