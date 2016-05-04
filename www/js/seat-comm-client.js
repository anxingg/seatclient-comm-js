/**
 * @description 座席通讯客户端
 * @param {string} server_url 服务端地址 
 * @param {function()} onopen 连接成功事件处理函数
 * @param {function()} onclose 连接失败事件处理函数
 * @param {function(evt)} onmessage 接收到数据的处理函数,evt.data获取收到的数据
 * @param {function()} onerror 连接失败事件处理函数
 * @return {seat_comm_client}
 */
var seat_comm_client = function(server_url,onopen,onclose,onmessage,onerror){
    
    var ob = new Object();

    //服务端地址
    ob.server_url = server_url;
    
    ob.socket = new WebSocket(ob.server_url);
    
    ob.socket.onopen = onopen;

    ob.socket.onclose = onclose;
    
    ob.socket.onmessage = onmessage;
    
    ob.socket.onerror = onerror;
    
    ob.send = function(data){
        if (this.socket.readyState == WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            var err="socket.readyState="+this.socket.readyState;
            throw err;
        }
    }
    
    ob.close = function(){
        this.socket.close();
    }
    return ob;
}

var COMM_MSGHEAD_CONSTANTS={};

COMM_MSGHEAD_CONSTANTS.SPLIT = " ";

COMM_MSGHEAD_CONSTANTS.LOGIN = "1200";
COMM_MSGHEAD_CONSTANTS.LOGINRESP = "1100";

COMM_MSGHEAD_CONSTANTS.CALLINREPORT = "1101";
COMM_MSGHEAD_CONSTANTS.CALLINRESP = "1201";

COMM_MSGHEAD_CONSTANTS.TAIL = "#";

var seat_client = {};

seat_client.server_url = ""; 

seat_client.onopen = function() {
    console.log("seat_client.onopen");
};

seat_client.onclose = function() {
    console.log("seat_client.onclose");
};

seat_client.onerror = function() {
    console.log("seat_client.onerror:");
};

seat_client.onmessage = function(evt) {
    console.log("seat_client.onmessage data="+evt.data);
    var data = evt.data.replace(COMM_MSGHEAD_CONSTANTS.TAIL,"");
    var dataArray = data.split(COMM_MSGHEAD_CONSTANTS.SPLIT);
    var dataHead = dataArray[0];
    if(dataHead==COMM_MSGHEAD_CONSTANTS.LOGINRESP){
       onloginResponse(dataArray[0],dataArray[1]); 
    }else if(dataHead==COMM_MSGHEAD_CONSTANTS.CALLINREPORT){
       oncallinReport(dataArray[0],dataArray[1],dataArray[2],dataArray[3],dataArray[4],dataArray[5],
            dataArray[6],dataArray[7],dataArray[8]);
    }
    else{
        console.log("seat_client.onmessage cann't process:"+dataHead);
    }
};

seat_client.connect = function(){
    console.log("seat_client.connect");
    if(this.comm instanceof seat_comm_client){
        close();
    }
    this.comm = new seat_comm_client(this.server_url,this.onopen,this.onclose,this.onmessage,this.onerror);
};

seat_client.send = function(data){
    console.log("seat_client.send:"+data);
    this.comm.send(data);
}

seat_client.close = function(){
    console.log("seat_client.close");
    this.comm.close();
}

/**
* @description 连接 void SendLogin(int MSIUserId, int WorkNo, string WorkPass, int CallType, int IsIP,string IpName,int phonetype, string phone);
*/
seat_client.sendlogin = function(MSIUserId,WorkNo,WorkPass,CallType,IsIP,IpName,phonetype,phone){
    var data = COMM_MSGHEAD_CONSTANTS.LOGIN+COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT+
        WorkNo.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT+WorkPass+COMM_MSGHEAD_CONSTANTS.SPLIT+CallType.toString()+
        COMM_MSGHEAD_CONSTANTS.SPLIT+IsIP.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT+IpName+COMM_MSGHEAD_CONSTANTS.SPLIT+
        phonetype.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT+phone+COMM_MSGHEAD_CONSTANTS.TAIL;
        
    seat_client.send(data);
};

/**
 * @description 登录响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果
 */
seat_client.onloginResp = function(MSIUserId,nResult){
    console.log("seat_client.onloginResponse:"+MSIUserId.toString()+","+nResult.toString());
}

/**
 * @description 呼叫进入
 * @param {int} MSIUserId 座席ID 
 */
seat_client.oncallinReport = function(MSIUserId,callId,srcMsiUserId,serviceId,dstNum,srcNum,firstDstNum,collaData,callSrc){
    console.log("seat_client.oncallinReport:"+MSIUserId.toString()+","+callId);
}

seat_client.sendcallinResp = function(MSIUserId,callId,nResult){
    var data = COMM_MSGHEAD_CONSTANTS.CALLINRESP+COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT+
        callId+COMM_MSGHEAD_CONSTANTS.SPLIT+nResult.toString()+COMM_MSGHEAD_CONSTANTS.TAIL;
        
    seat_client.send(data);
}

if (typeof define === 'function' && define["amd"]){
    define([], function () { return seat_client; } );
}  
else if (typeof require === "function" && typeof module === "object" && module && module["exports"]){
    var WebSocket = require('ws');
    module.exports = seat_client;
} 
else if ( typeof window === "object" && typeof window.document === "object" ) {
    window.seat_client  = seat_client;
}
else{
    global["seat_client"] = seat_client;    
} 
