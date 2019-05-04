var param = location.hash.split("#")[1];
document.write("Hello " + param + "!");
    function timedMsg(callback){
        if(callback){
            var t=setTimeout(eval('callback'),3000);
            return 0;
        }}
function fire(){
    var call = location.hash.split("#")[1];
    timedMsg(call);
}

    function timedMsg(callback){
        if(callback){
            var t=setTimeout(eval('callback'),3000);
            return 0;
        }}
function fire(){
    var call = location.hash.split("#")[1];
    var check=timedMsg;
    check(call);
}

    function timedMsg(abc,callback){
        if(callback){
            var t=setTimeout(eval('callback'),3000);
            return 0;
        }}
function fire(){
    var call = location.hash.split("#")[1];
    timedMsg(12,"call");
}

    function timedMsg(abc,callback){
        if(callback){
            var t=setTimeout(eval('callback'),3000);
            return 0;
        }}
function fire(){
    var call = location.hash.split("#")[1];
    var check=timedMsg;
    check("123",call);
}
    function go(){
        if (document.location.hash.split("#")[1]){
            document.location.replace(document.location.hash.split("#")[1]);
        }}
var param = document.location.hash.split("#")[1];
if (param){
    var d = document.createElement('div');
    d.innerHTML = param;
    if (document.body != null){
        document.body.appendChild(d);
    }}

var redir = location.hash.split("#")[1];
x = document.getElementById('anchor');
x.setAttribute('href',redir);

    function reload() {
        var redir = location.hash.split("#")[1];
        if (redir){
            x = document.getElementsByTagName('iframe');
            x[0].setAttribute('src',redir);
        }}

    param = location.hash.split("#")[1];
node = document.getElementById('mydiv');
node.innerHTML=param;
var doc=document;
var loc=location;
var url=loc.href;
eval(url);

    function simple(){
        var loc=location.hash.split('#')[1]
    }

div.innerHTML=loc;
var obj = {
    url: location.hash.split('#')[1],
    fantasy: function() {
        return this.url;
    }
};
eval(obj.fantasy());
div.innerHTML=obj.fantasy();

var obj = {
    url: location.hash.split('#')[1],
    fruit: null
};
function loc() {
    return this.url;
}
obj.fruit = loc;
eval(obj.fruit());
div.innerHTML=obj.fruit();
var oracle = {eagle: eval};
var bond=location;
oracle.eagle(bond);


    function xyz(asia){
        return asia;
    }
mango = location.hash.split('#')[1]
div.innerHTML=xyz(mango);

    function xyz(asia){
        return asia;
    }
mango = location.hash.split('#')[1]
yy = xyz;  // <---- SHOULD BE YELLOW
div.innerHTML=yy(mango);  // <---- SHOULD BE RED

    function xyz(abc,asia){
        return asia;
    }
mango = location.hash.split('#')[1]
div.innerHTML=xyz("123",mango);

    function xyz(abc,asia){
        return asia;
    }
mango = location.hash.split('#')[1]
var yy = xyz;  // <---- SHOULD BE YELLOW
div.innerHTML=yy("123",mango);  // <---- SHOULD BE RED

    yahoo=location.href;
function run(disco){
    eval(disco);
}
run(yahoo);

    yahoo=location.href;
function run(disco){
    eval(disco);
}
x=run;
z=x;
z(yahoo);

    eval_alias=eval;
loc=location.hash.split('#')[1];
eval_alias(loc);

    function apple(fruit){
        if(fruit.hasOwnProperty('innerHTML'))
            return fruit.innerHTML;
    }
yahoo=document.getElementsByTagName('div')[0];
mango=apple(yahoo);
mango=location.hash.split('#')[1]

    function apple(fruit){
        if(fruit.hasOwnProperty('innerHTML'))
            return fruit.innerHTML;
    }
yahoo=document.getElementsByTagName('div');
mango=apple(yahoo[0]);
url = location.hash.split('#')[1]
mango = "Hello" + url + "!";

    function apple(fruit,cake){
        fruit+="";
        if(cake.hasOwnProperty('innerHTML'))
            return cake.innerHTML;
    }
