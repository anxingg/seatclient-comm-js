/**
 * @file callcenter seatclient comm with MSIServer.
 * @author anxingg <13683717560@139.com>
 */

/**
 * @class
 * @description 座席通讯客户端
 * @private
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
            console.log("socket send:"+data);
            this.socket.send(data);
        } else {
            var err = "socket send error:socket.readyState=" + this.socket.readyState;
            console.log(err);
            ob.socket.onerror(new Error(err));
            //throw err;
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

COMM_MSGHEAD_CONSTANTS.OUTCALLIDREPORT = "1160";

COMM_MSGHEAD_CONSTANTS.SINGLETRANSFERCALLNEW = "1262";

COMM_MSGHEAD_CONSTANTS.SETMSIOUTCALLORCALLSTATE = "1263";
COMM_MSGHEAD_CONSTANTS.SETMSIOUTCALLORCALLSTATERESP = "1163";

COMM_MSGHEAD_CONSTANTS.CALLKEEPORCALLBACK = "1266";
COMM_MSGHEAD_CONSTANTS.CALLKEEPORCALLBACKRESP = "1166";

COMM_MSGHEAD_CONSTANTS.SINGLETRANSFERCALL = "1264";  // 实际已经不用
COMM_MSGHEAD_CONSTANTS.TRANSFERCALL = "1264";        //实际已经不用
COMM_MSGHEAD_CONSTANTS.TRANSFERCALLRESP = "1164";

COMM_MSGHEAD_CONSTANTS.OUTCALL = "1267";
COMM_MSGHEAD_CONSTANTS.OUTCALLRESP = "1167";

COMM_MSGHEAD_CONSTANTS.THREEWAY = "1270";
COMM_MSGHEAD_CONSTANTS.THREEWAYRESP = "1170";

COMM_MSGHEAD_CONSTANTS.MONITORLISTEN = "1271";
COMM_MSGHEAD_CONSTANTS.MONITORLISTENRESP = "1171";

COMM_MSGHEAD_CONSTANTS.MONITORINSERT = "1272";
COMM_MSGHEAD_CONSTANTS.MONITORINSERTRESP = "1172";

COMM_MSGHEAD_CONSTANTS.MONITORINTERCEPT = "1273";
COMM_MSGHEAD_CONSTANTS.MONITORINTERCEPTRESP = "1173";

COMM_MSGHEAD_CONSTANTS.THREEWAYEND = "1274";
COMM_MSGHEAD_CONSTANTS.THREEWAYENDRESP = "1174";

COMM_MSGHEAD_CONSTANTS.MONITORINSERTEND = "1275";
COMM_MSGHEAD_CONSTANTS.MONITORINSERTENDRESP = "1175";

COMM_MSGHEAD_CONSTANTS.MONITORTEARDOWN = "1277";
COMM_MSGHEAD_CONSTANTS.MONITORTEARDOWNRESP = "1177";

COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHOLD = "1278";
COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHOLDRESP = "1178";

COMM_MSGHEAD_CONSTANTS.ADVICETRANSFEROUTCALL = "1279";
COMM_MSGHEAD_CONSTANTS.ADVICETRANSFEROUTCALLRESP = "1179";

COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERTRANSFER = "1280";
COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERTRANSFERRESP = "1180";

COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHANGUP = "1281";
COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHANGUPRESP = "1181";

COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEUSED = "1283";
COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEUSEDRESP = "1183";

COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEIDLE = "1284";
COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEIDLERESP = "1184";

COMM_MSGHEAD_CONSTANTS.BATCHOUTCALL = "1293";
COMM_MSGHEAD_CONSTANTS.BATCHOUTCALL_STATE_REPORT = "1149";
COMM_MSGHEAD_CONSTANTS.BATCHOUTCALL_HANGUPREQ = "1294";

COMM_MSGHEAD_CONSTANTS.IDLE = "1268";
COMM_MSGHEAD_CONSTANTS.IDLERESP = "1168";


COMM_MSGHEAD_CONSTANTS.TAIL = "#";

/** 
 * @constant 
 * @namespace
 * @description 呼叫状态常量
 */
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
/**
 * @constant 
 * @namespace
 * @description 坐席状态常量
 */
var MSI_STATE_CONSTANTS = {};
MSI_STATE_CONSTANTS.SeatState_LoginIn = 0;
MSI_STATE_CONSTANTS.SeatState_LoginOut = 1;

var CALL_TYPE_CONSTANTS = {
    Idle: 0,
    InCome: 1,
    OutCall: 2
}
var callInfo = {
    callId : "",
    phone : "",
    nState : CALL_INFO_STATE_CONSTANTS.CallSate_NULL,
    nCallType : CALL_TYPE_CONSTANTS.Idle,
    initCallInfo : function () {
        callInfo.callId = "";
        callInfo.phone = "";
        callInfo.nState = CALL_INFO_STATE_CONSTANTS.CallSate_NULL;
        callInfo.nCallType = CALL_TYPE_CONSTANTS.Idle;
    }
}
var msiUser = {
    msiPhone : "",
    msiUserId : -1,
    workNo : "",
    role : -1,
    serviceId : -1,
    msiPhoneType : -1,
    msiState : MSI_STATE_CONSTANTS.SeatState_LoginOut,
    msiBatchOutCallState : 0,  //是否是批处理外呼状态
    compyId : -1
}
/**
 * seat_client
 * @namespace seat_client
 * @description 坐席客户端
 */
var seat_client = {};

/**
 * @description 打印日志 
 */
var log = function(msg){
    console.log(new Date()+" : "+msg);
}
seat_client.log = log;

seat_client.server_url = "";
seat_client.callInfo = callInfo;
seat_client.msiUser = msiUser;

/**
 * @description 通讯连接成功 
 */
seat_client.onopen = function () {
    seat_client.log("seat_client.onopen");
};

seat_client.closeFlag = true;
/**
 * @private 
 * @description 是否SOCKET连接
 */
seat_client.isConnected = function () {
    if (this.comm.socket.readyState == WebSocket.OPEN)
        return true;
    else
        return false;
}
/**
 * @description SOCKET 关闭 
 */
