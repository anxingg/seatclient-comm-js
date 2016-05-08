/**
 * @description 座席通讯客户端
 * @param {string} server_url 服务端地址 
 * @param {function()} onopen 连接成功事件处理函数
 * @param {function()} onclose 连接失败事件处理函数
 * @param {function(evt)} onmessage 接收到数据的处理函数,evt.data获取收到的数据
 * @param {function()} onerror 连接失败事件处理函数
 * @return {seat_comm_client}
 */
var seat_comm_client = function (server_url, onopen, onclose, onmessage, onerror) {

    var ob = new Object();

    //服务端地址
    ob.server_url = server_url;

    ob.socket = new WebSocket(ob.server_url);

    ob.socket.onopen = onopen;

    ob.socket.onclose = onclose;

    ob.socket.onmessage = onmessage;

    ob.socket.onerror = onerror;

    ob.send = function (data) {
        if (this.socket.readyState == WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            var err = "socket.readyState=" + this.socket.readyState;
            throw err;
        }
    }
    ob.ping = function () {
        this.socket.ping();
    }
    ob.close = function () {
        this.socket.close();
    }
    return ob;
}

var COMM_MSGHEAD_CONSTANTS = {};

COMM_MSGHEAD_CONSTANTS.IDLEINTERVAL = 5000;
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

COMM_MSGHEAD_CONSTANTS.SERVICEREPORT = "1152";

COMM_MSGHEAD_CONSTANTS.GETIDLEMSISTATE = "1254";
COMM_MSGHEAD_CONSTANTS.GETIDLEMSISTATERESP = "1154";

COMM_MSGHEAD_CONSTANTS.GETTALKMSISTATE = "1255";
COMM_MSGHEAD_CONSTANTS.GETTALKMSISTATERESP = "1155";

COMM_MSGHEAD_CONSTANTS.MSISTATEMONITOR = "1256";
COMM_MSGHEAD_CONSTANTS.MSISTATEMONITORRESP = "1156";

COMM_MSGHEAD_CONSTANTS.IDLE = "1268";
COMM_MSGHEAD_CONSTANTS.IDLERESP = "1168";


COMM_MSGHEAD_CONSTANTS.TAIL = "#";

var CALL_INFO_STATE_CONSTANTS = {};
CALL_INFO_STATE_CONSTANTS.CallSate_NULL = 0;
CALL_INFO_STATE_CONSTANTS.CallState_InCome_Alerting = 1;//---绑定 SeatState_Idle;
CALL_INFO_STATE_CONSTANTS.CallState_OutCall_Alerting = 2;//---绑定 SeatState_LoginOut;
CALL_INFO_STATE_CONSTANTS.CallState_Connect = 3;//接通
CALL_INFO_STATE_CONSTANTS.CallState_OutCall_StateReq = 4;//外呼状态申请
CALL_INFO_STATE_CONSTANTS.CallState_OutCall_Beging = 5;//开始外呼

CALL_INFO_STATE_CONSTANTS.CallState_Hold = 6; //保持
CALL_INFO_STATE_CONSTANTS.CallState_Hold_AdapterCallTac = 7;//咨询转移
CALL_INFO_STATE_CONSTANTS.CallState_Hold_AdapterOK = 8;
CALL_INFO_STATE_CONSTANTS.CallState_Hold_AdapterFiled = 9;

CALL_INFO_STATE_CONSTANTS.CallState_Transfer_Begin = 10;//普通转移
CALL_INFO_STATE_CONSTANTS.CallState_Transfer_OK = 11; //普通转移
CALL_INFO_STATE_CONSTANTS.CallState_Transfer_Filed = 12; //普通转移

CALL_INFO_STATE_CONSTANTS.CallState_Single_Begin = 13;//单步转移
CALL_INFO_STATE_CONSTANTS.CallState_Single_OK = 14; ///单步转移
CALL_INFO_STATE_CONSTANTS.CallState_Single_Filed = 15; ///单步转移

