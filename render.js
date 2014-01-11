/*
 * Webtags v0.0.0, Dashboard for webtags v1.0.0-alpha (https://github.com/earthperson/webtags)
 * 
 * Copyright (c) 2013 Dmitry Ponomarev (email: ponomarev.dev@gmail.com) 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function() {
	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect (10, 10, 55, 50);
		
		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect (30, 30, 55, 50);
	}
	else {
		// canvas-unsupported code here
	}
})();
