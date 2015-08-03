var ipp = require('ipp');
var fs = require("fs");
var util = require("util");

function get_printer(printIp){
    var ippUrl = util.format('http://%s:%d/%s', printIp, 631, 'ipp/print');
    return ipp.Printer(ippUrl);
}

function print_Urf(fileName, printIp, cb) {
    fs.readFile(fileName, function (err, data) {
        var msg = {
            "operation-attributes-tag": {
                "requesting-user-name": "Anonymous",
                "job-name": "job-1",
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

print_Urf("../samples/sample.urf", '192.168.66.10', function(err, res){
    console.log(err, res);
});