function matrix2path(matrix, degreeOfRandom) {
    var N = matrix.length;
    var filled = [];
    for (var row = -1; row <= N; row++) {
        filled[row] = [];
    }
    var path = [];
    for (var row = 0; row < N; row++) {
        for (var col = 0; col < N; col++) {
            if (filled[row][col]) continue;
            filled[row][col] = 1;
            if (isDark(row, col)) {
                if (!isDark(row - 1, col)) {
                    path.push(plot(row, col, 'right', degreeOfRandom));
                }
            } else {
                if (isDark(row, col - 1)) {
                    path.push(plot(row, col, 'down', degreeOfRandom));
                }
            }
        }
    }
    return path;
    function isDark(row, col) {
        if (row < 0 || col < 0 || row >= N || col >= N) return false;
        return !!matrix[row][col];
    }
    function plot(row0, col0, dir, degreeOfRandom, dataRenderType) {
        randPlot = (-0.1*degreeOfRandom) + (organicDataMatrix()*(0.2*degreeOfRandom)).toFixed(2)/1
        filled[row0][col0] = 1;
        var res = [];
        res.push(['M',  col0, row0 ]);
        var row = row0;
        var col = col0;
        var len = 0;
        if (dataRenderType == "drawn") {
        do {
            switch (dir) {
                case 'right':
                    filled[row][col] = 1;
                    if (isDark(row, col)) {
                        filled[row - 1][col] = 1;
                        if (isDark(row - 1, col)) {
                            res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                            len = 0;
                            dir = 'up';
                        } else {
                            len++;
                            col++;
                        }
                    } else {
                        res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                        len = 0;
                        dir = 'down';
                    }
                    break;
                case 'left':
                    filled[row - 1][col - 1] = 1;
                    if (isDark(row - 1, col - 1)) {
                        filled[row][col - 1] = 1;
                        if (isDark(row, col - 1)) {
                            res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                            len = 0;
                            dir = 'down';
                        } else {
                            len++;
                            col--;
                        }
                    } else {
                        res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                        len = 0;
                        dir = 'up';
                    }
                    break;
                case 'down':
                    filled[row][col - 1] = 1;
                    if (isDark(row, col - 1)) {
                        filled[row][col] = 1;
                        if (isDark(row, col)) {
                            res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                            len = 0;
                            dir = 'right';
                        } else {
                            len++;
                            row++;
                        }
                    } else {
                        res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                        len = 0;
                        dir = 'left';
                    }
                    break;
                case 'up':
                    filled[row - 1][col] = 1;
                    if (isDark(row - 1, col)) {
                        filled[row - 1][col - 1] = 1;
                        if (isDark(row - 1, col - 1)) {
                            res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                            len = 0;
                            dir = 'left';
                        } else {
                            len++;
                            row--;
                        }
                    } else {
                        res.push(['Q', col+1, ' ',row+1, ',',col+1+randPlot, ' ',row+1+randPlot]);
                        len = 0;
                        dir = 'right';
                    }
                    break;
                }
            }
        } else if (dataRenderType == "straight"){
            do {
            switch (dir) {
            case 'right':
                filled[row][col] = 1;
                if (isDark(row, col)) {
                    filled[row - 1][col] = 1;
                    if (isDark(row - 1, col)) {
                        res.push(['h', len]);
                        len = 0;
                        dir = 'up';
                    } else {
                        len++;
                        col++;
                    }
                } else {
                    res.push(['h', len]);
                    len = 0;
                    dir = 'down';
                }
                break;
            case 'left':
                filled[row - 1][col - 1] = 1;
                if (isDark(row - 1, col - 1)) {
                    filled[row][col - 1] = 1;
                    if (isDark(row, col - 1)) {
                        res.push(['h', -len]);
                        len = 0;
                        dir = 'down';
                    } else {
                        len++;
                        col--;
                    }
                } else {
                    res.push(['h', -len]);
                    len = 0;
                    dir = 'up';
                }
                break;
            case 'down':
                filled[row][col - 1] = 1;
                if (isDark(row, col - 1)) {
                    filled[row][col] = 1;
                    if (isDark(row, col)) {
                        res.push(['v', len]);
                        len = 0;
                        dir = 'right';
                    } else {
                        len++;
                        row++;
                    }
                } else {
                    res.push(['v', len]);
                    len = 0;
                    dir = 'left';
                }
                break;
            case 'up':
                filled[row - 1][col] = 1;
                if (isDark(row - 1, col)) {
                    filled[row - 1][col - 1] = 1;
                    if (isDark(row - 1, col - 1)) {
                        res.push(['v', -len]);
                        len = 0;
                        dir = 'left';
                    } else {
                        len++;
                        row--;
                    }
                } else {
                    res.push(['v', -len]);
                    len = 0;
                    dir = 'right';
                }
                break;
            }
        }
        }
         while (row != row0 || col != col0);
        }
        return res;
    }
}
function pushSVGPath(matrix, stream, margin) {
    matrix2path(matrix, 2).forEach(function(subpath) {
        var res = '';
        for (var k = 0; k < subpath.length; k++) {
            var item = subpath[k];
            switch (item[0]) {
                case 'M':
                    res += 'M' + (item[1] + margin) + ' ' + (item[2] + margin);
                    break;
                default:
                    res += item.join('');
            }
        }
        res += 'z';
        stream.push(res);
    });
}
// Options -EyeType ( leaf, grid )
// Options -eyeColour
// Options -eyeBorderColour
// Options -strokeWidth
// Options -strokeColour
// Options -ImageOverlay
// Options -Logo
//
function organicDataMatrix() {
    variation = Math.random()
    return variation
}


