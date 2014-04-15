![webtags][3] Webtags
=======
Rendering web tags using [HTML5 Canvas][1]. It is useful for my [personal web page][2] for example&hellip;

On the [Webtags site][4] you'll find the [Screencast][6], [Rendering demo][7] and [Getting started][8].
You can use online version of the [Webtags dashboard][5].

[1]: https://developer.mozilla.org/en-US/docs/HTML/Canvas
[2]: http://earthperson.info
[3]: http://earthperson.github.io/Webtags/images/webtags.png
[4]: http://earthperson.github.io/Webtags/
[5]: http://earthperson.github.io/Webtags/dashboard/
[6]: http://earthperson.github.io/Webtags/#screencast
[7]: http://earthperson.github.io/Webtags/#demo
[8]: http://earthperson.github.io/Webtags/#getting-started

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
Here you can download [render.min.js][9] (7.9K, gzipped ~2.3K).
[9]: https://raw.github.com/earthperson/Webtags/master/render.min.js
