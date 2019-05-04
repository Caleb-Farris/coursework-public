//GOOD

var a = "CustomEvent";
good.CustomEvent = "CustomEvent";
var action = "static string";
var a = "addEventListener";
var addEventListener = "variable with name";
var a = "addIdleObserver()";
addIdleObserver = "static string";
something.addIdleObserver = "static string";
var a = "createContextualFragment()";
var createContextualFragment = "static string";
generateCRMFRequest = "static string";
var a = "generateCRMFRequest";
var a = "something.data";
var data = "something";
form.data = "mystring";
good.write = "static string";
good = "document.write";
good.writeln = "static string";
good = "document.writeln";
var a = "escapeHTML";
var escapeHTML = "just a string";
var a = "eval(alert(1));";

var a = {}; 
a.eval = "somstring";

var a  = "navigator.geolocation.getCurrentPosition(success, error);";
var a  = "navigator.getDeviceStorage(storageName)";
var href = "static string";

var a = document.createElement("a"); 
a.setAttribute("href", "http://mozilla.org"); 
document.body.appendChild(a);

var a = document.createElement("a"); 
a.setAttribute("href", 1); 
document.body.appendChild(a);

var a  = "indexedDB.open(abase)";
good.innerHTML = "static string";

var a = document.createElement("div"); 
a.setAttribute("innerHTML", "<h1>bad</h1>"); 
document.body.appendChild(a);

var getInnerHtml = document.getElementById("node").innerHTML;
//div.innerHTML = this is a comment
div.innerHTML = 1
var a = 1; div.innerHTML = a
var a  = "localStorage.open(abase)";
var localStorage  = "asdf";
var a = "message";
var message = "static string";
function receiveMessage() { console.log(1); }
function message() { console.log(1); }
var Function = "static string";
good.outerHTML = "static string";

var a = document.createElement("div"); 
a.setAttribute("outerHTML", "<h1>bad</h1>"); 

document.body.appendChild(a);

var getInnerHtml = document.getElementById("node").outerHTML;
//div.outerHTML = this is a comment
var a = "parseFromString";
doc = parser.parseFromString("<h1>somehtml</h1>", "text/html");
var a = "sessionStorage";
var a = "window.setInterval";
var a = "window.setTimeout";
var a = "something.src";
var src = "something";
var src = img.src;

var a = document.createElement("script"); 
a.src = "static string"; 
document.body.appendChild(a);

var open = "string window.open";

var a = {}; 
a.open = "string"; 

var a = {}; 
a.open = function () { alert(1); }; 
a.open("1", "2", a);



//BAD 


obj.addEventListener("cat", function(e) { process(e.detail) }); 
var event = new CustomEvent("cat",  {"detail":{"hazcheeseburger":true}});  
obj.dispatchEvent(event);

var a=document.createElement("form"); 
a.action="demo_form.asp"; document.body.appendChild(a);

var a=document.createElement("form"); 
a.setAttribute("action", "demo_form.asp"); 
document.body.appendChild(a);

var a=document.createElement("div"); 
a.innerHTML="<form action=\'demo.asp\'></form>"; 
document.body.appendChild(a);

var el = document.getElementById("outside");
el.addEventListener("click", modifyText, false);

addEventListener("click", errorPageEventHandler, true, false);
tab.linkedBrowser.addEventListener("load", function (event) {console.log(1);});
navigator.addIdleObserver(IdleObserver);
var documentFragment = range.createContextualFragment("<h1>bad</h1>");
crypto.generateCRMFRequest("CN=0", 0, 0, null, "console.log(1)", 384, null, "rsa-dual-use");
var a = crypto; a.generate = crypto.generateCRMFRequest; a.generate("CN=0", 0, 0, null, "console.log(1)", 384, null, "rsa-dual-use");
var a = event.data;
readPipe(event.something.data.pipe, a, b);
readPipe(event.data.pipe, a, b);
document.write("Hello World!");
window.document.write("Hello World!");
var a = window.document; a.b = document.write; a.b("<h1>bad</h1>");
document.writeln("Hello World!");
window.document.writeln("Hello World!");
var a = window.document; a.b = document.writeln; a.b("<h1>bad</h1>");
var nodeName = escapeHTML(node.name);
eval("alert(0);");
var a = eval; a("alert(0);");
navigator.geolocation.getCurrentPosition(showPosition);
var a = navigator.geolocation; a.getCurrentPosition(showPosition);
var a = navigator; a.geolocation.getCurrentPosition(showPosition);
var instanceOfDeviceStorage = navigator.getDeviceStorage(storageName);
var a = navigator; a.getDeviceStorage(storageName);
window["navigator"]["getDeviceStorage"](storageName);
a.href ="javascript:alert(0);";
a.href ="data:alert(0);";
something.a.href ="data:alert(0);";
var a = document.createElement("a"); a.setAttribute("href", "javascript:alert(0)"); document.body.appendChild(a);
var request = indexedDB.open("MyTestDatabase");
var a = "indexedDB"; window[a].open(3);
dangerous.innerHTML=document.location;
div.innerHTML = "static string" + someVariable;
localStorage.setItem("name", "user1");
var a = "localStorage"; window[a].setItem("name", "user1");
window.addEventListener("message", receiveMessage, false);
new Function("alert(0)")();
var a = Function; new a("alert(0)")();
dangerous.outerHTML=document.location;
div.outerHTML = "static string" + someVariable;
doc = parser.parseFromString(someVar, "text/html");
window.sessionStorage.setItem("username", "John");
sessionStorage.setItem("username", "John");
var a = sessionStorage; a.setItem("username", "John");
setInterval("console.log(1)", 500);
var intervalID = window.setInterval("console.log(2)", 500);
something.setInterval("console.log(3)", 500);
var a = window.setInterval; a("console.log(4)", 300);

var a = "setInterval"; 
window[a]("console.log(5)", 300);

setTimeout("console.log(1)", 500);
var intervalID = window.setTimeout("console.log(2)", 500);
something.setTimeout("console.log(3)", 500);

var a = window.setTimeout; 
a("console.log(4)", 300);

var a = "setTimeout"; 
window[a]("console.log(5)", 300);

obj.src = "mystring";

var a = document.createElement("script"); 

a.src = variable; 
document.body.appendChild(a);

win = window.open("http://www.mozilla.org", "name", fets);
var o = window.open; o("http://www.mozilla.org", "name", {});


