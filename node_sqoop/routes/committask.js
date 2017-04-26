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
router.post('/', function(req, res, next) {
    var tableNameArr = JSON.parse(req.body.tableNames);
    for(var i = 0 ; i< tableNameArr.length; i++){
        callfile.execFile('/home/code/nodejstest.sh',[JSON.stringify(tableNameArr[i].tableName)],null,function (error, stdout, stderr) {
            if (error) {
                console.log(error);
                console.log(stderr);
                throw error;
            }
            console.log(stdout);
        });
        console.log(JSON.stringify(tableNameArr[i].tableName));
    }

    res.send("successs");
});

module.exports = router;