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

    var isSuccsess = true;

    if(isSuccsess === true){
        fs.readFile("tmpfile/completetask.json",'utf-8',function(err,data){
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
                connObj.taskName = req.body.taskName;
                connObj.taskID = req.body.taskID;
                connObj.taskStatus = req.body.taskStatus;
                connObj.tableInfo = req.body.tableInfo;
                connObj.taskIncrement = req.body.taskIncrement;
                connObj.taskdate = req.body.taskdate;
                result.push(connObj);

                fs.writeFileSync('tmpfile/completetask.json', JSON.stringify(result));
            }
        });

    }

    res.send(isSuccsess.toString());
});



router.get('/', function(req, res, next) {
    var completeTask = "";
    fs.readFile("tmpfile/completetask.json",'utf-8',function(err,data){
        if(err){
            console.log("error");
            res.send("error");
        }else{
            completeTask = data;
            res.send(JSON.stringify(completeTask));
        }
    });

});


module.exports = router;