CALL_INFO_STATE_CONSTANTS.CallState_Conf_Begin = 16;//三方开始
CALL_INFO_STATE_CONSTANTS.CallState_Conf_OK = 17;//三方成功
CALL_INFO_STATE_CONSTANTS.CallState_Conf_Filed = 18;//三方失败

CALL_INFO_STATE_CONSTANTS.CallState_Monitor_Begin = 19;//监听
CALL_INFO_STATE_CONSTANTS.CallState_Monitor_OK = 20; //监听
CALL_INFO_STATE_CONSTANTS.CallState_Monitor_Filed = 21; //监听

CALL_INFO_STATE_CONSTANTS.CallState_Intercept_Begin = 22;//拦截
CALL_INFO_STATE_CONSTANTS.CallState_Intercept_OK = 23;
CALL_INFO_STATE_CONSTANTS.CallState_Intercept_Filed = 24;

CALL_INFO_STATE_CONSTANTS.CallState_Demolished_Begin = 25;//强拆
CALL_INFO_STATE_CONSTANTS.CallState_Demolished_OK = 26;
CALL_INFO_STATE_CONSTANTS.CallState_Demolished_Filed = 27;

CALL_INFO_STATE_CONSTANTS.CallState_Entry_Beging = 28;//强插
CALL_INFO_STATE_CONSTANTS.CallState_Entry_OK = 29;
CALL_INFO_STATE_CONSTANTS.CallState_Entry_Filed = 30;

CALL_INFO_STATE_CONSTANTS.CallState_End = 31;
CALL_INFO_STATE_CONSTANTS.CallState_Conf_Alting = 32;//三方 入呼叫

var MSI_STATE_CONSTANTS = {};
MSI_STATE_CONSTANTS.SeatState_LoginIn = 0;
MSI_STATE_CONSTANTS.SeatState_LoginOut = 1;

var CALL_TYPE_CONSTANTS = {
    Idle: 0,
    InCome: 1,
    OutCall: 2
}
var callInfo = {
    callId: "",
    phone: "",
    nState: CALL_INFO_STATE_CONSTANTS.CallSate_NULL,
    nCallType: CALL_TYPE_CONSTANTS.Idle,
    initCallInfo: function () {
        callId = "";
        phone = "";
        nState = CALL_INFO_STATE_CONSTANTS.CallSate_NULL,
            nCallType = CALL_TYPE_CONSTANTS.Idle
    }
}
var msiUser = {
    msiPhone: "",
    msiUserId: -1,
    workNo: "",
    role: -1,
    serviceId: -1,
    msiPhoneType: -1,
    msiState: MSI_STATE_CONSTANTS.SeatState_LoginOut,
    compyId: -1
}
var seat_client = {};

seat_client.server_url = "";
seat_client.callInfo = callInfo;
seat_client.msiUser = msiUser;

seat_client.onopen = function () {
    console.log("seat_client.onopen");
};

seat_client.closeFlag = true;
seat_client.isConnected = function () {
    if (this.comm.socket.readyState == WebSocket.OPEN)
        return true;
    else
        return false;
}
seat_client.onclose = function () {
    console.log("seat_client.onclose");
    seat_client.close(true);
};

