var express = require('express');
var app = express();
var fs = require('fs');
var CLIEngine = require("eslint").CLIEngine;

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
curl -X POST -F "file=@test.js" -F "file=@test.js" http://localhost:8083/upload/
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

            checkESLint(filePath, data, res);
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

function checkESLint(filePath, data, response) {
    var cli = new CLIEngine();

// lint myfile.js and all files in lib/
    var report = cli.executeOnFiles([filePath]);

    console.log(report.errorCount);

    if (report.errorCount > 0) {
        resultJson = {
            status : "error",
            tool : 'eslint',
            error : report
        };
    } else {
        resultJson = {
            status : "ok",
            tool : 'eslint',
            result : report
        };
    }


    response.end(JSON.stringify(resultJson));

    removeFileSync(filePath);
}

var server = app.listen(8082, function () {
    console.log("Server started");
    console.log(server.address());
})