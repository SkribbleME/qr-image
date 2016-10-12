eyeType = ['grid','leaf','box']

drawingType = ['straight', 'drawn']

darkColours = ['#144914','#5C1919','#5C3719','#0F3737','#4E521C','#2F1437','#54391C','#132C34','#54451C','#191A3A','#4A1929','#304B19']

lightColours = ['#CCECCC','#FFDDDD','#FFECDD','#BCD9D9','#FBFDDB','#D8C2DF','#FFEEDD','#BFD4DB' ,'#FFF6DD','#C8C9E2','#F4D4DE','#E4F5D4']

// color outside
skribbleMain = ['#0E6660']

// inner eye color
skribbleEye = ['#B90065']

// stroke colour
skribbleStroke = ['#301B73']

skribbleEyeStroke = ['#D5FD35']

//text colour
defaultText = "#000000"

skribbleDarkColours = ['#0E6660', '#B90065', '#301B73', '#871252', '#A75516', '#25009D']

skribbleLightColours = ['#5ED2CA','#8970DB','#E968AE','#FFAF72']

module.exports = {
    EyeType: eyeType,
    DarkColours: darkColours,
    LightColors: lightColours,
    DrawingType: drawingType,
    SkribbleDefault: {
        Main: skribbleMain,
        Eye: skribbleEye,
        EyeStroke: skribbleEyeStroke,
        Stroke: skribbleStroke,
        DarkColours: skribbleDarkColours,
        LightColours: skribbleLightColours
    }

}

