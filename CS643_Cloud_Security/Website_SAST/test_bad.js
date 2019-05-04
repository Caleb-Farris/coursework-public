"use strict";
function test(a, b) {
  return a + b;
}

function test_bad(a, b) {

  var param = location.hash.split("#")[1];
  document.write("Hello " + param + "!");

  mango = location.hash.split('#')[1]
  yy = xyz;  // <---- SHOULD BE YELLOW
  div.innerHTML=yy(mango);  // <---- SHOULD BE RED

  return a + b;
}
