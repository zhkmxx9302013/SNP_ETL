/**
 * Created by zhao on 2017/3/12.
 */
var existDatasource = "";

$(document).ready(function () {
    setDivHeight();
    testConnFunc();
    createConnFunc();
    fetchExistDatasource();
    setExistDatasourceView();
});

/**
 * 获取已建立数据源
 */
function fetchExistDatasource(){
    $.ajax({
        url:createConnRouter,
        dataType:"text",
        type:"GET",
        success: function(data){
            existDatasource = data;
        }
    });
}

function setDivHeight(){
    var height = $("#left-container").height();
    console.log(height);
    $("#right-container").css("max-height", height);
    $("#right-container").css("overflow-y", "scroll");
}
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
        fetchExistDatasource();
        var dataJ = generateConnJson();
        var connPostUrl = generateConnUrlFunc();
        var postData = {
            "connUserName":dataJ[connUserName],
            "connPassword":dataJ[connPassword],
            "connServer":dataJ[connServer],
            "connPort":dataJ[connPort],
            "connDBName":dataJ[connDBName],
            "connName":dataJ[connName],
            "connUrl":connPostUrl}
        if(existDatasource.indexOf(dataJ[connName]) != -1){
            alert("数据源名称已存在!");
        }else{
            $.ajax({
                url:createConnRouter,
                dataType:"text",
                type:"POST",
                data:postData,
                success: function(data){
                    if(data === "true"){
                        addViewToDatasourceContainer(dataJ, postData);
                    }
                },
                error: function(data){
                    alert("ERROR==" + data);
                }
            });
        }

        //$.post(submitConnRouter, postData, submitFuncCallback);
    });
}

function setExistDatasourceView(){
    $.ajax({
        url:createConnRouter,
        dataType:"text",
        type:"GET",
        success: function(data){
            var DSarray = data.split("??");
            for(var i = 0; i < DSarray.length - 1;i++){
                var itemArr = DSarray[i].split(",");
                regenerateViewToDatasourceContainer(itemArr[0],itemArr[5],itemArr[3],itemArr[2],itemArr[1],itemArr[4]);
            }
        }
    });

}

function createFuncCallback(data, status){
    if(status === "success"){

    }else{

    }
}

function addViewToDatasourceContainer(data, postData){
    var datasourceCardView = "<div class=\"col-md-12 col-sm-12\">" +
    "<div class=\"card blue-grey darken-1\">"+
        "<div class=\"card-content white-text\">"+
            "<span class=\"card-title\">" +data[connName]+" <\/span>"+
            "<p>数据源地址\:<label>" +data[connServer]+" <\/p>"+
            "<p>数据源端口\:<label>" +data[connPort]+" <\/label><\/p>"+
            "<p>数据库名称\:<label>" +data[connDBName]+" <\/label><\/p>"+
            "<p>用  户  名\:<label>" +data[connUserName]+" <\/label><\/p>"+
            "<p>连  接  串\:<label> >" +postData[connUrl]+" <\/label><\/p>"+
        "<\/div>"+
        "<div class=\"card-action\">"+
            "<a href=\"#\">修改配置项<\/a>"+
            "<a href=\"#\">测试连接项<\/a>"+
            "<a href=\"#\">选择数据源<\/a>"+
            "<a href=\"#\">删除数据源<\/a>"+
        "<\/div>"+
        "<\/div>";
    $("#datasource-container").append(datasourceCardView);
}

function regenerateViewToDatasourceContainer(connName,connServer,connPort,connDBName,connUserName,connUrl){
    var datasourceCardView = "<div class=\"col-md-12 col-sm-12\">" +
        "<div class=\"card blue-grey darken-1\">"+
        "<div class=\"card-content white-text\">"+
        "<span class=\"card-title\">" +connName+" <\/span>"+
        "<p>数据源地址\:<label>" +connServer+" <\/p>"+
        "<p>数据源端口\:<label>" +connPort+" <\/label><\/p>"+
        "<p>数据库名称\:<label>" +connDBName+" <\/label><\/p>"+
        "<p>用  户  名\:<label>" +connUserName+" <\/label><\/p>"+
        "<p>连  接  串\:<label> >" +connUrl+" <\/label><\/p>"+
        "<\/div>"+
        "<div class=\"card-action\">"+
        "<a href=\"#\">修改配置项<\/a>"+
        "<a href=\"#\">测试连接项<\/a>"+
        "<a href=\"#\">选择数据源<\/a>"+
        "<a href=\"#\">删除数据源<\/a>"+
        "<\/div>"+
        "<\/div>";
    $("#datasource-container").append(datasourceCardView);
}

//Const Area
var connName = "connName";
var connServer = "connServer";
var connPort = "connPort";
var connDBName = "connDBName";
var connUserName = "connUserName";
var connPassword = "connPassword";
var connUrl = "connUrl";

var ip = "localhost";//"10.2.32.10";
var url_prefix = "http://" + ip + ":3097";
var testConnRouter = url_prefix + "/snp/testconnection";
var createConnRouter = url_prefix + "/snp/createconnection";