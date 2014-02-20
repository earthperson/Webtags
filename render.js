/*
 * Webtags v0.0.2-alpha1, Dashboard for webtags v1.0.1-alpha1 (https://github.com/earthperson/webtags)
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
			Tag.prototype.count = 0;
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
	Tag.prototype.properties = {
		width: 100,
		height: 40
	}
	Tag.prototype.context = null;
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
		var k = this.getRandomFactor(), mx = this.getMx(), my = this.getMy();
		this.context.beginPath();
		this.context.strokeStyle = '#5e8cc2';
		this.context.lineWidth = 4;
		this.context.lineJoin = this.context.lineCap = 'round';
		this.context.shadowOffsetX = 2;
		this.context.shadowOffsetY = 2;
		this.context.shadowBlur = 2;
		this.context.shadowColor = 'rgba(54, 111, 179, 0.4)';
		this.context.moveTo(16+mx,20+my);
		this.context.lineTo(23+mx,4+my);
		this.context.lineTo(96+mx,4+my);
		this.context.lineTo(96+mx,36+my);
		this.context.lineTo(23+mx,36+my);
		this.context.closePath();
		this.context.stroke();
		this.context.beginPath();
		this.context.lineWidth = 2;
		this.context.arc(26+mx,20+my,4,0,Math.PI*2);
		this.context.moveTo(4+mx,18+my);
		this.context.bezierCurveTo(2+k+mx,10+k+my,8+mx,10+my,10+mx,14+my);
		this.context.bezierCurveTo(13+mx,23+my,16+mx,17+my,27+mx,20+my);
		this.context.moveTo(2+mx,26+my);
		k = this.getRandomFactor();
		this.context.quadraticCurveTo(2+k+mx,18+k+my,12+mx,22+my);
		this.context.quadraticCurveTo(18+mx,28+my,27+mx,20+my);
		this.context.stroke();
		Tag.prototype.count++;
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