yahoo=document.getElementsByTagName('div')[0];
berry="123";
mango=apple(berry,yahoo);
mango=location.hash.split('#')[1]

function apple(fruit){
    if(fruit.hasOwnProperty('innerHTML'))
        return fruit.innerText;
    else
        return fruit.innerHTML;
}
yahoo=document.getElementsByTagName('div')[0];
mango=apple(yahoo);
mango=location.hash.split('#')[1]
    quora = {
    zebra: function (apple) {
        return this.yahoo(apple);
    },
    yahoo: eval
};
quora.zebra(location.hash.split('#')[1]); // ← SHOULD BE RED
    quora = {
    zebra: function (apple) {
        this.yahoo=apple;
    },
    yahoo: div.innerHTML
};
quora.zebra(location.hash);   // <--- SHOULD BE RED
    quora = {
    zebra: function (apple) {
        this.yahoo(apple);
    },
    yahoo: eval
};
x=quora.zebra;
y=x;
y(location.hash);
    quora = {
    zebra: "text",
    yahoo: function () {
        this.benz=this.zebra;
    },
    benz: div.innerHTML
};
quora.zebra=location.hash.split('#')[1];
quora.yahoo();
    quora = {
    zebra: "text",
    yahoo: function () {
        return this.benz=this.zebra;
    },
    benz: div.innerHTML
};
quora.zebra=location.hash.split('#')[1];
quora.yahoo();
var url=location.hash.split('#')[1]
(function (disco){
    eval(disco);
}(url));
    function template() { }
template.prototype = new Object;
template.prototype.exec = eval;
template.prototype.param = location.hash.split('#')[1];
function clone() { }
clone.prototype = new template;
var xy = new clone();
xy.exec(xy.param);
    function template() { }
