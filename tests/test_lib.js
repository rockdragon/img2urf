var img2urf = require("../lib/lib_img2urf");

img2urf.convert('../samples/sample.gif', '../samples/sample.urf', function(err){
    if(err) return console.log(err);
    console.log("DONE");
});