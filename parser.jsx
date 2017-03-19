'use strict';

const http          = require('http');
const Nightmare     = require('nightmare');
const path          = require('path');
const url           = require('url');
const qs            = require('querystring');
const assert        = console.assert;


assert(process.argv.length > 3, "try to call for example 'node " + path.basename(__filename) + " 0.0.0.0 80'");

const ip = process.argv[2];

// http://www.w3resource.com/javascript/form/ip-address-validation.php
assert(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip),
    "first argument should have format of ip address eg: 127.168.10.105 and is '" + ip + "'"
);

const port = process.argv[3];

//We need a function which handles requests and send response
function handleRequest(request, response) {

    // get params
    //     https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

    var uri = url.parse(request.url);

    var query = qs.parse(uri.query);

    if (!query.url) {
        return response.end("Specify parameters 'url'");
    }

    var night = Nightmare();

    night
        .goto(query.url)
        .wait('body')
        .evaluate(function () {
            return document.documentElement.outerHTML;
        })
        .end() // end nightmare instance
        .then(function (data) {
            response.end(data);
        })
    ;
}

//Create a server
var server = http.createServer(handleRequest);

server.listen(port, ip, () => {
    console.log('Parser server is running '+ip+':'+port)
});