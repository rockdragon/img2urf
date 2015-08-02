var lwip = require("lwip");
var util = require("util");

var utility = {};
utility.outWrite = function(){
    var args = [].slice.call(arguments);
    process.stdout.write.call(process.stdout, args.join(' '));
}

var format = {};
format.HEADER =  new Buffer("554e495241535400", "hex");
format.PAGES = new Buffer("00000001", "hex");  // always only-one page, otherwise just need crop out it.


function img2urf(imgPath, cb){
    lwip.open(imgPath, function (err, img) {
        if(err) return cb(err);

        var width = img.width(),
            height = img.height();


    });
}

module.exports = img2urf;