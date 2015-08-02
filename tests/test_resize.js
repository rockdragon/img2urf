var lwip = require('lwip');

lwip.open("../samples/sample.gif", function (err, img) {
    if(err) throw err;

    img.resize(150, 66, "linear", function (err) {
        if(err) throw err;

        img.writeFile("../samples/sample_min.gif", function(err){
            if(err) throw err;
            console.log("DONE");
        })
    });
});

