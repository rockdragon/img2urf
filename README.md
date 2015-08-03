# img2urf
A lib support img covert to urf

Usage
-------------
```javascript
var img2urf = require("img2urf");

img2urf.convert('../samples/sample.gif', '../samples/sample.urf', function(err){
    if(err) return console.log(err);
    console.log("DONE");
});
```


Reference
-------------
https://github.com/AlanQuatermain/unirast/blob/master/partial_decode.txt
