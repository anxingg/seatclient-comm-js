console.log("输入任意内容")
process.stdin.setEncoding('utf8');
process.stdin.pause();
process.stdin.on('readable', function(chunk) {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('输入指令:' + chunk);
  }
});