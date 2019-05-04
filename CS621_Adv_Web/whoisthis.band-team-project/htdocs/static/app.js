/* 
    whoisthis.band - app.js 
    Caleb Farris, Matthew Jackson 
    David Parsons, Dongho Jeon 
*/

//-----------------------------------------------------------------------------
//									MAIN
//-----------------------------------------------------------------------------
var main = function () {
	"use strict";

    $("form").submit(function() {
        $(".content").hide();
        $(".loading").show();

        return true;
    });

    var orange_color = $('#welcome_click_sign_up:link').css('color');
	$('#welcome_click_sign_up').click(function() {
    	$('#welcome_click_sign_up:visited').css('color', orange_color);
	});

};

$(document).ready(main);