seat_client.onclose = function () {
    seat_client.log("seat_client.onclose");
    seat_client.close(true);
};
/**
 * @description 出错
 */
seat_client.onerror = function (evt) {
    seat_client.log("seat_client.onerror:"+evt);
    //seat_client.close(false);
    seat_client.onidle();
};
/**
 * @description 正在重新连接
 */
seat_client.onReconnect = function () {
    seat_client.log("seat_client.onReconnect ");
}
/**
* @description 改变呼叫状态
* @private
*/
seat_client.changeCallState = function (nCallState) {
    seat_client.log("seat_client.changeCallState before="+seat_client.callInfo.nState.toString()
        +",after="+seat_client.callInfo.nState.toString())
    seat_client.callInfo.nState = nCallState;
}
/**
* @description 初始化呼叫信息
* @private
*/
seat_client.initCallInfo = function () {
    seat_client.callInfo.initCallInfo();
    seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallSate_NULL);
}

/**
* @description 修改坐席状态
* @private
*/
seat_client.changeMsiState = function (nMsiState) {
    seat_client.log("seat_client.changeMsiState ="+nMsiState);
    seat_client.msiUser.msiState = nMsiState;
}
/**
* @description 登录结果
* @private
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
* @private
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
        seat_client.oncallinReport(dataArray[1], dataArray[2], dataArray[3], dataArray[4], dataArray[5], dataArray[6],
            dataArray[7], dataArray[8], dataArray[9],seat_client.callInfo.nCallType);
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
    seat_client.log("seat_client.oncallinReport:" + MSIUserId.toString() + "," + callId);
}

/**
* @description 电话已接通
* @private
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
        seat_client.log("warnning:seat_client.connectedReport seat_client.callInfo.callId=", seat_client.callInfo.callId);
    }
}
/**
 * @description 呼叫已经连接
 * @param {int} MSIUserId 座席ID 
 * @param {string} callId 呼叫ID
 * @param {int} nResult 呼叫结果
 * @param {string} srcType 来电来源 (0新呼叫 1三方 2监听3转移4强插 5 强拆 )
 * @param {int} callType 呼叫类型 CALL_TYPE_CONSTANTS.InCome，CALL_TYPE_CONSTANTS.OutCall
 */
seat_client.onconnectedReport = function (MSIUserId, callId, nResult, srcType, callType) {
    seat_client.log("seat_client.onconnectedReport:" + MSIUserId.toString() + "," + callId);
}

/**
* @description 链路空闲到
* @private
*/
seat_client.idleresp = function (dataArray) {
    seat_client.log("COMM_MSGHEAD_CONSTANTS.IDLERESP Receive");
}
/**
* @description 签出相应
* @private
*/
seat_client.checkoutResp = function (dataArray) {
    if (dataArray[2] == 1) {
        seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginOut);
        seat_client.oncheckoutResp(dataArray[1], dataArray[2]);
    }
}
/**
* @description 设置座席状态响应
* @private
*/
seat_client.setmsistateResp = function (dataArray) {
    if (dataArray[2] == 1) {
        seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginIn);
        seat_client.sendneedcall();
    }
    seat_client.onsetmsistateResp(dataArray[1], dataArray[2]);
}
/**
* @description 收到挂机报告
* @private
*/
seat_client.hangupReport = function (dataArray) {
    if (seat_client.callInfo.callId == dataArray[2]) {
        if (seat_client.callInfo.nState != CALL_INFO_STATE_CONSTANTS.CallSate_NULL) {
            if (seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.InCome) {
                seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_End);
                seat_client.onhangupReport(dataArray[1], dataArray[2], dataArray[3]);
            }
            else if (seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.OutCall) {
                seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_End);
                seat_client.onhangupReport(dataArray[1], dataArray[2], dataArray[3]);
            }
            if (seat_client.msiUser.msiState == MSI_STATE_CONSTANTS.SeatState_LoginIn)//置闲
            {
                seat_client.sendsetmsistate(0);//闲
            }
            else if (seat_client.msiUser.msiState == MSI_STATE_CONSTANTS.SeatState_LoginOut)//置忙
            {
                seat_client.sendcheckout(0);//签出
            }
            seat_client.initCallInfo();
            seat_client.log("hangupreport end");
        }
    }
    else {
        seat_client.log("warnning:seat_client.hangupReport seat_client.callInfo.callId=", seat_client.callInfo.callId);
    }
}
/**
* @description 服务队列报告
* @private
*/
seat_client.serviceReport = function (dataArray) {
    seat_client.onserviceReport(dataArray[1], dataArray[2], dataArray[3], dataArray[4]);
}

/**
* @description 得到空闲坐席列表状态响应 1154 坐席ID 数目 队列ID列表（用|分割）
* @private
*/
seat_client.getidlemsistateResp = function (dataArray) {
	var userList = dataArray[2]+"=";
	if(dataArray[0]>0){
		var userListStr = dataArray.slice(3).join(",");
		var userListArr = userListStr.split(",");
		for(var j=0;j<userListArr.length;j++){
			userList+=userListArr[j];
		    if((j+1)%5==0){
				if(j!=userListArr.length-1){
					userList+=";";
				}
		   }else{
			   userList+=",";
		   }
		}
	}
    seat_client.ongetidlemsistateResp(dataArray[1], dataArray[2], userList);
}

