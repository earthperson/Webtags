/*
 * Webtags v0.0.1, Dashboard for webtags v1.0.0-alpha (https://github.com/earthperson/webtags)
 * 
 * Copyright (c) 2013 Dmitry Ponomarev (email: ponomarev.dev@gmail.com) 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function() {
	
	function Webtags () {
			
	}
	
	function Canvas(properties) {
		if (properties != null) {
			this.properties = properties;
		}
	}
	Canvas.prototype.properties = {
		width: 500,
		height: 350,
		type: "rounded",
		border: true,
		webtags: new Webtags()
	}
	Canvas.prototype.render = function() {
		var canvas = document.getElementById('canvas');
		canvas.width = this.properties.width;
		canvas.height = this.properties.height;
		if (canvas.getContext) {
			var context = canvas.getContext('2d');
			new SquareTag(context).render();
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
			
	}
	Tag.prototype.render = function(context) {
		this.context.beginPath();
		this.context.strokeStyle = "#5e8cc2";
		this.context.lineWidth = 4;
		this.context.lineJoin = "round";
		this.context.moveTo(4,20);
		this.context.lineTo(12,4);
		this.context.lineTo(96,4);
		this.context.lineTo(96,36);
		this.context.lineTo(12,36);
		this.context.closePath();
		this.context.stroke();
		this.context.beginPath();
		this.context.strokeStyle = "#5e8cc2";
		this.context.lineWidth = 2;
		this.context.arc(14,20,4,0,Math.PI*2);
		this.context.closePath();
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
	
	new Canvas().render();
	
})();
