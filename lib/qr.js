"use strict";

var Readable = require('stream').Readable;

var QR = require('./qr-base').QR;
var png = require('./png');
var vector = require('./vector');

var fn_noop = function() {};

var BITMAP_OPTIONS = {
    parse_url: false,
    ec_level: 'M',
    size: 5,
    margin: 4,
    customize: null,
    prefixUrl: ''
};

var VECTOR_OPTIONS = {
    parse_url: false,
    ec_level: 'M',
    margin: 1,
    size: 0,
    prefixUrl: ''
};

var QR_OPTIONS = {
    eyeType: 'box',
    externalEyeColor: '',
    internalEyeColor: '',
    eyeStrokeColor: '',
    dataBorderColor: '',
    dataColor: '',
    dataRenderType: 'drawn',
    forceEyeAndData: true
}

function get_options(options, force_type) {
    if (typeof options === 'string') {
        options = { 'ec_level': options }
    } else {
        options = options || {};
    }
    var _options = {
        type: String(force_type || options.type || 'png').toLowerCase()
    };

    var defaults = _options.type == 'png' ? BITMAP_OPTIONS : VECTOR_OPTIONS;

    for (var k in defaults) {
        _options[k] = k in options ? options[k] : defaults[k];
    }

    return _options;
}

function get_qrOptions(options, forceEyeAndDataColor) {
    if (typeof options === 'string') {
        options = { eyeType: options }
    } else {
        options = options || {};
    }

    var _options = {
        eyeType: String(options.eyeType || 'box').toLowerCase()
    };

    var defaults = QR_OPTIONS;

    for (var k in defaults) {
        _options[k] = k in options ? options[k] : defaults[k];
    }

    if(_options.forceEyeAndData)
        _options.dataColor = _options.internalEyeColor

    return _options;
}

function qr_image(text, options) {
    options = get_options(options);

    var matrix = QR(text, options.ec_level, options.parse_url);
    var stream = new Readable();
    stream._read = fn_noop;

    switch (options.type) {
    case 'svg':
    case 'pdf':
    case 'eps':
        process.nextTick(function() {
            vector[options.type](matrix, stream, options.margin, options.size);
        });
        break;
    case 'svg_path':
        // deprecated, use svg_object method
        process.nextTick(function() {
            var obj = vector.svg_object(matrix, options.margin, options.size);
            stream.push(obj.path);
            stream.push(null);
        });
        break;
    case 'png':
    default:
        process.nextTick(function() {
            var bitmap = png.bitmap(matrix, options.size, options.margin);
            if (options.customize) {
                options.customize(bitmap);
            }
            png.png(bitmap, stream);
        });
    }

    return stream;
}

// For SVG Creation
function qr_image_sync(text, options, qrOptions, xcor, ycor) {
    options = get_options(options);
    qrOptions = get_qrOptions(qrOptions, true)

    if(options.parse_url){
        var prefixUrl = options.prefixUrl || 'http://q0.my/'
        text = prefixUrl + text.slice(text.lastIndexOf('/') + 1)
    }

    var matrix = QR(text, options.ec_level, options.parse_url);
    var result;

    switch (options.type) {
    case 'svg':
    case 'pdf':
    case 'eps':
        var stream = [];
        vector[options.type](matrix, stream, options.margin, options.size, qrOptions, xcor, ycor, text);
        result = stream.filter(Boolean).join('');
        break;
    case 'png':
    default:
        var bitmap = png.bitmap(matrix, options.size, options.margin);
        if (options.customize) {
            options.customize(bitmap);
        }
        result = png.png_sync(bitmap);
    }

    return {Result: result, Dimension: matrix.length};
}

function svg_object(text, options) {
    options = get_options(options, 'svg');
    var matrix = QR(text, options.ec_level);
    return vector.svg_object(matrix, options.margin);
}

module.exports = {
    matrix: QR,
    image: qr_image,
    imageSync: qr_image_sync,
    svgObject: svg_object
};