function designTemplate(matrix, eyeType, eyeColour, eyeBorderColour, strokeWidth, strokeColour, text) {
    // b - the length of the matrix including the margin
    // eg 25x25 matrix; the length is 25; the margin (default 1)
    var b = matrix.length + 2
    // text = text.replace(/^https?:\/\//, '')
    var res = '<path stroke-width="' + strokeWidth + '" fill="' + eyeBorderColour + '" stroke-linecap="round" stroke="' + strokeColour + '" stroke-linejoin="round" d="'
    // the finders are at the top left and right corners and bottom left
    // using the length, the position can be determined so that it scales
    switch(eyeType)
    {
        case 'leaf':
            res += 'M3 1 h3 Q 8 1, 8 3 v5h-5 Q 1 8, 1 6 v-3 Q 1 1, 3 1 M2 3 v3 Q 2 7, 3 7 h4 v-4 Q 7 2, 6 2 h-3 Q 2 2, 2 3 '
            res += 'M'+(b-3)+' 8 h-5 v-5 Q '+(b-8)+' 1, '+(b-6)+' 1 h3 Q '+(b-1)+' 1, '+(b-1)+' 3 v3 Q '+(b-1)+' 8, '+(b-3)+' 8 M'+(b-7)+' 3 v4 h4 Q '+(b-2)+' 7, '+(b-2)+' 6 v-3 Q '+(b-2)+' 2, '+(b-3)+' 2 h-3 Q '+(b-7)+' 2, '+(b-7)+' 3 '
            res += 'M3 '+(b-8)+' h5 v5 Q 8 '+(b-1)+', 6 '+(b-1)+' h-3 Q 1 '+(b-1)+', 1 '+(b-3)+' v-3 Q 1 '+(b-8)+', 3 '+(b-8)+' M2 '+(b-6)+' v3 Q 2 '+(b-2)+', 3 '+(b-2)+' h3 Q 7 '+(b-2)+', 7 '+(b-3)+' v-4 h-4, Q 2 '+(b-7)+', 2 '+(b-6)+'"/>'

            res += '<path stroke-width="' + strokeWidth + '" fill="' + eyeColour + '" stroke-linecap="round" stroke="' + strokeColour + '" stroke-linejoin="round" d="'
            res += 'M4 3 h1 Q 6 3, 6 4 v2 h-2 Q 3 6, 3, 5 v-1 Q 3 3, 4 3 M4 '+(b-6)+' h2 v2 Q 6 '+(b-3)+', 5 '+(b-3)+' h-1 Q 3 '+(b-3)+', 3 '+(b-4)+' v-1 Q 3 '+(b-6)+', 4 '+(b-6)+' M'+(b-5)+' 3h1 Q '+(b-3)+' 3, '+(b-3)+' 4 v1 Q '+(b-3)+' 6, '+(b-4)+' 6 h-2 v-2 Q '+(b-6)+' 3, '+(b-5)+' 3"/>'
            break;
        case 'grid':
        default:
            res += 'M6 1 h2v7h-7v-2 Q 1 1, 6 1 '
            res += 'M'+(b-1)+' 6 v2h-7v-7h2 Q '+(b-1)+' 1, '+(b-1)+' 6 '
            res += 'M1 '+(b-8)+' h7v7h-2 Q 1 '+(b-1)+', 1 '+(b-6)+' v-2"/>'
            res += '<circle cx="4.7" cy="4.7" r="2.5" fill="white"/><circle cx="4.7" cy="4.7" r="1.4" fill="'+eyeColour+'"/>'
            res += '<circle cx="'+(b-4.7)+'" cy="4.7" r="2.5" fill="white"/><circle cx="'+(b-4.7)+'" cy="4.7" r="1.4" fill="'+eyeColour+'"/>'
            res += '<circle cx="4.7" cy="'+(b-4.7)+'" r="2.5" fill="white"/><circle cx="4.7" cy="'+(b-4.7)+'" r="1.4" fill="'+eyeColour+'"/>'
    }
    res += '<text x="' + 2.5 + '" y="' + (b-1.3)  + '" stroke="#00ff00" stroke-width="0.05" fill="#0000ff" font-family="Verdana" font-size="0.6"> ' + text + ' </text>'
    return res
}

function designDataTemplate(strokeColor, fillColor, strokeWidth)
{
    return '<path stroke="'+ strokeColor +'" fill="' + fillColor + '" stroke-width="' + strokeWidth + '" d="'
}

