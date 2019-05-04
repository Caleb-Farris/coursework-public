var express = require('express');
var app = express();
var fs = require('fs');
var assert = require('assert');
var LintStream = require('jslint').LintStream;

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

app.post('/upload', function (req, res) {
    var filePath = __dirname + "/" + req.files[0].filename;

    fs.readFile( req.files[0].path, function (err, data) {
        if (err) {
            console.log("Error On Reading file %s", req.files[0].path);
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

                res.end( JSON.stringify( response ) );
                return;
            }

            checkJsLint(filePath, data, res);
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

function checkJsLint(filePath, data, response) {
    var options = {"edition": "latest", "length": 100};
    var lintStream = new LintStream(options);

    var fileContent = readFileSync(filePath);

    lintStream.write({file: filePath, body: fileContent});


    lintStream.on('data', function (chunk, encoding) {

        try {

            // chunk is an object

            // chunk.file is whatever you supplied to write (see above)
            assert.deepEqual(chunk.file, filePath);

            // chunk.linted is an object holding the result from running JSLint
            // chunk.linted.ok is the boolean return code from JSLINT()
            // chunk.linted.errors is the array of errors, etc.
            // see JSLINT for the complete contents of the object

            if (chunk.linted.ok) {
                okMessage = {
                    status : 'ok',
                    tool : 'jslint'
                };

                response.end(JSON.stringify(okMessage));
            } else {
                errorMessage = {
                    status : 'error',
                    tool : 'jslint',
                    error : chunk.linted.errors
                };
                response.end(JSON.stringify(errorMessage));
            }
        } catch (err) {
            console.log(err);
            errorJson = {
                error:err,
                tool : 'jslint'
            };
            response.end( JSON.stringify(errorJson));
        } finally {
            removeFileSync(filePath);
        }

    });
}

var server = app.listen(8083, function () {
    console.log("Server started");
    console.log(server.address());
})