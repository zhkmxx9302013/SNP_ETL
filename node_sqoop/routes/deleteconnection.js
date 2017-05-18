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

    if(1) {
        fs.readFile("tmpfile/datasource.json", 'utf-8', function (err, data) {
            if (err) {
                console.log("error");
                res.send("error");
            } else {
                var i = 0;
                var listObj = [];
                var result = {};
                if (data.length == 0) {
                    result = listObj;
                } else {
                    result = JSON.parse(data);
                }
                for(var obj in result){
                    if(result[obj].connName == connName){
                        result.splice(i,1);
                        break;
                    }
                    i++;
                }
                fs.writeFileSync('tmpfile/datasource.json', JSON.stringify(result));
                console.log(JSON.stringify(result));
                res.send(JSON.stringify(result));
            }
        });
    }

});



module.exports = router;