/*
 * Webtags v0.0.1-alpha1, Dashboard for webtags v1.0.0-alpha1 (https://github.com/earthperson/webtags)
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
	}
	Canvas.prototype = new Webtags();
	Canvas.prototype.render = function() {
		var canvas = document.getElementById('canvas');
		canvas.width = this.properties.width;
		canvas.height = this.properties.height;
		this.properties.border ? canvas.style.border = '1px solid #5e8cc2' : canvas.style.border = 'none';
		if (canvas.getContext) {
			var context = canvas.getContext('2d'), i = 0, l = this.properties.items.length;
			for(; i < l; i++) {
				new (this.properties.type == 'rounded' ? RoundedTag : SquareTag)(context, this).render();
			}
		}
		else {
			// canvas-unsupported code here
		}
	}
	Canvas.prototype.toString = function() {
		this.render();
	}
	
	function Tag() {
		
	}
	Tag.prototype.context = null;
	Tag.prototype.render = function() {
		this.context.beginPath();
		this.context.strokeStyle = '#5e8cc2';
		this.context.lineWidth = 4;
		this.context.lineJoin = 'round';
		this.context.moveTo(16,20);
		this.context.lineTo(23,4);
		this.context.lineTo(96,4);
		this.context.lineTo(96,36);
		this.context.lineTo(23,36);
		this.context.closePath();
		this.context.stroke();
		this.context.beginPath();
		this.context.lineWidth = 2;
		this.context.arc(26,20,4,0,Math.PI*2);
		this.context.moveTo(4,17);
		this.context.bezierCurveTo(2,10,8,10,10,14);
		this.context.bezierCurveTo(13,23,16,17,27,20);
		this.context.moveTo(1,26);
		this.context.quadraticCurveTo(2,18,12,22);
		this.context.quadraticCurveTo(18,28,27,20);
		this.context.stroke();
	}
	
	function RoundedTag(context) {
		this.context = context;
	}
	RoundedTag.prototype = new Tag();
	
	function SquareTag(context) {
		this.context = context;
	}
	SquareTag.prototype = new Tag();
	
	Webtags.prototype.canvas = new Canvas();
	
})(Webtags);