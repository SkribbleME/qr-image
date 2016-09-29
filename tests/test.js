#!/usr/bin/env node

var fs = require('fs');
function file(name) {
    return fs.createWriteStream(__dirname + '/' + name);
}

var qr = require('./../');
var text = 'I \u2764\uFE0F QR code!';
text = 'http://q0.my/9nfy2f98s34+__f';

var ec_level = 'Q';

qr.image(text, { type: 'svg', ec_level: ec_level, size: 15, parse_url: true }).pipe(file('qrcode.svg'));
var svgstring = qr.imageSync(text, { type: 'svg', ec_level: ec_level, size: 15, parse_url: true});
fs.writeFile(__dirname + '/qrcode2.svg', svgstring, function(err){ if(err) console.log(err)});