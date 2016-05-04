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
    console.log(eTime);
    console.log(sTime);
    console.log((eTime - sTime));
    return parseInt((eTime - sTime) / parseInt(divNum));
}
/*
Wed May 04 2016 21:44:02 GMT+0800 (中国标准时间)
Wed May 04 2016 21:43:02 GMT+0800 (中国标准时间)
*/
var sTime=new Date("Wed May 04 2016 21:43:02 GMT+0800 (中国标准时间)");
var eTime=new Date("Wed May 04 2016 21:44:02 GMT+0800 (中国标准时间)");
var sed=GetDateDiff(sTime,eTime,"minute");
console.log(sed);