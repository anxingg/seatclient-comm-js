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
function onloginResp(MSIUserId,nResult){
    log += "seat_client.onloginResponse: "+MSIUserId.toString()+","+nResult.toString()+"\n";
}

function onopen() {
    log += "Connected\n";
};

function onclose() {
    log += "Disconnected\n";
};

log = ""; // Clear log on reload

seat_client.server_url = "ws://localhost:1202/msiserver";
seat_client.onopen = onopen;
seat_client.onclose = onclose;



describe('seat_client', function() {
    describe('#connect()', function () {
        it("should connect success", function () {
            seat_client.onopen = function onopen() {
                log += "Connected\n";
                print();
            };
            seat_client.connect();
        });
    });
});

describe('seat_client', function() {
    describe('#login()', function () {
        it("should login success:1,201,'12345',1,0,'noname',1,'13683717560'", function () {
            seat_client.onloginResp = function(MSIUserId,nResult){
                log += "seat_client.onloginResponse: "+MSIUserId.toString()+","+nResult.toString()+"\n";
                print();
                assert.equal(1,MSIUserId);
                assert.equal(1,nResult);
            };
            seat_client.sendlogin("1,201,'12345',1,0,'noname',1,'13683717560'");
        });
    });
});