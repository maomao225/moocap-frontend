/*
 * grunt-connect-rewrite
 * https://github.com/viart/grunt-connect-rewrite
 *
 * Copyright (c) 2013 Artem Vitiuk
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    url = require('url'),
    http = require('http'),
    path = require('path'),
    querystring = require('querystring'),
    utils = module.exports,
    rules = [];

utils.registerRule = function (rule) {
    if (!rule || !rule.from || !rule.to ||
        !(rule.from = rule.from.trim()) ||
        !(rule.from = rule.from.trim())) {
        return false;
    }

    var tempArray = rule.from.split('!');
    rule.from = tempArray[1];
    rule.method = tempArray[0];

    rules.push({
        from: new RegExp(rule.from),
        to: rule.to,
        method: rule.method
    });

    return true;
};

utils.resetRules = function () {
    rules = [];
};

utils.rules = function () {
    return rules;
};

function requireUncached(module){
    delete require.cache[require.resolve(module)];
    return require(module);
}

function request(options, res){
    return http.request(options, function(response) {
        response.setEncoding('utf-8');
        var data = '';
        Object.keys(response.headers).forEach(function (key) {
            res.setHeader(key, response.headers[key]);
        });
        res.statusCode = response.statusCode;
        response.on('data', function(chunk) {
            data += chunk;
        })
        .on('end', function() {
            res.end(data);
        });
    });
}

utils.dispatcher = function (req, res) {
    return function (rule) {
        console.log('请求的地址:' + req.url);
        console.log('当前正则：' + rule.method + '||' + rule.from);
        console.log('请求方式：' + req.method);
        console.log('是否通过正则测试：');
        console.log(rule.from.test(req.url) && rule.method === req.method.toLowerCase());
        if (rule.from.test(req.url) && rule.method == req.method.toLowerCase()) {
            // console.log(req.url);
            if (rule.to.indexOf('require!') === 0) {
                var urlObject = url.parse(req.url);
                // require
                var filepath = urlObject.pathname.replace(rule.from, rule.to).replace('require!', '');
                var realpath = path.join(process.cwd(), filepath);
                var parameters = querystring.parse(urlObject.query);
                if (fs.existsSync(realpath)) {
                    var data = requireUncached(realpath)(parameters);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return true;
                }
            } else if (rule.to.indexOf('http://') === 0) {
                // internet url

                var urlObject;
                if(rule.to.indexOf('http') !== -1 || rule.to.indexOf('https' !== -1)){
                    urlObject = url.parse(req.url.replace(rule.from, rule.to));
                }else{
                    urlObject = url.parse(req.url.replace(rule.from, rule.to));
                }
                var options = {
                    port: urlObject.port || 80,
                    hostname : urlObject.hostname,
                    path: urlObject.path,
                    headers: {},
                    method : req.method
                };

                for(var i in req.headers){
                    console.log(i);
                    var key = i.toLowerCase();
                    if(i.toLowerCase() === 'host' 
                        || i.toLowerCase() === 'accept'
                        || i.toLowerCase() === 'accept-encoding') {
                        continue;
                    }
                    options.headers[i] = req.headers[i];
                }

                var content;
                var postData = '';
                var params;
                var httpReq;
                if(req.method.toLowerCase() == 'post' 
                    || req.method.toLowerCase() == 'put' 
                    || req.method.toLowerCase() == 'patch'){
                    req.addListener("data", function (postDataChunk) {
                        postData += postDataChunk;
                    });
                    req.addListener("end", function () {
                        //var params = querystring.parse(postData);
                        options.headers["Content-Type"] = req.headers['content-type'] || 'application/json';
                        options.headers["Content-Length"] = Buffer.byteLength(postData, 'utf8');
                        console.log(postData);
                        httpReq = request(options, res);
                        httpReq.write(postData + '\n');                        
                        httpReq.end();
                        return true;
                    });
                }else {
                    httpReq = request(options, res);
                    httpReq.end();
                    return true;
                }
            } else {
                // redirect
                req.url = req.url.replace(rule.from, rule.to);
                console.log('redirect: ' + req.url);
                return true;
            }
        }
    };
};

utils.rewriteRequest = function (req, res, next) {
    // console.log('请求地址:' + req.url);
    // console.log(rules);
    if (rules.length) {
        rules.some(utils.dispatcher(req, res));
    }
    //next();
};
