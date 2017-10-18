![webtags][5] Webtags
=======
[![Bower version](https://badge.fury.io/bo/webtags.svg)](http://badge.fury.io/bo/webtags)

Rendering web tags using [HTML5 Canvas][1]. It is useful for my [personal web page][2], [freelancer web page][3] for examples&hellip;

On the [Webtags site][6] you'll find the [Screencast][8], [Rendering demo][9] and [Getting started][10].
You can use online version of the [Webtags dashboard][7].

[1]: https://developer.mozilla.org/en-US/docs/HTML/Canvas
[2]: http://earthperson.info/en/
[3]: http://dev.earthperson.info/en/
[4]: http://earthperson.github.io
[5]: http://earthperson.github.io/Webtags/images/webtags.png
[6]: http://earthperson.github.io/Webtags/
[7]: http://earthperson.github.io/Webtags/dashboard/
[8]: http://earthperson.github.io/Webtags/#screencast
[9]: http://earthperson.github.io/Webtags/#demo
[10]: http://earthperson.github.io/Webtags/#getting-started
[11]: https://raw.github.com/earthperson/Webtags/master/render.min.js

## Contents

* [Install via Bower](#install-via-bower)
* [Getting started](#getting-started)
* [Advanced options](#advanced-options)
* [Several Webtags per page](#several-webtags-per-page)

## Install via Bower
```Shell
bower install webtags
```

## Getting started
```html
<canvas id="webtags">
	This text is displayed if your browser does not support HTML5 Canvas.
</canvas>
<script type="text/javascript" src="render.min.js"></script>
<script type="text/javascript">
new Webtags({
	"items": [
		{
			"label": "GitHub",
			"url": "https://github.com/earthperson/Webtags"
		},
		{
			"label": "Webtags",
			"url": "http://earthperson.github.io/Webtags/"
		},
		{
			"label": "Dashboard",
			"url": "http://earthperson.github.io/Webtags/dashboard/"
		},
		{
			"label": "Personal web page",
			"url": "http://earthperson.info/en/"
		},
		{
			"label": "Freelancer web page",
			"url": "http://dev.earthperson.info/en/"
		}
	]
});
</script>
```
Here you can download [render.min.js][11] (6.8K, gzipped ~2.1K).

## Advanced options
```js
new Webtags({
	"items": [{
		"label": "Webtags",
		"url": "https://github.com/earthperson/Webtags"
	}],
	"id": "webtags",
	"type": "rounded", // "square"
	"width": 500,
	"height": 350,
	"border": true,
	"grid": false,
	"style": {
		"border": "1px solid #5e8cc2"
	},
	"tag": {
		"width": 100,
		"height": 32,
		"context": {
			"fillStyle": "#5e8cc2",
			"textBaseline": "top",
			"font": "12px Arial",
			"strokeStyle": "#5e8cc2",
			"lineWidth": 2, 
			"lineJoin": "round",
			"lineCap": "round",
			"shadowOffsetX": 2,
			"shadowOffsetY": 2,
			"shadowBlur": 2,
			"shadowColor": "rgba(54, 111, 179, 0.4)"
		}
	}
});
```
Here you can download [render.min.js][11] (6.8K, gzipped ~2.1K).

## Several Webtags per page
```html
<canvas id="webtags-1">This text is displayed if your browser does not support HTML5 Canvas.</canvas>
<canvas id="webtags-2">This text is displayed if your browser does not support HTML5 Canvas.</canvas>
<canvas id="webtags-3">This text is displayed if your browser does not support HTML5 Canvas.</canvas>
<script type="text/javascript" src="render.min.js"></script>
<script type="text/javascript">
new Webtags({"id": "webtags-1", "items": [{
	"label": "GitHub",
	"url": "https://github.com/earthperson/Webtags"
}], "tag": {"context": {"fillStyle": "red", "strokeStyle": "red"}}});

new Webtags({"id": "webtags-2", "items": [{
	"label": "GitHub",
	"url": "https://github.com/earthperson/Webtags"
}], "tag": {"context": {"fillStyle": "green", "strokeStyle": "green"}}});

new Webtags({"id": "webtags-3", "items": [{
	"label": "GitHub",
	"url": "https://github.com/earthperson/Webtags"
}], "tag": {"context": {"fillStyle": "blue", "strokeStyle": "blue"}}});
</script>
```
Here you can download [render.min.js][11] (6.8K, gzipped ~2.1K).
