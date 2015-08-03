var lwip = require("lwip");
var fs = require("fs");

var utility = {};
utility.outWrite = function () {
    var args = [].slice.call(arguments);
    process.stdout.write.call(process.stdout, args.join(" "));
}

utility.dot2hex = function (dot) {
    var r = dot.r.toString(16);
    if (r.length == 1) r = "0" + r;
    var g = dot.g.toString(16);
    if (g.length == 1) g = "0" + g;
    var b = dot.b.toString(16);
    if (b.length == 1) b = "0" + b;
    return new Buffer(r + g + b, "hex");
}

function img2urf(imgPath, outName, cb) {
    var blob = [];
    blob.push(new Buffer("554e495241535400", "hex")); //"UNIRAST\0"
    blob.push(new Buffer("00000001", "hex"));         //PAGES: always only-one page, otherwise just need crop out it.
    blob.push(new Buffer("18", "hex"));               //BPP
    blob.push(new Buffer("01", "hex"));               //COLOR_SPACE
    blob.push(new Buffer("00", "hex"));               //DUPLEX_MODE
    blob.push(new Buffer("04", "hex"));               //QUALITY
    blob.push(new Buffer("0000000100000000", "hex"));             //UNKNOWN

    lwip.open(imgPath, function (err, img) {
        if (err) return cb(err);

        var width = img.width();
        var height = img.height();

        var widthBlob = new Buffer(4);
        widthBlob.writeIntBE(width, 0, 4);
        blob.push(widthBlob);                                   //PAGE_WIDTH

        var heightBlob = new Buffer(4);
        heightBlob.writeIntBE(height, 0, 4);
        blob.push(heightBlob);                                  //PAGE_HEIGHT

        //blob.push(new Buffer("000013ec", "hex"));           //5100 = page width
        //blob.push(new Buffer("000019c8", "hex"));           //6600 = page height

        blob.push(new Buffer("00000258", "hex"));           //DOTS_PER_INCH
        blob.push(new Buffer("0000000000000000", "hex"));   //UNKNOWN

        for (var y = 0; y < height; y++) {
            blob.push(new Buffer("00", "hex"));             //line repeat code
            for (var x = 0; x < width; x++) {
                blob.push(new Buffer("00", "hex"));         //PackBits code
                var dot = img.getPixel(x, y);
                //console.log(dot.r.toString(16), dot.g.toString(16), dot.b.toString(16));
                blob.push(utility.dot2hex(dot));
            }
        }

        fs.writeFile(outName, Buffer.concat(blob), function (err) {
            return cb(err);
        });
    });
}

module.exports = img2urf;