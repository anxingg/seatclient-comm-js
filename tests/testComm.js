/*
主要的测试程序，测试通讯协议
*/
var assert = require('chai').assert;
var seat_client = require('../www/js/seat-comm-client');

var log = "";
var text = "";
    
function print(){
    console.log(log);
}

function onclose() {
    log += "Disconnected\n";
};

log = ""; // Clear log on reload

seat_client.server_url = "ws://localhost:1202/msiserver";

seat_client.onclose = onclose;


var gMSIUserId = 245
var gCallId = 201605050930210024;
var gWorkNo = 123456
describe('seat_client', function() {
    describe('#connect()', function () {
        it("should connect success", function (done) {
            seat_client.onopen = function onopen() {
                log += "Connected\n";
                print();
                done();
            };
            seat_client.connect();
        });
    });
    describe('#login()', function () {
        it("should login success:1200 245 123456  1 -1 NoIpName 1 13783476576", function (done) {
            seat_client.onloginResp = function(MSIUserId,nResult){
                log = ""; // Clear log on reload
                log += "seat_client.onloginResp: "+MSIUserId.toString()+","+nResult.toString()+"\n";
                print();
                assert.equal(gMSIUserId,MSIUserId);
                assert.equal(1,nResult);
                done();
            };
            seat_client.sendlogin(gMSIUserId,gWorkNo,"pass",1,-1,'NoIpName',1,'13783476576');
        });
    });
    describe('#checkout()', function () {
        it("should checkout success", function (done) {
            seat_client.oncheckoutResp = function(MSIUserId,nResult){
                log = ""; // Clear log on reload
                log += "seat_client.oncheckoutResp: "+MSIUserId.toString()+","+nResult.toString()+"\n";
                print();
                assert.equal(gMSIUserId,MSIUserId);
                assert.equal(1,nResult);
                done();
            };
            seat_client.sendcheckout(gMSIUserId,0);
        });
    });
    describe('#setmsistate()', function () {
        it("should setmsistate idle success", function (done) {
            seat_client.onsetmsistateResp = function(MSIUserId,nResult){
                log = ""; // Clear log on reload
                log += "seat_client.onsetmsistateResp: "+MSIUserId.toString()+","+nResult.toString()+"\n";
                print();
                assert.equal(gMSIUserId,MSIUserId);
                assert.equal(1,nResult);
                done();
            };
            seat_client.sendsetmsistate(gMSIUserId,0);
        });
    });
    describe('#needcall()', function () {
        it("should needcall success", function () {
            seat_client.sendneedcall(gMSIUserId,1);
        });
    });
    
    describe('#callin()', function () {
        this.timeout(30000);
        it("callin success:1101 230 201604221748540024 -1 10 1258130695 13849041182 13849041182 0 0", function (done) {
            seat_client.oncallinReport = function(MSIUserId,callId,srcMsiUserId,serviceId,
                        dstNum,srcNum,firstDstNum,collaData,callSrc){
                console.log("oncallinReport:"+MSIUserId.toString()+","+callId);
                assert.equal(gMSIUserId,MSIUserId);
                assert.equal(gCallId,callId);
                seat_client.sendcallinResp(MSIUserId,callId,1);
                done();
            }
        });
    });
    
    describe('#connectedReport()', function () {
        this.timeout(30000);
        it("connectedReport and hangup :1150 230 201604221748540024 1 0; 1102 230 201604221748540024 1", function (done) {
            seat_client.onconnectedReport = function(MSIUserId,callId,nResult,nType){
                console.log("onconnectedReport:"+MSIUserId.toString()+","+callId);
                assert.equal(gMSIUserId,MSIUserId);
                assert.equal(gCallId,callId);
                seat_client.sendhangup(MSIUserId,callId);
                
            }
            seat_client.onhangupReport = function(MSIUserId,callId,nType){
                console.log("seat_client.onhangupReport:"+MSIUserId.toString()+","+callId);
                assert.equal(gMSIUserId,MSIUserId);
                assert.equal(gCallId,callId);
                done();
            }
        });
    });
    
    describe('#onserviceReport()', function () {
        this.timeout(30000);
        it("onserviceReport:1152 245 1 1 13783688005", function (done) {
            seat_client.onserviceReport = function(MSIUserId,serviceId,nServiceNum,phoneList){
                console.log("onserviceReport:"+MSIUserId.toString()+","+serviceId);
                assert.equal(gMSIUserId,MSIUserId);
                done();
            }
        });
    });
    
    describe('#idle()', function () {
        this.timeout(600000);
        it("wait idle timeout", function (done) {
            ;
        });
    });
});

