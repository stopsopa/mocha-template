'use strict';

//Lets require/import the HTTP module
const http          = require('http');
const url           = require('url');

module.exports = function curl(uri, data, headers) {

    (typeof data !== 'string') && (data = JSON.stringify(data) || '');

    return new Promise(function (resolve, reject) {

        uri = url.parse(uri);

        var options = {
            host    : uri.hostname,
            port    : uri.port,
            path    : uri.path
        };

        var req = http.request(options, function(res) {

            res.setEncoding('utf8');

            var buff = '';

            res.on('data', function (chunk) {
                buff += chunk;
            });

            res.on('end', function () {

                res.body = buff;

                // return resolve(data)
                try {
                    res.json = JSON.parse(buff);
                }
                catch (e) {
                }

                resolve(res);
            });

        });

        req.on('error', function(e) {
            reject(e)
        });

        data && req.write(data);

        req.end();
    });
}
