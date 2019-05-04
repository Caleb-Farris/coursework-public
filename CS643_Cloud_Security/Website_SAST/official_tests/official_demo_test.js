// eval can be bad
var a = eval("EVIL");

// innerHTML is bad
dangerous.innerHTML=document.location;

// this is fine
var b = "not harmful";

// this can be harmful
var param = location.hash.split("#")[1];
document.write("Hello " + param + "!");