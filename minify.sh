#!/bin/bash
#clear

datetime() {
	date +"%T"
}

echo [`datetime`] compressing...

yui-compressor -o render.min.js render.js
