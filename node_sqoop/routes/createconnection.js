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
        var data_to_tmp = req.body.connName + ",\n" + req.body.connUserName + ",\n" + req.body.connDBName + ",\n" + req.body.connPort + ",\n" + req.body.connUrl +  ",\n" + req.body.connServer +",\n??"
        fs.appendFile('tmpfile/datasource', data_to_tmp , function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    }

    res.send(isSuccsess.toString());
});



router.get('/', function(req, res, next) {
    var existDS = "";
    fs.readFile("tmpfile/datasource",'utf-8',function(err,data){
        if(err){
            console.log("error");
            res.send("error");
        }else{
            existDS = data;
            res.send(existDS);
        }
    });

});


module.exports = router;