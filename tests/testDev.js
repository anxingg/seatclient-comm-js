var str = "1200 0 1#";
str = str.replace("#"," ");
var strArray = str.split(" ");
strArray.forEach(function(element) {
    console.log(element);
}, this);