/**
* @description 得到空闲坐席列表状态响应
* @param {int} MSIUserId 坐席ID
* @param {int} num 数目
* @param {string} 空闲坐席列表 姓名|ID|工号|号码
*/
seat_client.ongetidlemsistateResp = function(MSIUserId,num,msiStateList){
    seat_client.log("seat_client.ongetidlemsistateResp");
}
/**
* @description 得到通话中坐席列表状态响应 1155 坐席ID 数目 队列ID列表（用|分割）
* @private
*/
seat_client.gettalkmsistateResp = function (dataArray) {
    seat_client.ongettalkmsistateResp(dataArray[1], dataArray[2], dataArray[3]);
}
/**
* @description 得到通话中坐席列表状态响应 1154 262 2 1 杨金亭 262 1111 15838369365 1 潘博 270 6113 13783688005#
* @param {int} MSIUserId 坐席ID
* @param {int} num 数目
* @param {string} 坐席列表 队列ID列表（用|分割）姓名 坐席ID 坐席工号 手机号码 
*/
seat_client.ongettalkmsistateResp = function(MSIUserId,num,msiStateList){
    seat_client.log("seat_client.ongettalkmsistateResp");
}
/**
* @private 
* @description 坐席状态监控响应 1156 坐席ID 数目 队列ID列表（用|分割）
*/
seat_client.msistatemonitorResp = function (dataArray) {
    seat_client.onmsistatemonitorResp(dataArray[1], dataArray[2], dataArray[3]);
}
/**
* @description 坐席状态监控响应
* @param {int} MSIUserId 坐席ID
* @param {int} num 数目
* @param {string} 坐席列表 队列ID列表（用|分割）姓名 坐席ID 坐席工号 手机号码
*/
seat_client.onmsistatemonitorResp = function(MSIUserId,num,msiStateList){
    seat_client.log("seat_client.onmsistatemonitorResp");
}

/**
* @description 1160 坐席ID 呼叫ID  （外呼过程中，坐席接通后告诉客户端此次呼叫ID 便于维护）
* @private
*/
seat_client.outcallidreport = function (dataArray) {
    if(seat_client.msiUser.msiUserId==dataArray[1]){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_OutCall_Beging);
        seat_client.callInfo.callId = dataArray[2];
    }
}

/**
* @description 1166 坐席ID 呼叫ID 1/2（保持/恢复） 1/0（成功/失败）
* @private
*/
seat_client.callkeeporcallbackResp = function (dataArray) {
    if(dataArray[4] == 1){
        if(dataArray[3]==1)
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Hold);
        else
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
    
    }
    seat_client.oncallkeeporcallbackResp(dataArray[1],dataArray[2],dataArray[3],dataArray[4])
}

/**
* @description 电话保持/恢复响应
* @param {int} MSIUserId 坐席ID
* @param {string} callId 呼叫ID
* @param {int} nType 类型 1/2（保持/恢复）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.oncallkeeporcallbackResp = function(MSIUserId,callId,nType,nResult){
    seat_client.log("seat_client.onmsistatemonitorResp");
}

/**
* @description 座席请求设置坐席状态成功与否 1163 坐席ID  1/0（1：成功，0：失败）
* @private
*/
seat_client.setmsioutcallorcallstateResp = function (dataArray) {
    if(dataArray[2] == 1){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_OutCall_StateReq);
    }
    seat_client.onsetmsioutcallorcallstateResp(dataArray[1],dataArray[2])
}

/**
* @description 座席请求设置坐席状态成功与否
* @param {int} MSIUserId 坐席ID
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onsetmsioutcallorcallstateResp = function(MSIUserId,nResult){
    seat_client.log("seat_client.onsetmsioutcallorcallstateResp");
}

/**
* @description 1167 外呼电话结果
     1167 坐席ID 呼叫ID 呼叫结果 原因
* @private
*/
seat_client.outcallResp = function (dataArray) {
    if(dataArray[3] == 1){
        seat_client.callInfo.callId = dataArray[2];
        seat_client.callInfo.nCallType = CALL_TYPE_CONSTANTS.OutCall;
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
        seat_client.onconnectedReport(dataArray[1],dataArray[2], 1, 0, CALL_TYPE_CONSTANTS.OutCall) 
    }
    else{
        if(seat_client.msiUser.msiBatchOutCallState==0)  //当不是批处理外呼时候
            seat_client.initCallInfo();
    }
    seat_client.onoutcallResp(dataArray[1],dataArray[2],dataArray[3],dataArray[4]);
}

/**
* @description 1167 外呼电话结果
     1167 坐席ID 呼叫ID 呼叫结果 原因
    呼叫结果：0呼叫失败，1呼叫成功
    原因：呼叫失败的原因，目前为0
* @param {int} MSIUserId 坐席ID
* @param {string} callId 呼叫ID
* @param {int} nResult 1/0（成功/失败）
* @param {string} reanson 原因值
*/
seat_client.onoutcallResp = function(MSIUserId,callId,nResult,reason){
    seat_client.log("seat_client.onoutcallResp");
}

/**
* @description 1164 转接成功/失败
    1164 坐席ID 呼叫ID 1/0（转接成功/失败）
    转接成功，坐席处理相当于挂断。
* @private
*/
seat_client.transfercallResp = function (dataArray) {
    if(dataArray[3] == 1){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Single_OK);
        seat_client.ontransfercallResp(dataArray[1],dataArray[2],dataArray[3],dataArray[4]);
        saat_client.hangupReport([COMM_MSGHEAD_CONSTANTS.HANGUPCALLREPORT,dataArray[1],dataArray[2],'2']);
    }
    else{
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Conf_Filed);
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
        seat_client.ontransfercallResp(dataArray[1],dataArray[2],dataArray[3],dataArray[4]);
    }
}

/**
* @description 1167 外呼电话结果
     1167 坐席ID 呼叫ID 呼叫结果 原因
    呼叫结果：0呼叫失败，1呼叫成功
    原因：呼叫失败的原因，目前为0
* @param {int} MSIUserId 坐席ID
* @param {string} callId 呼叫ID
* @param {int} nResult 1/0（成功/失败）
* @param {string} reanson 原因值
*/
seat_client.ontransfercallResp = function(MSIUserId,callId,nResult,reason){
    seat_client.log("seat_client.onoutcallResp");
}

/**
* @description 1178 咨询转移保持/接回（1/2）  咨询转移响应
    质询转接保持请求的响应
* @private
*/
seat_client.advicetransferholdResp = function (dataArray) {
    if(dataArray[1] == 1){ //保持
        if(dataArray[2] ==1){
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Hold);
        }
    }
    else{
        if(dataArray[2] ==1){
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
        }
    }
    seat_client.onadvicetransferholdResp(dataArray[1],dataArray[2]);
}

