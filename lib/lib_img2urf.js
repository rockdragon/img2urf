var lwip = require("lwip");
var util = require("util");

var utility = {};
utility.outWrite = function(){
    var args = [].slice.call(arguments);
    process.stdout.write.call(process.stdout, args.join(" "));
}

var format = [];
format.push(new Buffer("554e495241535400", "hex")); //"UNIRAST\0"
format.push(new Buffer("00000001", "hex"));         // always only-one page, otherwise just need crop out it.
format.push(new Buffer("18", "hex"));               //BPP
format.push(new Buffer("01", "hex"));               //COLOR_SPACE
format.push(new Buffer("00", "hex"));               //DUPLEX_MODE
format.push(new Buffer("04", "hex"));               //QUALITY
format.push(new Buffer("0000000100000000", "hex"));             //UNKNOWN
format.push(new Buffer("000013ec000019c800000258", "hex"));     //PAGE_SETUP
format.push(new Buffer("0000000100000000", "hex"));             //UNKNOWN

function img2urf(imgPath, cb){
    lwip.open(imgPath, function (err, img) {
        if(err) return cb(err);

        var width = img.width(),
            height = img.height();


    });
}

module.exports = img2urf;