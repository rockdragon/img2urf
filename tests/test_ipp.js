var ipp = require('ipp');
var fs = require("fs");
var util = require("util");

var img2urf = require("../lib/lib_img2urf");

function get_printer(printIp){
    var ippUrl = util.format('http://%s:%d/%s', printIp, 631, 'ipp/print');
    return ipp.Printer(ippUrl);
}

function print_Urf(fileName, printIp, cb) {
    fs.readFile(fileName, function (err, data) {
        var msg = {
            "operation-attributes-tag": {
                "requesting-user-name": "Anonymous",
                "job-name": "job-222",
                "document-format": "image/urf"
            }
            , "job-attributes-tag": {
                "copies": 1,
            }
            , data: data
        };

        var printer = get_printer(printIp);

        printer.execute("Print-Job", msg, function (err, res) {
            if(err) return cb(err);
            return cb(err, res);
        });
    });
}

var src = '../samples/ghost.jpg';
var dst = '../samples/ghost.urf';
var printerIp = '192.168.66.10';

img2urf.convert(src, dst, function(err){
    if(err) return console.log(err);
    console.log("convert DONE.");

    print_Urf(dst, printerIp, function(err, res){
        console.log(err, res);
    });
});
