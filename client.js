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

var gMSIUserId = 245
var gCallId = 201605050930210024;
var gWorkNo = 123456;

seat_client.server_url = "ws://localhost:1202/msiserver";

seat_client.onclose = onclose;

seat_client.onopen = function onopen() {
    log += "Connected\n";
    print();
    seat_client.sendlogin(gMSIUserId,gWorkNo,"pass",1,-1,'NoIpName',1,'13783476576');
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
                
seat_client.connect();


                        
function cmd(){
    console.log("输入指令内容，CTRL+C 退出")
    process.stdin.setEncoding('utf8');
    process.stdin.pause();
    process.stdin.on('readable', function(chunk) {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write('输入指令:' + chunk);
            if(chunk == "exit")
                process.exit();
        }
    });
};
cmd();


