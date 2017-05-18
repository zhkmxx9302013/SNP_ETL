/**
 * Created by zhaozihe on 2017/4/1.
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

    // if(1) {
    //     fs.readFile("/home/code/SNP_Web/node_sqoop/s_process.tmp", 'utf-8', function (err, data) {
    //         if (err) {
    //             console.log("error");
    //             res.send("error");
    //         } else {
    //             res.send(result);
    //         }
    //     });
    // }
    res.send('100');

});



module.exports = router;