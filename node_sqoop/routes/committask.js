/**
 * Created by zhaozihe on 2017/3/17.
 */
var callfile = require('child_process');
var express = require('express');
var router = express.Router();
const fs = require('fs');


router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//Post handler
router.post('/', function (req, res) {
    //var connUserName = req.body.connUserName;
    //var connPassword = req.body.connPassword;
    //var connUrl = req.body.connUrl;
    //
    //callfile.execFile('/home/code/test.sh',['-H', ip, '-U', username, '-P', password, '-N', newpassword],null,function (err, stdout, stderr) {
    //    callback(err, stdout, stderr);
    //});
    //res.send(isSuccsess.toString());
});