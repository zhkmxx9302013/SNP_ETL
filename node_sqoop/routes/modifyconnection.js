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
    var connName = req.body.connName;
    var connDBName = req.body.connDBName;
    var connPort = req.body.connPort;
    var connUserName = req.body.connUserName;
    var connPassword = req.body.connPassword;
    var connUrl = req.body.connUrl;
    console.log(connName+ " "+connDBName+ " "+connPort+ " "+connUserName+ " "+connUrl);


    if(1) {
        fs.readFile("tmpfile/datasource.json", 'utf-8', function (err, data) {
            if (err) {
                console.log("error");
                res.send("error");
            } else {
                var listObj = [];
                var result = {}
                if (data.length == 0) {
                    result = listObj;
                } else {
                    result = JSON.parse(data);
                }
                for(var obj in result){
                    if(result[obj].connName == connName){
                        result[obj].connDBName = connDBName;
                        result[obj].connPort = connPort;
                        result[obj].connUserName = connUserName;
                        result[obj].connUrl = connUrl;
                        console.log("aaa")
                        break;
                    }
                }
                fs.writeFileSync('tmpfile/datasource.json', JSON.stringify(result));
                console.log(JSON.stringify(result));
                res.send(JSON.stringify(result));
            }
        });
    }

});



module.exports = router;