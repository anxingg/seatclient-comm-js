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

COMM_MSGHEAD_CONSTANTS.IDLEINTERVAL = 30000;
COMM_MSGHEAD_CONSTANTS.IDLEMAX = 1;

COMM_MSGHEAD_CONSTANTS.SPLIT = " ";

COMM_MSGHEAD_CONSTANTS.LOGIN = "1200";
COMM_MSGHEAD_CONSTANTS.LOGINRESP = "1100";

COMM_MSGHEAD_CONSTANTS.CALLINREPORT = "1101";
COMM_MSGHEAD_CONSTANTS.CALLINRESP = "1201";

COMM_MSGHEAD_CONSTANTS.HANGUPCALL = "1202";
COMM_MSGHEAD_CONSTANTS.HANGUPCALLREPORT = "1102";

COMM_MSGHEAD_CONSTANTS.NEEDCALL = "1203";


COMM_MSGHEAD_CONSTANTS.CHECKOUT = "1204";
COMM_MSGHEAD_CONSTANTS.CHECKOUTRESP = "1104";

COMM_MSGHEAD_CONSTANTS.CHECKOUT = "1204";
COMM_MSGHEAD_CONSTANTS.CHECKOUTRESP = "1104";

COMM_MSGHEAD_CONSTANTS.CONNECTEDREPORT = "1150";

COMM_MSGHEAD_CONSTANTS.SETMSISTATE = "1251";
COMM_MSGHEAD_CONSTANTS.SETMSISTATERESP = "1151";

COMM_MSGHEAD_CONSTANTS.IDLE = "1268";
COMM_MSGHEAD_CONSTANTS.IDLERESP = "1168";


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
    seat_client.lastmsgtime = new Date();
    var data = evt.data.replace(COMM_MSGHEAD_CONSTANTS.TAIL,"");
    var dataArray = data.split(COMM_MSGHEAD_CONSTANTS.SPLIT);
    var dataHead = dataArray[0];
    if(dataHead==COMM_MSGHEAD_CONSTANTS.LOGINRESP){
       seat_client.onloginResp(dataArray[1],dataArray[2]); 
    }
    else if(dataHead==COMM_MSGHEAD_CONSTANTS.CALLINREPORT){
       seat_client.oncallinReport(dataArray[1],dataArray[2],dataArray[3],dataArray[4],dataArray[5],dataArray[6],
            dataArray[7],dataArray[8],dataArray[9]);
    }
    else if(dataHead==COMM_MSGHEAD_CONSTANTS.IDLERESP){
       console.log("COMM_MSGHEAD_CONSTANTS.IDLERESP Receive"); 
    }
    else if(dataHead==COMM_MSGHEAD_CONSTANTS.CHECKOUTRESP){
        seat_client.oncheckoutResp(dataArray[1],dataArray[2]);
    }
    else if(dataHead==COMM_MSGHEAD_CONSTANTS.SETMSISTATERESP){
        seat_client.onsetmsistateResp(dataArray[1],dataArray[2]);
    }
    else if(dataHead==COMM_MSGHEAD_CONSTANTS.CONNECTEDREPORT){
        seat_client.onconnectedReport(dataArray[1],dataArray[2],dataArray[3],dataArray[4]);
    }
    else if(dataHead==COMM_MSGHEAD_CONSTANTS.HANGUPCALLREPORT){
        seat_client.onhangupReport(dataArray[1],dataArray[2],dataArray[3]);
    }
    else{
        console.log("seat_client.onmessage cann't process:"+dataHead);
    }
};
function GetDateDiff(sTime, eTime, diffType) {
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    //作为除数的数字
    var divNum =1;
    switch (diffType) {
        case "second":
            divNum =1000;
            break;
        case "minute":
            divNum =1000*60;
            break;
        case "hour":
            divNum =1000*3600;
            break;
        case "day":
            divNum =1000*3600*24;
            break;
        default:
            break;
    }
    return parseInt((new Date(eTime) 
        - new Date(sTime)) / parseInt(divNum));
}



seat_client.onidle = function(){
    console.log("seatclient.onidle");
    if(seat_client.comm.socket.readyState == WebSocket.OPEN){
        var minu=GetDateDiff(seat_client.lastmsgtime,Date(),"minute");
        console.log("seatclient.onidle minu="+minu);
        if(minu>=3*COMM_MSGHEAD_CONSTANTS.IDLEMAX){
            seat_client.close();
        }
        else if(minu>=COMM_MSGHEAD_CONSTANTS.IDLEMAX){
            seat_client.sendidle();
        }
    }
}

seat_client.connect = function(){
    console.log("seat_client.connect");
    if(seat_client.comm instanceof seat_comm_client){
        close();
    }
    seat_client.comm = new seat_comm_client(seat_client.server_url,seat_client.onopen,
        seat_client.onclose,seat_client.onmessage,seat_client.onerror);
    seat_client.lastmsgtime = new Date();
    seat_client.interval = setInterval(seat_client.onidle,COMM_MSGHEAD_CONSTANTS.IDLEINTERVAL);
};

seat_client.send = function(data){
    console.log("seat_client.send:"+data);
    seat_client.comm.send(data);
}

seat_client.close = function(){
    console.log("seat_client.close");
    clearInterval(seat_client.interval);
    seat_client.comm.close();
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
    console.log("seat_client.onloginResp:"+MSIUserId.toString()+","+nResult.toString());
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

seat_client.sendidle = function(){
    var data = COMM_MSGHEAD_CONSTANTS.IDLE+" 0 0 0"+COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

seat_client.sendcheckout = function(MSIUserId,nType){
    var data = COMM_MSGHEAD_CONSTANTS.CHECKOUT+COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT
        +nType.toString()+" 0"+COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 签出响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果
 */
seat_client.oncheckoutResp = function(MSIUserId,nResult){
    console.log("seat_client.oncheckoutResp:"+MSIUserId.toString()+","+nResult.toString());
}

seat_client.sendsetmsistate = function(MSIUserId,nType){
    var data = COMM_MSGHEAD_CONSTANTS.SETMSISTATE+COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT
        +nType.toString()+" 0"+COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 设置状态响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果
 */
seat_client.onsetmsistateResp = function(MSIUserId,nResult){
    console.log("seat_client.onsetmsistateResp:"+MSIUserId.toString()+","+nResult.toString());
}

seat_client.sendneedcall = function(MSIUserId,nServiceId){
    var data = COMM_MSGHEAD_CONSTANTS.NEEDCALL+COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT
        +nServiceId.toString()+" 0 0"+COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 呼叫已经连接
 * @param {int} MSIUserId 座席ID 
 */
seat_client.onconnectedReport = function(MSIUserId,callId,nResult,nType){
    console.log("seat_client.onconnectedReport:"+MSIUserId.toString()+","+callId);
}

seat_client.sendhangup = function(MSIUserId,callId){
    var data = COMM_MSGHEAD_CONSTANTS.HANGUPCALL+COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+COMM_MSGHEAD_CONSTANTS.SPLIT
        +callId.toString()+" 0 0"+COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 呼叫挂断
 * @param {int} MSIUserId 座席ID 
 */
seat_client.onhangupReport = function(MSIUserId,callId,nType){
    console.log("seat_client.onconnectedReport:"+MSIUserId.toString()+","+callId);
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
