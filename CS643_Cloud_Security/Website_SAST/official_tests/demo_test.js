// Catch eval()
var a = eval("EVIL");
var url=loc.href;
eval(url);

// Catch document.write()
var param = location.hash.split("#")[1];
document.write("Hello " + param + "!");
document.write("This is bad!");

// Avoid innerHtml
param = location.hash.split("#")[1];
node = document.getElementById('mydiv');
node.innerHTML=param;

//avoid setTimeout
function timedMsg(callback){
if(callback){
var t=setTimeout(eval('callback'),3000);
return 0;
}}
function fire(){
var call = location.hash.split("#")[1];
timedMsg(call);
}