/**
* @description 1178 咨询转移保持/接回（1/2） 咨询转移响应
    质询转接保持请求的响应
* @param {int} nType 咨询转移保持/接回（1/2）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onadvicetransferholdResp = function(nType,nResult){
    seat_client.log("seat_client.onadvicetransferholdResp");
}

/**
* @description 1179 成功/失败 （1/0）
    质询转接保持请求的响应
* @private
*/
seat_client.advicetransferoutcallResp = function (dataArray) {
    if(dataArray[1] ==1){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Transfer_Begin);
    }
    else
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Hold);
    seat_client.onadvicetransferoutcallResp(dataArray[1]);
}

/**
* @description 1179 成功/失败 （1/0）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onadvicetransferoutcallResp = function(nResult){
    seat_client.log("seat_client.onadvicetransferoutcallResp");
}

/**
* @description 1181 坐席ID 呼叫ID 咨询转移挂断响应
*  1181 类型 1 第一个  2 第二个  3 源坐席挂断
* @private
*/
seat_client.advicetransferhangupResp = function (dataArray) {
    if(dataArray[1] ==1){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
    }
    else if(dataArray[1] ==2){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Hold);
    }
    seat_client.onadvicetransferhangupResp(dataArray[1]);
}

/**
* @description 1181 类型 1 第一个  2 第二个  3 源坐席挂断
* @param {int} nSrc 类型 1 第一个  2 第二个  3 源坐席挂断
*/
seat_client.onadvicetransferhangupResp = function(nSrc){
    seat_client.log("seat_client.onadvicetransferhangupResp");
}

/**
* @description 1171 监听成功/失败
* 1171 坐席ID 呼叫ID 1/0（监听成功/失败）
* @private
*/
seat_client.monitorlistenResp = function (dataArray) {
    if( seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallState_Connect ){
       if(dataArray[3] ==0){
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Monitor_Filed);
        }
        else {
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Monitor_OK);
        } 
        seat_client.onmonitorlistenResp(dataArray[3]);
    }
    else{
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Monitor_Filed);
        seat_client.onmonitorlistenResp(0);
    }
}

/**
* @description 1171 监听成功/失败
* 1171 坐席ID 呼叫ID 1/0（监听成功/失败）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onmonitorlistenResp = function(nResult){
    seat_client.log("seat_client.onmonitorlistenResp");
}

/**
* @description 1172 强插成功/失败
* 1172 坐席ID 呼叫ID 1/0（成功/失败）
* @private
*/
seat_client.monitorinsertResp = function (dataArray) {
    if( seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallState_Connect ){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Entry_OK);
    }
    else{
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Entry_Filed);
    }
    seat_client.onmonitorinsertResp(dataArray[3]);
}

/**
* @description 1172 强插成功/失败
* 1172 坐席ID 呼叫ID 1/0（成功/失败）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onmonitorinsertResp = function(nResult){
    seat_client.log("seat_client.onmonitorinsertResp");
}

/**
* @description 1173 拦截成功/失败
* 1173 坐席ID 呼叫ID 1/0（成功/失败）
* @private
*/
seat_client.monitorinterceptResp = function (dataArray) {
    if( seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallState_Connect ){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Demolished_OK);
    }
    else{
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Demolished_Filed);
    }
    seat_client.onmonitorinterceptResp(dataArray[3]);
}

/**
* @description 1173 拦截成功/失败
* 1173 坐席ID 呼叫ID 1/0（成功/失败）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onmonitorinterceptResp = function(nResult){
    seat_client.log("seat_client.onmonitorinterceptResp");
}

/**
* @description 1177 强拆成功/失败
* 1177 坐席ID 呼叫ID 1/0（成功/失败）
* @private
*/
seat_client.monitorteardownResp = function (dataArray) {
    seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Demolished_OK);
    seat_client.onmonitorteardownResp(dataArray[3]);
}

/**
* @description 1177 强拆成功/失败
* 1177 坐席ID 呼叫ID 1/0（成功/失败）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onmonitorteardownResp = function(nResult){
    seat_client.log("seat_client.onmonitorteardownResp");
}

/**
* @description 1175 强拆结束
* 1175 坐席ID 呼叫ID 原因1/0 （自己挂断/其他）
* @private
*/
seat_client.monitorinsertendResp = function (dataArray) {
    if( seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallState_Demolished_OK ){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
        seat_client.onmonitorinsertendResp(dataArray[3]);
    }
}

/**
* @description 1175 强拆结束
* 1175 坐席ID 呼叫ID 原因1/0 （自己挂断/其他）
* @param {int} nReason 原因1/0 （自己挂断/其他）
*/
seat_client.onmonitorinsertendResp = function(nReason){
    seat_client.log("seat_client.onmonitorinsertendResp");
}

/**
* @description 1170 通话成功/失败
* 1170 坐席ID 呼叫ID 1/0（通话成功/失败）
* @private
*/
seat_client.threewayResp = function (dataArray) {
    if(dataArray[3] == 1){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Conf_OK);
    }
    else{
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
    }
    seat_client.onthreewayResp(dataArray[3]);
}

/**
* @description 1170 通话成功/失败
* 1170 坐席ID 呼叫ID 1/0（通话成功/失败）
* @param {int} nResult 1/0（成功/失败）
*/
seat_client.onthreewayResp = function(nResult){
    seat_client.log("seat_client.onthreewayendResp");
}

/**
* @description 1174 三方结束
* 1174 坐席ID 呼叫ID 原因1/0 （自己挂断/其他）
* @private
*/
seat_client.threewayendResp = function (dataArray) {
    seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
    seat_client.onthreewayendResp(dataArray[3]);
    
}

/**
* @description 1175 三方结束
* 1174 坐席ID 呼叫ID 原因1/0 （自己挂断/其他）
* @param {int} nReason 原因1/0 （自己挂断/其他）
*/
seat_client.onthreewayendResp = function(nReason){
    seat_client.log("seat_client.onthreewayendResp");
}