seat_client.onerror = function () {
    console.log("seat_client.onerror:");
    seat_client.close();
};
seat_client.onReconnect = function () {
    console.log("seat_client.onReconnect ");
}
/**
* @description 改变呼叫状态
*/
seat_client.changeCallState = function (nCallState) {
    console.log("seat_client.changeCallState before="+seat_client.callInfo.nState.toString()
        +",after="+seat_client.callInfo.nState.toString())
    seat_client.callInfo.nState = nCallState;
}
/**
* @description 初始化呼叫信息
*/
seat_client.initCallInfo = function () {
    seat_client.callInfo.initCallInfo();
    seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallSate_NULL);
}
seat_client.changeMsiState = function (nMsiState) {
    console.log("seat_client.changeMsiState ="+nMsiState);
    seat_client.msiUser.msiState = nMsiState;
}
/**
* @description 登录结果
*/
seat_client.loginResp = function (dataArray) {
    seat_client.initCallInfo();
    if(dataArray[2] == 1){
        seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginIn);
    }
    else
        seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginOut);
    seat_client.onloginResp(dataArray[1], dataArray[2]);
}
/**
* @description 呼叫进入
*/
seat_client.callinReport = function (dataArray) {
    seat_client.initCallInfo();
    if (dataArray[9] == 1)//0新呼叫 1三方 2监听3转移4强插 5 强拆
    {
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Conf_Alting);
    }
    else {
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_InCome_Alerting);
    }
    seat_client.callInfo.nCallType = CALL_TYPE_CONSTANTS.InCome;
    seat_client.callInfo.callId = dataArray[2];
    seat_client.callInfo.phone = dataArray[6];
    if (dataArray[9] == 1) {
        // 理论上三方跟普通来电没有区别
        throw "三方未实现";  
    }
    else {
        seat_client.oncallinReport(dataArray[1], dataArray[2], dataArray[3], dataArray[4], dataArray[5], dataArray[6],
            dataArray[7], dataArray[8], dataArray[9],seat_client.callInfo.nCallType);
    }
}
/**
 * @description 呼叫进入
 * @param {int} MSIUserId 座席ID 
 * @param {string} callId 呼叫ID
 * @param {int} srcMsiUserId 来源坐席ID
 * @param {int} serviceId 队列ID
 * @param {string} calledNum 被叫号码
 * @param {string} phone 主叫号码 
 * @param {string} firstDstNum 第一被叫
 * @param {string} collaData 带外数据
 * @param {string} srcType 呼叫来源  0新呼叫 1三方 2监听3转移4强插 5 强拆
 * @param {string} callType 呼叫类型 CALL_TYPE_CONSTANTS
 */
seat_client.oncallinReport = function (MSIUserId, callId, srcMsiUserId, serviceId, calledNum, phone, 
    firstDstNum, collaData, srcType, callType) {
    console.log("seat_client.oncallinReport:" + MSIUserId.toString() + "," + callId);
}

/**
* @description 电话已接通
*/
seat_client.connectedReport = function (dataArray) {
    if (seat_client.callInfo.callId == dataArray[2]) {
        if (seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallState_Conf_Alting) {
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Conf_OK);// 会通话中
        }
        else {
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
        }
        if (seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.InCome) {
            seat_client.onconnectedReport(dataArray[1], dataArray[2], dataArray[3], dataArray[4],seat_client.callInfo.nCallType);
        }
        else if (seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.OutCall) {
            seat_client.onconnectedReport(dataArray[1], dataArray[2], dataArray[3], dataArray[4],seat_client.callInfo.nCallType);
        }
    }
    else {
        console.log("warnning:seat_client.connectedReport seat_client.callInfo.callId=", seat_client.callInfo.callId);
    }
}
/**
 * @description 呼叫已经连接
 * @param {int} MSIUserId 座席ID 
 */
seat_client.onconnectedReport = function (MSIUserId, callId, nResult, srcType, callType) {
    console.log("seat_client.onconnectedReport:" + MSIUserId.toString() + "," + callId);
}

