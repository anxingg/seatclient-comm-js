/*
msgMap =[
    {dataHead:0,procFunction:loginResp,execute : function(){
        console.log("loginResp");
    }},
    {dataHead:1,procFunction:loginResp}
]
*/

var ob=new Object();
ob.loginResp = function(){
    console.log("loginResp");
}
//ob.loginResp = loginResp;
msgMap =[
    {dataHead:0,procFunction:ob.loginResp,execute : ob.loginResp},
    {dataHead:1,procFunction:ob.loginResp}
]
msgMap.findAndProc = function(dataHead){
    var bfind = false;
    console.log("this.length="+this.length.toString());
    for(var i=0;i<this.length;i++){
        console.log("this[i].dataHead="+this[i].dataHead.toString());
        if(this[i].dataHead == dataHead){
            this[i].execute();
            bfind = true;
            break;
        }
    }
    return bfind;
}

if(msgMap.findAndProc(0) == true){
    console.log("finded");
}
else
    console.log("not find");