/**
 * Created by zhao on 2017/3/12.
 */
var existDatasource = "";

$(document).ready(function () {
    $("#modifyBtn").hide();
    setDivHeight();
    testConnFunc();
    createConnFunc();
    fetchExistDatasource();
    setExistDatasourceView();
    modifyBtn();

});

/**
 * 获取已建立数据源
 */
function fetchExistDatasource(){
    $.ajax({
        url:createConnRouter,
        dataType:"json",
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
    };
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
            "connUrl":connPostUrl};

        $.ajax({
            url:testConnRouter,
            dataType:"text",
            type:"POST",
            data:postData,
            success: function(data){
                if(data == "true"){
                    Materialize.toast("测试连接通过！", 4000) ;
                }else{
                    Materialize.toast("测试连接失败！", 4000,"red") ;
                }
               //alert(data);
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
            "connUrl":connPostUrl};
       var DSArray = JSON.parse(existDatasource);
       for(var obj in DSArray){
            if(DSArray[obj].connName == dataJ[connName]){
                Materialize.toast("数据源名称已存在!", 4000,'red');
                isExist = true;
                return;
            }
        }

        $.ajax({
            url:createConnRouter,
            dataType:"text",
            type:"POST",
            data:postData,
            success: function(data){
                if(data === "true"){
                    $("input[type=reset]").trigger("click");
                    addViewToDatasourceContainer(dataJ, postData);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });

        //$.post(submitConnRouter, postData, submitFuncCallback);
    });
}

function setExistDatasourceView(){
    $.ajax({
        url:createConnRouter,
        dataType:"json",
        type:"GET",
        success: function(data){
            var DSarray = JSON.parse(data);
            for(var obj in DSarray){

                var connName = DSarray[obj].connName;
                var connServer = DSarray[obj].connServer;
                var connPort = DSarray[obj].connPort;
                var connDBName = DSarray[obj].connDBName;
                var connUserName = DSarray[obj].connUserName;
                var connUrl = DSarray[obj].connUrl;
                regenerateViewToDatasourceContainer(connName,connServer,connPort,connDBName,connUserName,connUrl)
            }

        }
    });

}

function createFuncCallback(data, status){
    if(status === "success"){

    }else{

    }
}


function editConfig(){

}

function addViewToDatasourceContainer(data, postData){
    var datasourceCardView = "<div class=\"col-md-12 col-sm-12 \" >" +
    "<div class=\"card  darken-1 hoverable \" style='background-color: #265a88'>"+
        "<div class=\"card-content white-text\">"+
            "<span class=\"card-title\">" +data[connName]+" <\/span>"+
            "<p>数据源地址\:<label>" +data[connServer]+" <\/p>"+
            "<p>数据源端口\:<label>" +data[connPort]+" <\/label><\/p>"+
            "<p>数据库名称\:<label>" +data[connDBName]+" <\/label><\/p>"+
            "<p>用  户  名\:<label>" +data[connUserName]+" <\/label><\/p>"+
            "<p>连  接  串\:<label>" +postData[connUrl]+" <\/label><\/p>"+
        "<\/div>"+
        "<div class=\"card-action\">"+
            "<a onclick=\"onModifyConfig()\">修改配置项<\/a>"+
            "<a href=\"#\">测试连接项<\/a>"+
            "<a href=\"#\">选择数据源<\/a>"+
            "<a href=\"#\">删除数据源<\/a>"+
        "<\/div>"+
        "<\/div>";
    $("#datasource-container").prepend(datasourceCardView);
}

function modifyBtn(){
    $("#modifyBtn").click(function () {

        var dataJ = generateConnJson();
        var instanConn = dataJ[connName];
        var connPostUrl = generateConnUrlFunc();
        var postData = {
            "connUserName":dataJ[connUserName],
            "connPassword":dataJ[connPassword],
            "connServer":dataJ[connServer],
            "connPort":dataJ[connPort],
            "connDBName":dataJ[connDBName],
            "connName":dataJ[connName],
            "connUrl":connPostUrl
        };
        $.ajax({
            url:modifyConnRouter,
            dataType:"text",
            type:"post",
            data:postData,
            success: function(data){
                var DSarray = JSON.parse(data);
                Materialize.toast("已修改数据源"+instanConn +"连接配置！", 4000) ;
                $("#datasource-container").empty();
                for(var obj in DSarray){
                    var connName = DSarray[obj].connName;
                    var connServer = DSarray[obj].connServer;
                    var connPort = DSarray[obj].connPort;
                    var connDBName = DSarray[obj].connDBName;
                    var connUserName = DSarray[obj].connUserName;
                    var connUrl = DSarray[obj].connUrl;
                    regenerateViewToDatasourceContainer(connName,connServer,connPort,connDBName,connUserName,connUrl);
                    $("#submitBtn").show();
                    $("#modifyBtn").hide();
                    $("#text_DSname").attr("disabled",false);
                    $("input[type=reset]").trigger("click");

                }
            }
        });
    });
}

function onModifyConfig(event) {
    $("#submitBtn").hide();
    $("#modifyBtn").show();
    var connName = $(event.target).parent().parent().find("span").text().trim();
    var connServer = $(event.target).parent().parent().find("p").eq(0).text().split(":")[1].trim();
    var connPort = $(event.target).parent().parent().find("p").eq(1).text().split(":")[1].trim();
    var connDB = $(event.target).parent().parent().find("p").eq(2).text().split(":")[1].trim();
    var connUser = $(event.target).parent().parent().find("p").eq(3).text().split(":")[1].trim();
    var connPwd = connUser;
    $("#text_DSname").attr("disabled",true);
    $("#text_DSname").val(connName);
    $("#text_url").val(connServer);
    $("#text_port").val(connPort);
    $("#text_dbname").val(connDB);
    $("#text_name").val(connUser);
    $("#text_passwd").val(connPwd);

    Materialize.updateTextFields();

}

function onDeleteAction(event){
    var postData = {
        "connName":$(event.target).parent().parent().find("span").text().trim()
    };
    $.ajax({
        url:deleteConnRouter,
        dataType:"text",
        type:"POST",
        data:postData,
        success: function(data){
            var DSarray = JSON.parse(data);
            Materialize.toast("已删除数据源连接配置！", 4000) ;
            $("#datasource-container").empty();
            for(var obj in DSarray){
                var connName = DSarray[obj].connName;
                var connServer = DSarray[obj].connServer;
                var connPort = DSarray[obj].connPort;
                var connDBName = DSarray[obj].connDBName;
                var connUserName = DSarray[obj].connUserName;
                var connUrl = DSarray[obj].connUrl;
                regenerateViewToDatasourceContainer(connName,connServer,connPort,connDBName,connUserName,connUrl);
            }

        }
    });
}

function onTestAction(event){
    var postData = {
        "connUserName":$(event.target).parent().parent().find("p").eq(3).text().split(":")[1].trim(),
        "connPassword":$(event.target).parent().parent().find("p").eq(3).text().split(":")[1].trim(),
        "connUrl":$(event.target).parent().parent().find("p").eq(4).text().substring(8).trim()
    };

    $.ajax({
        url:testConnRouter,
        dataType:"text",
        type:"POST",
        data:postData,
        success: function(data){
            if(data == "true"){
                Materialize.toast("测试连接通过！", 4000) ;
            }else{
                Materialize.toast("测试连接失败！", 4000,"red") ;
            }
            //alert(data);
        }
    });
}

function onSelectAction(event){
    if($(event.target).parent().parent().find("p").eq(0).text().split(":")[1].trim()=="10.2.32.1" &&
        $(event.target).parent().parent().find("p").eq(1).text().split(":")[1].trim() == "1521" &&
        $(event.target).parent().parent().find("p").eq(2).text().split(":")[1].trim() =="orcl"&&
        $(event.target).parent().parent().find("p").eq(3).text().split(":")[1].trim() =="SNP"&&
        $(event.target).parent().parent().find("p").eq(3).text().split(":")[1].trim() =="SNP"
    ){
        var localstroage = window.localStorage;
        passConnName = $(event.target).parent().parent().find("span").text();
        localstroage.setItem("DS-title", passConnName);
        window.location.href='empty.html';
    }else{
        Materialize.toast("数据库连接错误，请检查配置项！", 4000) ;
    }

}

function regenerateViewToDatasourceContainer(connName,connServer,connPort,connDBName,connUserName,connUrl){

    var datasourceCardView = "<div class=\"col-md-12 col-sm-12\">" +
        "<div class=\"card  darken-1 hoverable\" style='background-color: #265a88'>"+
        "<div class=\"card-content white-text\">"+
        "<span class=\"card-title\">" +connName+" <\/span>"+
        "<p>数据源地址\:<label>" +connServer+" <\/p>"+
        "<p>数据源端口\:<label>" +connPort+" <\/label><\/p>"+
        "<p>数据库名称\:<label>" +connDBName+" <\/label><\/p>"+
        "<p>用  户  名\:<label>" +connUserName+" <\/label><\/p>"+
        "<p>连  接  串\:<label>" +connUrl+" <\/label><\/p>"+
        "<\/div>"+
        "<div class=\"card-action\">"+
        "<a onclick=\"onModifyConfig(event)\">修改配置项<\/a>"+
        "<a onclick='onTestAction(event)'>测试连接项<\/a>"+
        "<a onclick='onSelectAction(event)'>选择数据源<\/a>"+
        "<a onclick='onDeleteAction(event)'>删除数据源<\/a>"+
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
var modifyConnRouter = url_prefix + "/snp/modifyconnection";
var deleteConnRouter = url_prefix + "/snp/deleteconnection";