/**
* @description 1149 批量外呼状态
* 1149 坐席ID 呼叫ID  状态（0：开始呼叫 1：振铃 2:接通 3:挂断） 对象（1：坐席2：客户）
* @private
*/
seat_client.batchoutcall_state_report = function (dataArray) {
    if(dataArray[4]==1){
        if(seat_client.callInfo.callId.length==0){
            seat_client.callInfo.callId = dataArray[2];
            seat_client.callInfo.nCallType = CALL_TYPE_CONSTANTS.OutCall;
        }
        if(dataArray[3]==0){
            seat_client.msiUser.msiBatchOutCallState=1;
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_OutCall_Beging);
        }
        else if(dataArray[3]==1){
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_OutCall_Alerting);
        }
        else if(dataArray[3]==2){
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Connect);
        }
        else if(dataArray[3]==3){
            seat_client.msiUser.msiBatchOutCallState=0;
            seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallSate_NULL);
        }
    }
    seat_client.onbatchoutcall_state_report(dataArray[3],dataArray[4]);
}

/**
* @description 1175 三方结束
* 1149 坐席ID 呼叫ID  状态（0：开始呼叫 1：振铃 3:挂断） 对象（1：坐席2：客户）
* @param {int} nState 状态（0：开始呼叫 1：振铃 3:挂断）
* @param {int} nTarget 对象（1：坐席2：客户）
*/
seat_client.onbatchoutcall_state_report = function(nState,nTarget){
    seat_client.log("seat_client.onbatchoutcall_state_report");
}

/**
* @description 1183 指定坐席置忙
* 1183 坐席ID
*/
seat_client.controlmsistateusedResp = function (dataArray) {
    seat_client.oncontrolmsistateResp(2);
}

/**
* @description 1184 指定坐席置闲
* 1184 坐席ID
*/
seat_client.controlmsistateidleResp = function (dataArray) {
    seat_client.oncontrolmsistateResp(1);
}