template.prototype = new Object;
template.prototype.html = div.innerHTML;
template.prototype.param = location.hash.split('#')[1];
function clone() { }
clone.prototype = new template;
var xy = new clone();
xy.html = xy.param;
var ck = document.cookie;
function getcookie(n) {
    var ar = n + "=";
    var al = ar.length;
    var cl = ck.length;
    var i = 0;
    while (i < cl) {
        j = i + al;
        if (ck.substring(i, j) == ar) {
            e = ck.indexOf(";", j);
            if (e == -1)
                e = ck.length;
            return unescape(ck.substring(j, e));
        }
        i = ck.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    return "";
}
var Rlo = "";
var Rm = "";
Rlo = getcookie("Rlo");
Rlo = unescape(Rlo).replace("+", " ")
Rm = getcookie("Rm");
if (Rlo != "" && Rm != "") {
    document.getElementById('username').innerHTML = "Hi <a href=\"http://mypage.rediff.com/profile/myprofile\">" + Rlo + "</a>";
}


    function extract_location(obj) {
        return obj['location'];
    }
function extract_hash(obj) {
    return obj['hash'];
}
document.write((function () {
    return extract_hash(extract_location(document));
})())

var s_rev = ')hsah.noitacol.tnemucod(etirw.tnemucod';
var s_script = s_rev.split("").reverse().join("");
eval(s_script);
var escaped = encodeURIComponent(document.location.hash);  // <--- SHOULD NOT HIGHLIGHT
document.write(escaped);
var escaped = encodeURIComponent(document.location.hash);
document.write(decodeURIComponent(escaped));  // <---- SHOULD BE RED
var escaped = encodeURIComponent(document.location.hash);
div.innerHTML = decodeURIComponent(escaped);  // <--- SHOULD BE RED
    function myfoo() {
        return extract_hash(extract_location(document));
    }
function extract_location(obj) {
    return obj['location'];
}
function extract_hash(obj) {
    return obj['hash'];
}
document.write(myfoo());
    function myfoo() {
        return extract_hash(extract_location(document));
    }
function extract_location(obj) {
    return obj['location'];
}
function extract_hash(obj) {
    return obj['hash'];
}
b = myfoo();
div.innerHTML = b;
    function myfoo() {
        var x = document.location.hash + '';
        return (function () {
            return x;
        })();
    }
div.innerHTML = myfoo();
    YUI({
        filter: "raw",
        combine: false
    }).use("console", "escape", "node", function (Y) {
        var ln = Y.one("#last_name")
        var last_name = Y.Escape.html(document.location.hash);
        console.log("Last Name:" + last_name);
        ln.setHTML(last_name);
    });
var a = location.hash.split('#')[1]
b = a;
b = "1";
eval(b); // <---- SHOULD NOT BE RED
    function simple() {
        var loc=location.hash.split('#')[1]
    }
var loc=location.hash.split('#')[1]
div.innerHTML=loc;
var obj = {
    url: location.hash.split('#')[1],
    fantasy: function() {
        return this.url;
    }
};
eval(obj.fantasy);  // <----- SHOULD NOT BE RED
div.innerHTML=obj.fantasy(); // <---- SHOULD BE RED
var obj = {
    url: location.hash.split('#')[1],
    fruit: null
};
function loc() {
    return this.url;
}
obj.fruit = loc;  // ← Should be yellow
eval(obj.fruit);  // <----- SHOULD NOT BE RED
div.innerHTML=obj.fruit(); // <----- SHOULD BE RED
    function xyz(asia){
        return asia;
    }
mango = location.hash.split('#')[1]
div.innerHTML=xyz(mango);
asia = '12';
eval(asia); // <---- SHOULD NOT BE RED
var asia = {
    europe: eval
}
asia.europe("location.hash.split('#')[1]"); // ← SHOULD NOT BE RED, string
asia.europe(location.hash.split('#')[1]);
var asia = {
    europe: eval
}
var xy=asia.europe;
pqr=xy;
pqr("location.hash.split('#')[1]"); // ← SHOULD NOT BE RED, string
asia.europe(location.hash.split('#')[1]); // ← SHOULD BE RED
    function apple(fruit,cake){
        cake+="";   // <---- SOURCE CONVERTED TO STRING
        if(cake.hasOwnProperty('innerHTML'))
            return cake.innerHTML;  // <--- STRING HAS NO innerHTML PROPERTY
    }
yahoo=document.getElementsByTagName('div')[0];
berry=123;
mango=apple(berry,yahoo);
mango=location.hash.split('#')[1]   // <---- SHOULD NOT BE RED
quora = {
    zebra: function (apple) {
        return this.yahoo(apple);
    },
    yahoo: eval
};
x=quora.zebra; // ← SHOULD BE PINK
y=x; // ← SHOULD BE PINK
y(location.hash); // ← SHOULD BE RED
apple = {
    url: location.hash.split('#')[1]
};
banana = apple["url"];
carrot = {
    eclair: 1
};
dodge=carrot;
dodge.eclair=banana;
eval(dodge.eclair);
var test = {
    innerHTML: 'hello'
};
test.innerHTML = location.href;
var escaped = encodeURIComponent(document.location.hash);
div.innerHTML = decodeURIComponent(decodeURIComponent(escaped));  // <--- SHOULD BE RED
function myfoo() {
    var x = document.location.hash + ''; // ← SHOULD BE ORANGE
    return (function () {
        return x;
    })();
}
document.write(myfoo());
    function myfoo() {
        var x = document.location.hash + '';
        return (function () {
            return x;
        })();
    }
myfoo = alert; // ← SHOULD NOT BE YELLOW
document.write(myfoo()); // ← SHOULD NOT BE RED
function myfoo() {
    return document.location.hash.split('#')[1]
}
document.write(myfoo());
    function myfoo() {
        return document.location.hash.split('#')[1]
    }
myfoo = alert;
div.innerHTML = myfoo();  // <---- SHOULD NOT BE RED
var s_rev = ')hsah.noitacol.tnemucod(etirw.tnemucod';
var s_script = s_rev.split("").reverse().join("");
b = Y.Escape.html(s_script);
eval(b); // ← SHOULD BE RED
var s_rev = ')hsah.noitacol.tnemucod(etirw.tnemucod';
var s_script = s_rev.split("").reverse().join("");
div.innerHTML = Y.Escape.html(s_script); // ← SHOULD NOT BE RED
    document.write(l); // ← SHOULD NOT BE RED
var l = location.hash.split('#')[1];
var abc = location.hash.split('#')[1];
eval('abc+123'); // ← SHOULD NOT BE RED



