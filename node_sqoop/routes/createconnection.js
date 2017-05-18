/**
 * Created by zhaozihe on 2017/3/13.
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

//Post handler
router.post('/', function (req, res) {
    var connUserName = req.body.connUserName;
    var connPassword = req.body.connPassword;
    var connUrl = req.body.connUrl;

    var isSuccsess = false;

    if(connUserName === "SNP" && connPassword === connUserName && connUrl=="jdbc:oracle:thin:@10.2.32.1:1521:orcl"){
        isSuccsess = true;
    }

    if(isSuccsess === true){
        fs.readFile("tmpfile/datasource.json",'utf-8',function(err,data){
            if(err){
                console.log("error");
                res.send("error");
            }else{
                var listObj = [];
                var result = {};
                console.log(data.length);
                if (data.length == 0){
                    result = listObj;
                }else{
                    result=JSON.parse(data);
                }
                var connObj = {};
                connObj.connName = req.body.connName;
                connObj.connUserName = req.body.connUserName;
                connObj.connDBName = req.body.connDBName;
                connObj.connPort = req.body.connPort;
                connObj.connServer = req.body.connServer;
                connObj.connUrl = req.body.connUrl;
                result.push(connObj);
                //var data_to_tmp ="connName:" + req.body.connName + ",\n" +
                //    "connUserName:" + req.body.connUserName + ",\n" +
                //    "connDBName:" + req.body.connDBName + ",\n" +
                //    "connPort:" + req.body.connPort + ",\n" +
                //    "connUrl:" + req.body.connUrl +  ",\n" +
                //    "connServer:" + req.body.connServer +",\n??"
                fs.writeFileSync('tmpfile/datasource.json', JSON.stringify(result));
            }
        });

    }

    res.send(isSuccsess.toString());
});



router.get('/', function(req, res, next) {
    var existDS = "";
    fs.readFile("tmpfile/datasource.json",'utf-8',function(err,data){
        if(err){
            console.log("error");
            res.send("error");
        }else{
            existDS = data;
            res.send(JSON.stringify(existDS));
        }
    });

});


module.exports = router;