/**
* @description 控制闲忙状态返回
* @param {int} nType 1：闲，2：忙
*/
seat_client.oncontrolmsistateResp = function(nType){
    seat_client.log("seat_client.oncontrolmsistate："+nType);
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
    { dataHead: COMM_MSGHEAD_CONSTANTS.OUTCALLIDREPORT, procFunction: seat_client.outcallidreport },
    { dataHead: COMM_MSGHEAD_CONSTANTS.CALLKEEPORCALLBACKRESP, procFunction: seat_client.callkeeporcallbackResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.SETMSIOUTCALLORCALLSTATERESP, procFunction: seat_client.setmsioutcallorcallstateResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.OUTCALLRESP, procFunction: seat_client.outcallResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.TRANSFERCALLRESP, procFunction: seat_client.transfercallResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHOLDRESP, procFunction: seat_client.advicetransferholdResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.ADVICETRANSFEROUTCALLRESP, procFunction: seat_client.advicetransferoutcallResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHANGUPRESP, procFunction: seat_client.advicetransferhangupResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.THREEWAYRESP, procFunction: seat_client.threewayResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.THREEWAYENDRESP, procFunction: seat_client.threewayendResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.MONITORLISTENRESP, procFunction: seat_client.monitorlistenResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.MONITORINSERTRESP, procFunction: seat_client.monitorinsertResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.MONITORINTERCEPTRESP, procFunction: seat_client.monitorinterceptResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.MONITORTEARDOWNRESP, procFunction: seat_client.monitorteardownResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.MONITORINSERTENDRESP, procFunction: seat_client.monitorinsertendsResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.BATCHOUTCALL_STATE_REPORT, procFunction: seat_client.batchoutcall_state_report },
    { dataHead: COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEUSEDRESP, procFunction: seat_client.controlmsistateusedResp },
    { dataHead: COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEIDLERESP, procFunction: seat_client.controlmsistateidleResp },
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
/**
 * @pvivate
 */
seat_client.onmessage = function (evt) {
    seat_client.lastmsgtime = new Date();
    seat_client.log("seat_client.onmessage data=" + evt.data);
    var data = evt.data.replace(COMM_MSGHEAD_CONSTANTS.TAIL, "");
    var dataArray = data.split(COMM_MSGHEAD_CONSTANTS.SPLIT);
    var dataHead = dataArray[0];
    if (seat_client.msgMap.findAndProc(dataHead,dataArray) != true){
        seat_client.log("seat_client.onmessage cann't process:" + dataHead);
    }
    seat_client.callstatechange();
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

/**
 * @private
 */
seat_client.onidle = function () {
    try{
    if (seat_client.comm.socket.readyState == WebSocket.OPEN) {
        //seat_client.comm.ping();
        var minu = GetDateDiff(seat_client.lastmsgtime, Date(), "minute");
        if (minu >= 3 * COMM_MSGHEAD_CONSTANTS.IDLEMAX) {
            seat_client.close(false);
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
        seat_client.log("seat_client.onidle error:"+ex.message);
    }
}
/**
* @description 连接服务
* 
*/
seat_client.connect = function () {
    seat_client.log("seat_client.connect");
    if (seat_client.comm instanceof seat_comm_client) {
        seat_client.close(false);
    }
    seat_client.comm = new seat_comm_client(seat_client.server_url, seat_client.onopen,
        seat_client.onclose, seat_client.onmessage, seat_client.onerror);
    seat_client.closeFlag = false;
    seat_client.lastmsgtime = new Date();
    seat_client.interval = setInterval(seat_client.onidle, COMM_MSGHEAD_CONSTANTS.IDLEINTERVAL);
};

/**
* @description 连接服务
* @private
*/
seat_client.send = function (data) {
    seat_client.log("seat_client.send:" + data);
    seat_client.comm.send(data);
}

/**
* @private
* @description 主动关闭
  @para {bool} bSocketClose SOCKET是否已经关闭
*/
seat_client.close = function (bSocketClose) {
    seat_client.log("seat_client.close:bSocketClose="+bSocketClose);
    clearInterval(seat_client.interval);
    if (bSocketClose != true)
        seat_client.comm.close();
    seat_client.closeFlag = true;
}
seat_client.callstatechange = function () {
    seat_client.log("seat_client.callstatechange:nCallState=" + seat_client.callInfo.nState.toString()
         + ",nMsiState=" + seat_client.msiUser.msiState.toString());
    seat_client.oncallstatechange(seat_client.callInfo.nState, seat_client.msiUser.msiState);
}
/**
 * @description 呼叫状态变化
 */
seat_client.oncallstatechange = function (nCallState, nMsiState) {
    seat_client.log("seat_client.oncallstatechange:nCallState=" + nCallState.toString() + ",nMsiState=" + nMsiState);
}
/**
* @description 连接 void SendLogin(int MSIUserId, int WorkNo, string WorkPass, int CallType, int IsIP,string IpName,
    int phonetype, string phone);
  @param {int} MSIUserId 坐席ID
  @param {int} WorkNo 工号
  @param {string} WorkPass 密码
  @param {int} CallType 1/2（呼入/呼出）
  @param {int} IsIP 是否IP坐席（1/0）
  @param {string} IpName IP名
  @param {int} phonetype 座席号码类型（0：内线电话 1：手机电话2：IP电话）
  @param {string} phone 座席登录号码
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
 * @param {int} nResult 登录结果 1/0（成功失败）
 */
seat_client.onloginResp = function (MSIUserId, nResult) {
    seat_client.log("seat_client.onloginResp:" + MSIUserId.toString() + "," + nResult.toString());
}


/**
 * @description 呼叫进入应答
 * @param {int} nResult 1 应答; 0 拒绝
 */
seat_client.sendcallinResp = function (nResult) {
    var MSIUserId = seat_client.msiUser.msiUserId;
    var callId = seat_client.callInfo.callId;
    var data = COMM_MSGHEAD_CONSTANTS.CALLINRESP + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT +
        callId + COMM_MSGHEAD_CONSTANTS.SPLIT + nResult.toString() + COMM_MSGHEAD_CONSTANTS.TAIL;

    seat_client.send(data);
}
/**
* @private
* @description 发送心跳包
*/
seat_client.sendheartbeat = function () {
    var data = COMM_MSGHEAD_CONSTANTS.IDLE + " 0 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}

/**
* @description 签出 
* @param {int} nType 0表示签出
*/
seat_client.sendcheckout = function (nType) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    //seat_client.msiUser.msiState == MSI_STATE_CONSTANTS.SeatState_LoginIn,这个判断不做了，由于可能状态不一致
    if(true){
        if((seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallSate_NULL)||
            (seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallState_End)){
            var data = COMM_MSGHEAD_CONSTANTS.CHECKOUT + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
                + nType.toString() + " 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
            seat_client.send(data);
            bRet = true;
        }
        else{
            seat_client.changeMsiState(MSI_STATE_CONSTANTS.SeatState_LoginOut);
        }
    }
    return bRet;
}

/**
 * @description 签出响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果 (1：成功，0：失败)
 */
seat_client.oncheckoutResp = function (MSIUserId, nResult) {
    seat_client.log("seat_client.oncheckoutResp:" + MSIUserId.toString() + "," + nResult.toString());
}

/**
 * @description 设置坐席状态 （0：闲）
 */
seat_client.sendsetmsistate = function (nType) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    if(seat_client.msiUser.msiState == MSI_STATE_CONSTANTS.SeatState_LoginOut)  
    {
        if(seat_client.callInfo.nState == CALL_INFO_STATE_CONSTANTS.CallSate_NULL){
            var data = COMM_MSGHEAD_CONSTANTS.SETMSISTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
                + nType.toString() + " 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
            seat_client.send(data);
            bRet = true;
        }
    }
    return bRet;
}

/**
 * @description 设置状态响应
 * @param {int} MSIUserId 座席ID 
 * @param {int} nResult 登录结果 (1：成功，0：失败)
 */
seat_client.onsetmsistateResp = function (MSIUserId, nResult) {
    seat_client.log("seat_client.onsetmsistateResp:" + MSIUserId.toString() + "," + nResult.toString());
}

/**
 * @description 请求分配电话
 */
seat_client.sendneedcall = function () {
    var MSIUserId = seat_client.msiUser.msiUserId;
    var data = COMM_MSGHEAD_CONSTANTS.NEEDCALL + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
        + "-1" + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
}


/**
 * @description 挂机
 */
seat_client.sendhangup = function () {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    var callId = seat_client.callInfo.callId;
    if(seat_client.callInfo.callId.length > 0){
        var data = COMM_MSGHEAD_CONSTANTS.HANGUPCALL + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
            + callId.toString() + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 得到空闲坐席列表
 */
seat_client.sendgetidlemsistate = function () {
    var MSIUserId = seat_client.msiUser.msiUserId;
    var data = COMM_MSGHEAD_CONSTANTS.GETIDLEMSISTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    return true;
}

/**
 * @description 得到通话坐席列表
 */
seat_client.sendgettalkmsistate = function () {
    var MSIUserId = seat_client.msiUser.msiUserId;
    var data = COMM_MSGHEAD_CONSTANTS.GETTALKMSISTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + " 0 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    return true;
}

/**
 * @description 坐席状态监控
 */
seat_client.sendmsistatemonitor = function () {
    var MSIUserId = seat_client.msiUser.msiUserId;
    var data = COMM_MSGHEAD_CONSTANTS.MSISTATEMONITOR + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + " 1 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    return true;
}

/**
 * @description 发送电话保持/恢复 1266 坐席ID 呼叫ID 1/2（保持/恢复）
 * @param {int}  1/2（保持/恢复）
 */
seat_client.sendcallkeeporcallback = function (nType) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    var callId = seat_client.callInfo.callId;
    if(seat_client.callInfo.callId.length > 0){
        var data = COMM_MSGHEAD_CONSTANTS.CALLKEEPORCALLBACK + COMM_MSGHEAD_CONSTANTS.SPLIT
             + MSIUserId.toString() +COMM_MSGHEAD_CONSTANTS.SPLIT+callId
            + COMM_MSGHEAD_CONSTANTS.SPLIT+nType.toString() + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 请求设置坐席外呼状态 1263 坐席ID  1/2（呼入/呼出）
 * @param {int} nType 1/2（呼入/呼出）
 */
seat_client.sendmsioutcallorcallstate = function (nType) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    var data = COMM_MSGHEAD_CONSTANTS.SETMSIOUTCALLORCALLSTATE + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + COMM_MSGHEAD_CONSTANTS.SPLIT+nType.toString() + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    bRet = true;
    return bRet;
}

/**
 * @description 请求设置坐席外呼状态 1267 坐席ID 外呼号码 显示号码
 * @param {string} phone 外呼号码 
 * @param {string} showNum 显示号码 
 */
seat_client.sendoutcall = function (phone,showNum) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    seat_client.callInfo.phone = phone;
    var data = COMM_MSGHEAD_CONSTANTS.OUTCALL + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + COMM_MSGHEAD_CONSTANTS.SPLIT+ phone + COMM_MSGHEAD_CONSTANTS.SPLIT+showNum + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    bRet = true;
    return bRet;
}
/**
 * @private 废弃的函数
 * @description 1264 请求转接其他坐席 1264 坐席ID 呼叫ID 目标坐席ID 转接类型（0/1转接外线/转接内部座席）转接外线号码
 * @param {bool} bSing 是否单步 
 * @param {int} nType 0 转接外线;1 转接内部座席
 * @param {string} target  外线号码或目标坐席ID
 */
seat_client.sendtransfercall = function (bSingle,nType,target) {
    var bRet = false;
    if((seat_client.callInfo.callId.length > 0) && (seat_client.callInfo.nState==CALL_INFO_STATE_CONSTANTS.CallState_Connect)){
        var MSIUserId = seat_client.msiUser.msiUserId;
        var callId = seat_client.callInfo.callId;
        var head = COMM_MSGHEAD_CONSTANTS.TRANSFERCALL;
        if(bSingle==true){
            head = COMM_MSGHEAD_CONSTANTS.SINGLETRANSFERCALL;
        }
        var targetMsiId = "0";
        var targetPhone = "0";
        if(nType==0){
            targetPhone = target; 
        }
        else {
            targetMsiId = target;
        }
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
            + COMM_MSGHEAD_CONSTANTS.SPLIT+callId + COMM_MSGHEAD_CONSTANTS.SPLIT
            + targetMsiId + COMM_MSGHEAD_CONSTANTS.SPLIT+
            nType.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT+targetPhone + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}
/**
 * @description 1262 坐席ID 呼叫ID 目标坐席ID 转接类型（0/1转接外线/转接内部座席）转接外线号码
 * @param {int} nType 0 转接外线;1 转接内部座席
 * @param {string} target  外线号码或目标坐席ID
 */
seat_client.sendsinglesteptransfercall = function (nType,target){
    var bRet = false;
    if((seat_client.callInfo.callId.length > 0) && (seat_client.callInfo.nState==CALL_INFO_STATE_CONSTANTS.CallState_Connect)){
        var MSIUserId = seat_client.msiUser.msiUserId;
        var callId = seat_client.callInfo.callId;
        var head = COMM_MSGHEAD_CONSTANTS.SINGLETRANSFERCALLNEW;
        var targetMsiId = "0";
        var targetPhone = "0";
        if(nType==0){
            targetPhone = target; 
        }
        else {
            targetMsiId = target;
        }
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Single_Begin);
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
            + COMM_MSGHEAD_CONSTANTS.SPLIT+callId + COMM_MSGHEAD_CONSTANTS.SPLIT
            + targetMsiId + COMM_MSGHEAD_CONSTANTS.SPLIT+
            nType.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT+targetPhone + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}
/**
 * @description 1278 呼叫ID 咨询转移保持/接回 （1/2）
 * @param {int} nType 咨询转移保持/接回
 */
seat_client.sendadvicetransferhold = function (nType) {
    var bRet = false;
    var callId = seat_client.callInfo.callId;
    var data = COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHOLD + COMM_MSGHEAD_CONSTANTS.SPLIT + callId
        + COMM_MSGHEAD_CONSTANTS.SPLIT + nType.toString() + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    bRet = true;
    return bRet;
}

/**
 * @description 1279 呼叫ID 类型（0/1 内线 外线） 号码（坐席ID/外线号码） 源坐席ID
 * @param {int} nType 0 转接外线;1 转接内部座席
 * @param {string} target  外线号码或目标坐席ID
 */
seat_client.sendadvicetransferoutcall = function (nType,target){
    var bRet = false;
    if((seat_client.callInfo.callId.length > 0) && (seat_client.callInfo.nState==CALL_INFO_STATE_CONSTANTS.CallState_Hold)){
        var MSIUserId = seat_client.msiUser.msiUserId;
        var callId = seat_client.callInfo.callId;
        var head = COMM_MSGHEAD_CONSTANTS.ADVICETRANSFEROUTCALL;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + callId 
            + COMM_MSGHEAD_CONSTANTS.SPLIT+nType.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
            + target + COMM_MSGHEAD_CONSTANTS.SPLIT+MSIUserId.toString()+ COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1280 呼叫ID
 */
seat_client.sendadvicetransfertransfer = function (){
    var bRet = false;
    if(seat_client.callInfo.callId.length > 0){
        var callId = seat_client.callInfo.callId;
        var head = COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERTRANSFER;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + callId 
            + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1281 坐席端ID 咨询转移挂断目标用户 
 * 1281 呼叫ID
 */
seat_client.sendadvicetransferhangup = function (){
    var bRet = false;
    if(seat_client.callInfo.callId.length > 0){
        var callId = seat_client.callInfo.callId;
        var head = COMM_MSGHEAD_CONSTANTS.ADVICETRANSFERHANGUP;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + callId 
            + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1271 班长坐席监听
 * 1271 坐席ID 目标坐席ID
 * @param {int} nTargetMSIUserId 目标坐席ID
 */
seat_client.sendmonitorlinsen = function (nTargetMSIUserId){
    var bRet = false;
    seat_client.log("seat_client.callInfo.nCallType="+seat_client.callInfo.nCallType);
    if((seat_client.callInfo.nCallType == CALL_TYPE_CONSTANTS.Idle) && (seat_client.msiUser.msiUserId != nTargetMSIUserId)){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Monitor_Begin);
        var head = COMM_MSGHEAD_CONSTANTS.MONITORLISTEN;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + seat_client.msiUser.msiUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.SPLIT + nTargetMSIUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1272 班长坐席强插
 * 1272 坐席ID 目标坐席ID
 * @param {int} nTargetMSIUserId 目标坐席ID
 */
seat_client.sendmonitorinsert = function (nTargetMSIUserId){
    var bRet = false;
    if((seat_client.msiUser.msiUserId != nTargetMSIUserId)
        && (seat_client.callInfo.nState==CALL_INFO_STATE_CONSTANTS.CallState_Monitor_OK)){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Entry_Beging);
        var head = COMM_MSGHEAD_CONSTANTS.MONITORINSERT;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + seat_client.msiUser.msiUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.SPLIT + nTargetMSIUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1273 班长坐席拦截
 * 1273 坐席ID 目标坐席ID
 * @param {int} nTargetMSIUserId 目标坐席ID
 */
seat_client.sendmonitorintercept = function (nTargetMSIUserId){
    var bRet = false;
    if((seat_client.msiUser.msiUserId != nTargetMSIUserId)
        && (seat_client.callInfo.nState==CALL_INFO_STATE_CONSTANTS.CallState_Monitor_OK)){
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Monitor_Begin);
        var head = COMM_MSGHEAD_CONSTANTS.MONITORINTERCEPT;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + seat_client.msiUser.msiUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.SPLIT + nTargetMSIUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1277 班长坐席强拆
 * 1277 坐席ID 单位ID 目标坐席ID 
 * @param {int} nCompanyId 单位ID
 * @param {int} nTargetMSIUserId 目标坐席ID
 */
seat_client.sendmonitorteardown = function (nCompanyId,nTargetMSIUserId){
    var bRet = false;
    if((seat_client.msiUser.msiUserId != nTargetMSIUserId)){
        var head = COMM_MSGHEAD_CONSTANTS.MONITORTEARDOWN;
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + seat_client.msiUser.msiUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.SPLIT + nCompanyId.toString()
            + COMM_MSGHEAD_CONSTANTS.SPLIT + nTargetMSIUserId.toString()
            + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1270 请求三方通话
 * 1270 坐席ID 呼叫ID 目标坐席ID 转接类型（1/0 转接内部座席/转接外线）转接外线号码，工单ID
 * @param {int} nType 0 转接外线;1 转接内部座席
 * @param {string} target  外线号码或目标坐席ID
 */
seat_client.sendthreeway = function (nType,target){
    var bRet = false;
    if((seat_client.callInfo.callId.length > 0) && (seat_client.callInfo.nState==CALL_INFO_STATE_CONSTANTS.CallState_Connect)){
        var MSIUserId = seat_client.msiUser.msiUserId;
        var callId = seat_client.callInfo.callId;
        var head = COMM_MSGHEAD_CONSTANTS.THREEWAY;
        var targetMsiId = "0";
        var targetPhone = "0";
        if(nType==0){
            targetPhone = target; 
        }
        else {
            targetMsiId = target;
        }
        seat_client.changeCallState(CALL_INFO_STATE_CONSTANTS.CallState_Conf_Begin);
        var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
            + COMM_MSGHEAD_CONSTANTS.SPLIT+callId + COMM_MSGHEAD_CONSTANTS.SPLIT
            + targetMsiId + COMM_MSGHEAD_CONSTANTS.SPLIT+
            nType.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT+targetPhone +
             COMM_MSGHEAD_CONSTANTS.SPLIT+"0"+ COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 1292 外呼电话 
 * 1292 坐席ID 外呼号码 显示号码
 * 显示号码应该传热线号码
 * @param {string} phone 外呼号码 
 * @param {string} showNum 显示号码 
 */
seat_client.sendbatchoutcall = function (phone,showNum) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    seat_client.callInfo.phone = phone;
    var data = COMM_MSGHEAD_CONSTANTS.BATCHOUTCALL + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() 
        + COMM_MSGHEAD_CONSTANTS.SPLIT+ phone + COMM_MSGHEAD_CONSTANTS.SPLIT+showNum + COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    bRet = true;
    return bRet;
}

/**
 * @description 批量外呼挂机
 * 1291 坐席ID 呼叫ID  挂断类型（1：坐席挂断 2：客户挂断）
 * @param {int} type 挂断类型（1：坐席挂断 2：客户挂断）
 */
seat_client.sendbatchhangup = function (type) {
    var bRet = false;
    var MSIUserId = seat_client.msiUser.msiUserId;
    var callId = seat_client.callInfo.callId;
    if(seat_client.callInfo.callId.length > 0){
        var data = COMM_MSGHEAD_CONSTANTS.BATCHOUTCALL_HANGUPREQ + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT
            + callId.toString() + COMM_MSGHEAD_CONSTANTS.SPLIT+type.toString()+" 0" + COMM_MSGHEAD_CONSTANTS.TAIL;
        seat_client.send(data);
        bRet = true;
    }
    return bRet;
}

/**
 * @description 队列情况报告
 * @param {int} MSIUserId 坐席ID
 * @param {int} serviceId 队列ID
 * @param {int} nServiceNum 排队数
 * @param {string} phoneList 号码列表,以|分割
 */
seat_client.onserviceReport = function (MSIUserId, serviceId, nServiceNum, phoneList) {
    seat_client.log("seat_client.onserviceReport:" + MSIUserId.toString() + "," + serviceId.toString());
}

/**
 * @description 设置坐席忙闲状态
 * @param {int} MSIUserId 坐席ID
 * @param {int} nType 1：闲，2：忙
 */
seat_client.sendcontrolsetmsistate = function (MSIUserId,nType) {
    var bRet = false;
    var head;
    if(nType == 1)
        head = COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEIDLE;
    else
        head = COMM_MSGHEAD_CONSTANTS.CONTROLMSISTATEUSED;
    var data = head + COMM_MSGHEAD_CONSTANTS.SPLIT + MSIUserId
        + COMM_MSGHEAD_CONSTANTS.SPLIT + "0 0"+ COMM_MSGHEAD_CONSTANTS.TAIL;
    seat_client.send(data);
    bRet = true;
    return bRet;
}


/**
 * @description 呼叫挂断
 * @param {int} MSIUserId 座席ID 
 */
seat_client.onhangupReport = function (MSIUserId, callId, nType) {
    seat_client.log("seat_client.onhangupReport:" + MSIUserId.toString() + "," + callId);
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