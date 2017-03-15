/**
 * Created by zhaozihe on 2017/3/15.
 */
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

router.get('/', function(req, res, next) {
    var existDS = "";
    fs.readFile("tmpfile/tables",'utf-8',function(err,data){
        if(err){
            console.log("error");
            res.send("error");
        }else{
            existDS = data;
            var obj = [];
            var data_json_str = "[";
            var tableNameArr = existDS.split(",");
            for(var i = 0;i < tableNameArr.length; i++){
                var tableIfo = {};
                tableIfo.ida = i;
                tableIfo.tableName = tableNameArr[i];
                obj.push(tableIfo);
            }
            res.send(obj);
        }
    });
});


module.exports = router;
