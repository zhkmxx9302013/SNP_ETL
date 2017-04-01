/**
 * Created by zhaozihe on 2017/3/13.
 */
var express = require('express');
var router = express.Router();


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

    console.log(connPassword + connUrl);
    if(connUserName == "SNP" && connPassword == connUserName && connUrl=="jdbc:oracle:thin:@10.2.32.1:1521:orcl"){
        isSuccsess = true;
    }

    res.send(isSuccsess.toString());
});


module.exports = router;
