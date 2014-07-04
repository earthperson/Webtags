![webtags][5] Webtags
=======
Rendering web tags using [HTML5 Canvas][1]. It is useful for my [personal web page][2], [sole proprietorship web page][3], [earthperson.github.io GitHub page][4] for examples&hellip;

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
			"label": "Author website",
			"url": "http://earthperson.info/en/"
		},
		{
			"label": "Author website 2",
			"url": "http://dev.earthperson.info/en/"
		}
	]
});
</script>
```
Here you can download [render.min.js][11] (7.9K, gzipped ~2.3K).
[11]: https://raw.github.com/earthperson/Webtags/master/render.min.js

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
	"donate": false,
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