/**
* @description 链路空闲到
*/
seat_client.idleresp = function (dataArray) {
    console.log("COMM_MSGHEAD_CONSTANTS.IDLERESP Receive");
}
/**
* @description 签出相应
*/
seat_client.checkoutResp = function (dataArray) {
    if (dataArray[2] == 1) {
        seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginOut);
        seat_client.oncheckoutResp(dataArray[1], dataArray[2]);
    }
}
/**
* @description 设置座席状态响应
*/
seat_client.setmsistateResp = function (dataArray) {
    if (dataArray[2] == 1) {
        seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginIn);
        seat_client.sendneedcall(seat_client.msiUser.msiUserId,seat_client.msiUser.serviceId);
    }
    seat_client.onsetmsistateResp(dataArray[1], dataArray[2]);
}
/**
* @description 收到挂机报告
*/
seat_client.hangupReport = function (dataArray) {
    if (seat_client.callInfo.callId == dataArray[2]) {
        if (seat_client.callInfo.nState != CALL_INFO_STATE_CONSTANTS.CallSate_NULL) {
            if (seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.InCome) {
                seat_client.onhangupReport(dataArray[1], dataArray[2], dataArray[3]);
            }
            else if (seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.OutCall) {
                seat_client.onhangupReport(dataArray[1], dataArray[2], dataArray[3]);
            }
            if (seat_client.msiUser.msiState == MSI_STATE_CONSTANTS.SeatState_LoginIn)//置闲
            {
                seat_client.sendsetmsistate(seat_client.msiUser.msiUserId, 0);//闲
            }
            else if (seat_client.msiUser.msiState == MSI_STATE_CONSTANTS.SeatState_LoginOut)//置忙
            {
                seat_client.sendcheckout(seat_client.msiUser.msiUserId, 0);//签出
            }
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_End);
            seat_client.initCallInfo();
            console.log("hangupreport end");
        }
    }
    else {
        console.log("warnning:seat_client.hangupReport seat_client.callInfo.callId=", seat_client.callInfo.callId);
    }
}
/**
* @description 服务队列报告
*/
seat_client.serviceReport = function (dataArray) {
    seat_client.onserviceReport(dataArray[1], dataArray[2], dataArray[3], dataArray[4]);
}

/**
* @description 得到空闲坐席列表状态响应 1154 坐席ID 数目 队列ID列表（用|分割）
*/
seat_client.getidlemsistateResp = function (dataArray) {
    seat_client.ongetidlemsistateResp(dataArray[1], dataArray[2], dataArray[3]);
}
/**
* @description 得到空闲坐席列表状态响应
* @param {int} MSIUserId 坐席ID
* @param {int} num 数目
@ @param {string} 空闲坐席列表 姓名|ID|工号|号码
*/
seat_client.ongetidlemsistateResp = function(MSIUserId,num,msiStateList){
    console.log("seat_client.ongetidlemsistateResp");
}
/**
* @description 得到通话中坐席列表状态响应 1155 坐席ID 数目 队列ID列表（用|分割）
*/
seat_client.gettalkmsistateResp = function (dataArray) {
    seat_client.ongettalkmsistateResp(dataArray[1], dataArray[2], dataArray[3]);
}
/**
* @description 得到通话中坐席列表状态响应
* @param {int} MSIUserId 坐席ID
* @param {int} num 数目
@ @param {string} 坐席列表 姓名|ID|工号
*/
seat_client.ongettalkmsistateResp = function(MSIUserId,num,msiStateList){
    console.log("seat_client.ongettalkmsistateResp");
}
/**
* @description 坐席状态监控响应 1156 坐席ID 数目 队列ID列表（用|分割）
*/
seat_client.msistatemonitorResp = function (dataArray) {
    seat_client.onmsistatemonitorResp(dataArray[1], dataArray[2], dataArray[3]);
}
/**
* @description 坐席状态监控响应
* @param {int} MSIUserId 坐席ID
* @param {int} num 数目
@ @param {string} 坐席列表 ID|工号|状态
*/
seat_client.onmsistatemonitorResp = function(MSIUserId,num,msiStateList){
    console.log("seat_client.onmsistatemonitorResp");
}

