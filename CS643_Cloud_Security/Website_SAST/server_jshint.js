var express = require('express');
var app = express();
var fs = require('fs');
var jshint = require('jshint').JSHINT;

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');


    // Pass to next layer of middleware
    next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).any());

/*'file' this should be key  from HTTP client
curl -X POST -F "file=@test.js" -F "file=@test.js" http://localhost:8081/upload/
* */

app.post('/upload', function (request, response) {
    var filePath = __dirname + "/" + request.files[0].filename;

    fs.readFile( request.files[0].path, function (err, data) {
        if (err) {
            console.log("Error On Reading file %s", request.files[0].path);
            console.log(err);
            return;
        }

        fs.writeFile(filePath, data, function (err) {
            if( err ){
                console.log("Error on writing file at path : %s", filePath);
                console.log( err );
                response = {
                    message:'Error Happened',
                    error:err
                };

                response.end( JSON.stringify( response ) );
                return;
            }


            try {
                var input = readFileSync(filePath);
                readLines(input, response, checkJsHint);
            } catch (err) {
                console.log("Error here caught>>>>>>>>>")
                console.log(err);
            } finally {
                try {
                    removeFileSync(filePath);
                } catch (err) {
                    console.log("Error here in  finally block >>>>>>>>>")
                    console.log(err);
                }
            }
        });
    });
})


function removeFileSync(filePath) {
    const fs = require('fs');

    fs.unlinkSync(filePath);
    console.log('successfully deleted %s', filePath);
}

function readFileSync(filePath) {
    var fileString = fs.readFileSync(filePath, "utf8");
    return fileString;
}


function readLines(input, response, callback) {
    var remaining = '';
    var source = [];

    remaining += input;
    var index = remaining.indexOf('\n');
    while (index > -1) {
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        source.push(line);
        index = remaining.indexOf('\n');
    }

    source.push(remaining);

    callback(source, response);
}

function checkJsHint(source, response) {
    var options = {
        undef: true,
        /*'-W100': true,
        '-W097': true*/
    };
    var predef = {
        foo: false
    };

    jshint(source, options, predef);

    if (jshint.errors && jshint.errors.length > 0) {
        var respObj = {
            status : 'error',
            tool : 'jshint',
            error  : jshint.errors
        };
        response.end( JSON.stringify(respObj));
    } else {
        var respObj = {
            status : "ok",
            tool : 'jshint'
        };

        response.end( JSON.stringify(respObj));
    }
}

var server = app.listen(8084, function () {
    console.log("Server started");
    console.log(server.address());
})