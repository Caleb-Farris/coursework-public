//-----------------------------------------------------------------------------
//									MAIN
//-----------------------------------------------------------------------------
var main = function () {
	"use strict";

	//plugin that formats user number input 
	jQuery(function($) {
		$(".c1Num").mask("9-999-999-9999", {placeholder:" "});
		$(".c2Num").mask("9-999-999-9999", {placeholder:" "});
		$(".c3Num").mask("9-999-999-9999", {placeholder:" "});
	});
	
	//-------------------------------------------------------------------------
	//							Method:	 getData
	//							
	//	Parses all of the data from the user. 
	//	@return - A Javascript object
	//-------------------------------------------------------------------------
	var getData = function() {
		// If the first three fields are not empty
		if ($(".c1Name").val() !== "" && $(".c1Num").val() !== "" && 
			$(".username").val() !== "" ) {
			
			var $username = $(".username").val(),
				$c1Name =   $(".c1Name").val().replace(/-/g, ""),
				$c1Num =    $(".c1Num").val(),
				$c2Name =   $(".c2Name").val().replace(/-/g, ""),
				$c2Num =    $(".c2Num").val(),
				$c3Name =   $(".c3Name").val().replace(/-/g, ""),
				$c3Num =    $(".c3Num").val(),
				$message =  $(".message").val();

			var data = 
					{
						"username": $username, 
						"c1Name"  : $c1Name, 
						"c1Num"   : $c1Num,
						"c2Name"  : $c2Name,
						"c2Num"   : $c2Num, 
						"c3Name"  : $c3Name, 
						"c3Num"   : $c3Num, 
						"message" : $message
					};
			
			$("input").val("");

			return data;
		}
		// Return false if user has not entered info into first three fields
		else {
			return false;
		}
	};

	//-------------------------------------------------------------------------
	//						Method:	 createDBItem(input)
	//							
	//	 This method will take the user input and create an item in the AWS
	//	 DynamoDB by invoking AWS Lambda.  The first section authenticates the 
	//	 user, while the second invokes the lambda.
	//-------------------------------------------------------------------------
	var createDBItem = function(input) {
		//                    ***USER AUTHENTICATION***
		AWS.config.region = 'us-east-1';
		
		// *** IDENTITY POOL FOR ????'s APP_USERS ***
		// Sets the credentials provider with this identity pool ID
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    		IdentityPoolId: 'us-east-1:c5f3874b-1832-4d9a-b381-e66522e9d876',
		});

		// Gathering credentials
		AWS.config.credentials.get(function() {
    		var accessKeyId = AWS.config.credentials.accessKeyId;
    		var secretAccessKey = AWS.config.credentials.secretAccessKey;
    		var sessionToken = AWS.config.credentials.sessionToken;
		});
		//                  ***END USER AUTHENTICATION***

		var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
		var params = {
  			FunctionName : 'buttonCreateItem',
  			InvocationType : 'RequestResponse',
  			LogType : 'None',
  			Payload : JSON.stringify({
  				key1 : input
  			})
		};
		// AWS.Lambda(REGION+API_Version).invoke($params object[FunctionName,InvocationType,LogType,PayLoad{key1:input}])
		lambda.invoke( params, function(error, data) {
  			if (error) {
    			prompt(error);
  			} else {
    			console.log("Items sucdessfully created!");
  			}
		});
    };
	
	//-------------------------------------------------------------------------
	//							 ONCLICK FUNCTIONS
	//-------------------------------------------------------------------------
	$(".cancel").on("click", function (event) { 
		$("input").val("");
	});

	$(".submit").on("click", function (event) { 
		$("footer .container").empty();
		var data = getData();
		if (data) {
			createDBItem(data); //if there is a submit event, it will create database with getData() from the webpage to store in the database.
		}
		else {
			var $alert = 
			$("<p class='alert'>").text("*Please fill out the first three fields*");
			$("footer .container").append($alert);
		}
	});
};

//-----------------------------------------------------------------------------
//								   ENTRY POINT
//-----------------------------------------------------------------------------
$(document).ready(main);