seat_client.msgMap = [
    { dataHead: COMM_MSGHEAD_CONSTANTS.LOGINRESP, procFunction: seat_client.loginResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.CALLINREPORT, procFunction: seat_client.callinReport },
    { dataHead: COMM_MSGHEAD_CONSTANTS.IDLERESP, procFunction: seat_client.idleresp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.CHECKOUTRESP, procFunction: seat_client.checkoutResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.SETMSISTATERESP, procFunction: seat_client.setmsistateResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.CONNECTEDREPORT, procFunction: seat_client.connectedReport },
    { dataHead: COMM_MSGHEAD_CONSTANTS.HANGUPCALLREPORT, procFunction: seat_client.hangupReport },
    { dataHead: COMM_MSGHEAD_CONSTANTS.SERVICEREPORT, procFunction: seat_client.serviceReport },
    { dataHead: COMM_MSGHEAD_CONSTANTS.GETIDLEMSISTATERESP, procFunction: seat_client.getidlemsistateResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.GETTALKMSISTATERESP, procFunction: seat_client.gettalkmsistateResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.MSISTATEMONITOR, procFunction: seat_client.msistatemonitorResp },
]
seat_client.msgMap.findAndProc = function (dataHead,data) {
    var bfind = false;
    var proc;
    for (var i = 0; i < this.length; i++) {
        if (this[i].dataHead == dataHead) {
            this[i].procFunction(data);
            bfind = true;
            break;
        }
    }
    return bfind;
}
seat_client.onmessage = function (evt) {
    seat_client.lastmsgtime = new Date();
    console.log("seat_client.onmessage time="+seat_client.lastmsgtime+" data=" + evt.data);
    var data = evt.data.replace(COMM_MSGHEAD_CONSTANTS.TAIL, "");
    var dataArray = data.split(COMM_MSGHEAD_CONSTANTS.SPLIT);
    var dataHead = dataArray[0];
    if (seat_client.msgMap.findAndProc(dataHead,dataArray) != true){
        console.log("seat_client.onmessage cann't process:" + dataHead);
    }
    seat_client.oncallstatechange(seat_client.callInfo.nState, seat_client.msiUser.msiState);
};

function GetDateDiff(sTime, eTime, diffType) {
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((new Date(eTime)
        - new Date(sTime)) / parseInt(divNum));
}

seat_client.onidle = function () {
    try{
    if (seat_client.comm.socket.readyState == WebSocket.OPEN) {
        seat_client.comm.ping();
        var minu = GetDateDiff(seat_client.lastmsgtime, Date(), "minute");
        if (minu >= 3 * COMM_MSGHEAD_CONSTANTS.IDLEMAX) {
            seat_client.close();
        }
        else if (minu >= COMM_MSGHEAD_CONSTANTS.IDLEMAX) {
            seat_client.sendheartbeat();
        }
    }
    else {
        if (seat_client.closeFlag == false) {
            seat_client.close(true);
        }
        seat_client.onReconnect();  //通知上层应用正在重连
        setTimeout(seat_client.connect(), 1000);
    }
    }
    catch(ex){
        console.log("seat_client.onidle error:"+ex.message);
    }
}

seat_client.connect = function () {
    console.log("seat_client.connect");
    if (seat_client.comm instanceof seat_comm_client) {
        seat_client.close();
    }
    seat_client.comm = new seat_comm_client(seat_client.server_url, seat_client.onopen,
        seat_client.onclose, seat_client.onmessage, seat_client.onerror);
    seat_client.closeFlag = false;
    seat_client.lastmsgtime = new Date();
    seat_client.interval = setInterval(seat_client.onidle, COMM_MSGHEAD_CONSTANTS.IDLEINTERVAL);
};

seat_client.send = function (data) {
    console.log("seat_client.send:" + data);
    seat_client.comm.send(data);
}

/*
* @description 主动关闭
  @para {bool} bSocketClose SOCKET是否已经关闭
*/
seat_client.close = function (bSocketClose) {
    console.log("seat_client.close");
    clearInterval(seat_client.interval);
    if (bSocketClose != true)
        seat_client.comm.close();
    seat_client.closeFlag = true;
}
/**
 * @description 呼叫状态变化
 */
seat_client.oncallstatechange = function (nCallState, nMsiState) {
    console.log("seat_client.oncallstatechange:nCallState=" + nCallState.toString() + ",nMsiState=" + nMsiState);
}
/**
* @description 连接 void SendLogin(int MSIUserId, int WorkNo, string WorkPass, int CallType, int IsIP,string IpName,int phonetype, string phone);
*/
seat_client.sendlogin = function (MSIUserId, WorkNo, WorkPass, CallType, IsIP, IpName, phonetype, phone) {
    var data = COMM_MSGHEAD_CONSTANTS.LOGIN + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT +
        WorkNo.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT + WorkPass + COMM_MSGHEAD_CONSTANTS.SPLIT + CallType.toString() +
        COMM_MSGHEAD_CONSTANTS.SPLIT + IsIP.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT + IpName + COMM_MSGHEAD_CONSTANTS.SPLIT +
        phonetype.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT + phone + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.msiUser.msiUserId = MSIUserId;
    seat_client.msiUser.workNo = WorkNo;
    seat_client.msiUser.phone = phone;
    seat_client.msiUser.phonetype = phonetype;
    seat_client.send(data);
};

