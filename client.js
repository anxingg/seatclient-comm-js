/*
主要的测试程序，测试通讯协议
*/

var seat_client = require('./www/js/seat-comm-client');

var log = "";
var text = "";
    
function print(){
    console.log(log);
}

function onclose() {
    log += "Disconnected\n";
};

log = ""; // Clear log on reload
/*
var gMSIUserId = 294;
var gWorkNo = 393900;
var gMSIPhone ="13783688005";
*/

var gMSIUserId = 295;
var gWorkNo = 398908;
var gMSIPhone ="13683717560";


seat_client.server_url = "ws://218.206.243.36:1202/msiserver";

seat_client.onclose = onclose;

seat_client.onopen = function onopen() {
    log += "Connected\n";
    print();
    seat_client.sendlogin(gMSIUserId,gWorkNo,"pass",1,-1,'NoIpName',1,gMSIPhone);
};

seat_client.onloginResp = function(MSIUserId,nResult){
    log = ""; // Clear log on reload
    log += "seat_client.onloginResp: "+MSIUserId.toString()+","+nResult.toString()+"\n";
    print();
    if(nResult == true){
        seat_client.sendsetmsistate(0);
    }
};  

seat_client.oncheckoutResp = function(MSIUserId,nResult){
    log = ""; // Clear log on reload
    log += "seat_client.oncheckoutResp: "+MSIUserId.toString()+","+nResult.toString()+"\n";
    print();
};

seat_client.onsetmsistateResp = function(MSIUserId,nResult){
    log = ""; // Clear log on reload
    log += "seat_client.onsetmsistateResp: "+MSIUserId.toString()+","+nResult.toString()+"\n";
    print();
};

seat_client.oncallinReport = function(MSIUserId,callId,srcMsiUserId,serviceId,
            dstNum,srcNum,firstDstNum,collaData,callSrc){
    console.log("oncallinReport:"+MSIUserId.toString()+","+callId);
    seat_client.sendcallinResp(1);
}

seat_client.onconnectedReport = function(MSIUserId,callId,nResult,nType){
    console.log("onconnectedReport:"+MSIUserId.toString()+","+callId);
}

seat_client.onhangupReport = function(MSIUserId,callId,nType){
    console.log("seat_client.onhangupReport:"+MSIUserId.toString()+","+callId);
}

seat_client.onserviceReport = function(MSIUserId,serviceId,nServiceNum,phoneList){
    console.log("onserviceReport:"+MSIUserId.toString()+","+serviceId);
}
seat_client.onsetmsioutcallorcallstateResp = function(MSIUserId,nResult){
    console.log("seat_client.onsetmsioutcallorcallstateResp");
}       
seat_client.onoutcallResp = function(MSIUserId,callId,nResult,reason){
    console.log("seat_client.onoutcallResp");
}         
seat_client.connect();


                        
function cmd(){
    console.log("输入指令内容，CTRL+C 退出")
    process.stdin.setEncoding('utf8');
    process.stdin.pause();
    process.stdin.on('readable', function(chunk) {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write('您输入的指令是:' + chunk);
            if(chunk.indexOf("exit") != -1)
                process.exit();
            
            else if(chunk.indexOf("outcallorcallstate") != -1){
                seat_client.sendmsioutcallorcallstate(2);
            }
            else if(chunk.indexOf("singlesteptransfer") != -1){
                seat_client.sendsinglesteptransfercall(0,"15729383900");
            }
            else if(chunk.indexOf("transferhold") != -1){
                seat_client.sendadvicetransferhold(1);
            }
            else if(chunk.indexOf("transferoutcall") != -1){
                seat_client.sendadvicetransferoutcall(0,294);
            }
            else if(chunk.indexOf("transfertransfer") != -1){
                seat_client.sendadvicetransfertransfer();
            }
            else if(chunk.indexOf("checkout") != -1){
                seat_client.sendcheckout(0);
            }
            else if(chunk.indexOf("checkin") != -1){
                seat_client.sendsetmsistate(0);
            }
            else if(chunk.indexOf("outcall") != -1){
                seat_client.sendoutcall("15729383900","+8637156597182");
            }
            else 
                process.stdout.write("unknown!");
        }
    });
};
cmd();


