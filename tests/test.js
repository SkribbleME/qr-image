#!/usr/bin/env node

var fs = require('fs');
// var attributes = require('random')

function file(name) {
    return fs.createWriteStream(__dirname + '/' + name);
}

var qr = require('./../');
var text = 'I \u2764\uFE0F QR code!';
text = 'http://q0.my/9nfy2f98s34+__f';
var url = 'http://q0.my/placeholder'

var ec_level = 'Q';

// options for svg generation
var options = { type: 'svg', ec_level: ec_level, size: 10, parse_url: true }
// options for svg design
// var qrOptions = {eyeColor: 'green', eyeBorderColor: 'purple'}
var qrOptions = {
    eyeType: 'box',
    externalEyeColor: 'grey',
    internalEyeColor: 'grey',
    eyeStrokeColor: 'grey',
    dataBorderColor: 'grey',
    dataColor: 'grey',
    dataRenderType: 'straight'
}

var svgstring = qr.imageSync(url, options, qrOptions, 0, 0);
fs.writeFile(__dirname + '/qrcodetest.svg', svgstring.Result, function(err){ if(err) console.log(err)});