function SVG_object(matrix, margin) {
    var stream = [];
    pushSVGPath(matrix, stream, margin);
    var result = {
        size: matrix.length + 2 * margin,
        path: stream.filter(Boolean).join('')
    }
    return result;
}
function SVG(matrix, stream, margin, size, qrOptions, xcor, ycor, text) {
    text = text.replace(/^(https?)?\/\/q0\.my\//, '')
    colourDarkWheel = ["#fd6d21", "#2e2979", 'black', 'red']

    eyeCol = qrOptions.eyeColor ? qrOptions.eyeColor : colourDarkWheel[Math.floor(Math.random() * (colourDarkWheel.length+1))]
    eyeSCol = qrOptions.eyeBorderColor ? qrOptions.eyeBorderColor : colourDarkWheel[Math.floor(Math.random() * (colourDarkWheel.length+1))]

    dataSCol = qrOptions.dataBorderColor ? qrOptions.dataBorderColor : colourDarkWheel[Math.floor(Math.random() * (colourDarkWheel.length+1))]
    dataCol = qrOptions.dataColor ? qrOptions.dataColor : colourDarkWheel[Math.floor(Math.random() * (colourDarkWheel.length+1))]

    var X = matrix.length + 2 * margin;

    stream.push('<svg xmlns="http://www.w3.org/2000/svg" ');
    if (size > 0) {
        var XY = X * size;
        stream.push('width="' + XY + '" height="' + XY + '" ');
    }
    var xCor = XY*xcor
    var yCor = XY*ycor
    stream.push('x="'+ xCor + '" y="' + yCor + '" ');
    stream.push('viewBox="0 0 ' + X + ' ' + X + '">');
    stream.push(designTemplate(matrix, qrOptions.eyeType, eyeCol, eyeSCol, 0.1,"#d5fd35", text))
    stream.push(designDataTemplate(dataSCol, dataCol, 0.2))
    pushSVGPath(matrix, stream, margin);
    stream.push('"/></svg>');
    stream.push(null);
}
function EPS(matrix, stream, margin) {
    var N = matrix.length;
    var scale = 9;
    var X = (N + 2 * margin) * scale;
    stream.push([
        '%!PS-Adobe-3.0 EPSF-3.0',
        '%%BoundingBox: 0 0 ' + X + ' ' + X,
        '/h { 0 rlineto } bind def',
        '/v { 0 exch neg rlineto } bind def',
        '/M { neg ' + (N + margin) + ' add moveto } bind def',
        '/z { closepath } bind def',
        scale + ' ' + scale + ' scale',
        ''
    ].join('\n'));
    matrix2path(matrix, 1).forEach(function(subpath) {
        var res = '';
        for (var k = 0; k < subpath.length; k++) {
            var item = subpath[k];
            switch (item[0]) {
                case 'M':
                    res += (item[1] + margin) + ' ' + item[2] + ' M ';
                    break;
                default:
                    res += item[1] + ' ' + item[0] + ' ';
            }
        }
        res += 'z\n';
        stream.push(res);
    });
    stream.push('fill\n%%EOF\n');
    stream.push(null);
}
function PDF(matrix, stream, margin) {
    // TODO deflate
    var N = matrix.length;
    var scale = 9;
    var X = (N + 2 * margin) * scale;
    var data = [
        '%PDF-1.0\n\n',
        '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n',
        '2 0 obj << /Type /Pages /Count 1 /Kids [ 3 0 R ] >> endobj\n',
    ];
    data.push('3 0 obj << /Type /Page /Parent 2 0 R /Resources <<>> ' +
        '/Contents 4 0 R /MediaBox [ 0 0 ' + X + ' ' + X + ' ] >> endobj\n');
    var path = scale + ' 0 0 ' + scale + ' 0 0 cm\n';
    path += matrix2path(matrix, 1).map(function(subpath) {
        var res = '';
        var x, y;
        for (var k = 0; k < subpath.length; k++) {
            var item = subpath[k];
            switch (item[0]) {
                case 'M':
                    x = item[1] + margin;
                    y = N - item[2] + margin;
                    res += x + ' ' + y + ' m ';
                    break;
                case 'h':
                    x += item[1];
                    res += x + ' ' + y + ' l ';
                    break;
                case 'v':
                    y -= item[1];
                    res += x + ' ' + y + ' l ';
                    break;
            }
        }
        res += 'h';
        return res;
    }).join('\n');
    path += '\nf\n';
    data.push('4 0 obj << /Length ' + path.length + ' >> stream\n' +
        path + 'endstream\nendobj\n');
    var xref = 'xref\n0 5\n0000000000 65535 f \n';
    for (var i = 1, l = data[0].length; i < 5; i++) {
        xref += ('0000000000' + l).substr(-10) + ' 00000 n \n';
        l += data[i].length;
    }
    data.push(
        xref,
        'trailer << /Root 1 0 R /Size 5 >>\n',
        'startxref\n' + l + '\n%%EOF\n'
    );
    stream.push(data.join(''));
    stream.push(null);
}
module.exports = {
    svg: SVG,
    eps: EPS,
    pdf: PDF,
    svg_object: SVG_object
}