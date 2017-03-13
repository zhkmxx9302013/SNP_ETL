/**
 * Created by zhao on 2017/3/12.
 */

$(document).ready(function () {
    testConnFunc();
    createConnFunc();
});


function generateConnJson() {
    var connData = {
        "connName":$("#text_DSname").val(),
        "connServer":$("#text_url").val(),
        "connPort":$("#text_port").val(),
        "connDBName":$("#text_dbname").val(),
        "connUserName":$("#text_name").val(),
        "connPassword":$("#text_passwd").val()
    }
    return connData;
}

function generateConnUrlFunc() {
    var data = generateConnJson();
    var connUrl = "jdbc:oracle:thin:@" +
            data[connServer] + ":" +
            data[connPort] + ":" +
            data[connDBName];
    return connUrl;
}

function testConnFunc(){
    $("#testBtn").click(function () {
        var data = generateConnJson();
        var connPostUrl = generateConnUrlFunc();
        var postData = {
            "connUserName":data[connUserName],
            "connPassword":data[connPassword],
            "connUrl":connPostUrl}

        $.ajax({
            url:testConnRouter,
            dataType:"text",
            type:"POST",
            data:postData,
            success: function(data){
                alert(data);
            }
        });
        //post(testConnRouter, postData, testFuncCallback);
    });
}

function testFuncCallback(data, status){
    if(status === "success"){
        alert(data);
    }else{
        alert("error");
    }
}

function createConnFunc() {
    $("#submitBtn").click(function () {
        var data = generateConnJson();
        var connPostUrl = generateConnUrlFunc();
        var postData = {
            "connUserName":data[connUserName],
            "connPassword":data[connPassword],
            "connUrl":connPostUrl}
        $.ajax({
            url:createConnRouter,
            dataType:"text",
            type:"POST",
            data:postData,
            success: function(data){
                alert(data);
            }
        });
        //$.post(submitConnRouter, postData, submitFuncCallback);
    });
}

function createFuncCallback(data, status){
    if(status === "success"){

    }else{

    }
}



//Const Area
var connName = "connName";
var connServer = "connServer";
var connPort = "connPort";
var connDBName = "connDBName";
var connUserName = "connUserName";
var connPassword = "connPassword";
var connUrl = "connUrl";

var url_prefix = "http://localhost:3000";
var testConnRouter = url_prefix + "/snp/testconnection";
var createConnRouter = url_prefix + "/snp/createconnction";