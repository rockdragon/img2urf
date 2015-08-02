var lwip = require("lwip");
var util = require("util");
var outWrite = function(){
    var args = [].slice.call(arguments);
    process.stdout.write.call(process.stdout, args.join('\t'));
}

lwip.open("../samples/sample.gif", function (err, img) {
    var width = img.width(),
        height = img.height();
    console.log(util.inspect(img), img.bpp);

    console.log(util.format("LINES: %d", width));

//    for (var x = 0; x < width; x++) {
//        outWrite(util.format("LINE [%d]:\n", x));
//
//        for (var y = 0; y < height; y++) {
//            var dot = img.getPixel(x, y);
//            outWrite(dot.r, dot.g, dot.b, ' ');
//        }
//        outWrite('\n');
//    }
});

