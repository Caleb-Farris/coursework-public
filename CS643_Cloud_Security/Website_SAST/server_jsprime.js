
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var esprima = require('./esprima.js');
var engine = require('./engine.js');
var analyzer = require('./analyzer.js');
var formidable = require('formidable');


fs.readFile('./test.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function (req, res) {

        res.setHeader("Access-Control-Allow-Origin", "*");

        switch (req.url) {
            case '/':
                // res.writeHeader(200, {
                //     "Content-Type": "text/html"
                // });
                // res.write(html);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
                res.write('<input type="file" name="filetoupload"><br>');
                res.write('<input type="submit">');
                res.write('</form>');
                return res.end();
                res.end();
                break;
            case '/fileupload':
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    // console.log(files);
                    fs.readFile(files.filetoupload.path, 'utf8', function (err, data) {
                        res.writeHead(200, "OK", {
                            'Content-Type': 'application/json'
                        });
                        var code = data;
                        var options = {
                            loc: true,
                            comment: false,
                            raw: false,
                            range: false,
                            tolerant: false
                        };


                        var result = esprima.parse(code, options);
                        var str_result = JSON.stringify(result, null, 4);
                        // console.log(str_result);
                        engine.analyze(str_result);
                        engine.asignFunctionReturnValue(analyzer.sink);
                        analyzer.analyzeArrays(engine.real_func_names, engine.real_func_call, engine.real_variable_const, engine.real_variable_var, engine.real_variable_obj, engine.startScope, engine.endScope, code, res);
                        // console.log(res);
                        res.end();
                    });
                });
            break;
            case '/result':
                if (req.method == 'POST') {
                    var fullBody = '';
                    req.on('data', function (chunk) {
                        fullBody += chunk.toString();


                    });

                    req.on('end', function () {
                        console.log(fullBody);

                        res.writeHead(200, "OK", {
                            'Content-Type': 'application/json'
                        });
                        var decodedBody = querystring.parse(fullBody);
                        var code = decodedBody.editor;
                        var options = {
                            loc: true,
                            comment: false,
                            raw: false,
                            range: false,
                            tolerant: false
                        };


                        var result = esprima.parse(code, options);
                        var str_result = JSON.stringify(result, null, 4);
                        // console.log(str_result);
                        engine.analyze(str_result);
                        engine.asignFunctionReturnValue(analyzer.sink);
                        analyzer.analyzeArrays(engine.real_func_names, engine.real_func_call, engine.real_variable_const, engine.real_variable_var, engine.real_variable_obj, engine.startScope, engine.endScope, code, res);
                        // console.log(res);
                        res.end();
                    });
                }
                break;
        }
    }).listen(8086);
});