/**
 * @description 登录响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果
 */
seat_client.onloginResp = function (MSIUserId, nResult) {
    console.log("seat_client.onloginResp:" + MSIUserId.toString() + "," + nResult.toString());
}


/**
 * @description 呼叫进入应答
 */
seat_client.sendcallinResp = function (MSIUserId, callId, nResult) {
    var data = COMM_MSGHEAD_CONSTANTS.CALLINRESP + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT +
        callId + COMM_MSGHEAD_CONSTANTS.SPLIT + nResult.toString() + COMM_MSGHEAD_CONSTANTS.TAIL;

    seat_client.send(data);
}
/*
* @description 发送心跳包
*/
seat_client.sendheartbeat = function () {
    var data = COMM_MSGHEAD_CONSTANTS.IDLE + " 0 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 签出
 */
seat_client.sendcheckout = function (MSIUserId, nType) {
    var data = COMM_MSGHEAD_CONSTANTS.CHECKOUT + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
        + nType.toString() + " 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 签出响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果
 */
seat_client.oncheckoutResp = function (MSIUserId, nResult) {
    console.log("seat_client.oncheckoutResp:" + MSIUserId.toString() + "," + nResult.toString());
}

/**
 * @description 设置坐席状态
 */
seat_client.sendsetmsistate = function (MSIUserId, nType) {
    var data = COMM_MSGHEAD_CONSTANTS.SETMSISTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
        + nType.toString() + " 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 设置状态响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果
 */
seat_client.onsetmsistateResp = function (MSIUserId, nResult) {
    console.log("seat_client.onsetmsistateResp:" + MSIUserId.toString() + "," + nResult.toString());
}

/**
 * @description 请求分配电话
 */
seat_client.sendneedcall = function (MSIUserId, nServiceId) {
    var data = COMM_MSGHEAD_CONSTANTS.NEEDCALL + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
        + nServiceId.toString() + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}


/**
 * @description 挂机
 */
seat_client.sendhangup = function (MSIUserId, callId) {
    var data = COMM_MSGHEAD_CONSTANTS.HANGUPCALL + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
        + callId.toString() + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 得到空闲坐席列表
 */
seat_client.sendgetidlemsistate = function (MSIUserId) {
    var data = COMM_MSGHEAD_CONSTANTS.GETIDLEMSISTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 得到通话坐席列表
 */
seat_client.sendgettalkmsistate = function (MSIUserId) {
    var data = COMM_MSGHEAD_CONSTANTS.GETTALKMSISTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 坐席状态监控
 */
seat_client.sendmsistatemonitor = function (MSIUserId) {
    var data = COMM_MSGHEAD_CONSTANTS.MSISTATEMONITOR + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + " 1 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
 * @description 队列情况报告
 */
seat_client.onserviceReport = function (MSIUserId, serviceId, nServiceNum, phoneList) {
    console.log("seat_client.onserviceReport:" + MSIUserId.toString() + "," + serviceId.toString());
}

/**
 * @description 呼叫挂断
 * @param {int} MSIUserId 座席ID 
 */
seat_client.onhangupReport = function (MSIUserId, callId, nType) {
    console.log("seat_client.onconnectedReport:" + MSIUserId.toString() + "," + callId);
}

if (typeof define === 'function' && define["amd"]) {
    define([], function () { return seat_client; });
}
else if (typeof require === "function" && typeof module === "object" && module && module["exports"]) {
    var WebSocket = require('ws');
    module.exports = seat_client;
}
else if (typeof window === "object" && typeof window.document === "object") {
    window.seat_client = seat_client;
}
else {
    global["seat_client"] = seat_client;
}