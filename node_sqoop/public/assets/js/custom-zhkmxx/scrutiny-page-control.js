/**
 * Created by zhaozihe on 2017/3/28.
 */
var completeTasks = "";

$(document).ready(function () {
    judgeTaskInfo();
    setTaskInfo();
    refesh_process();
    setCompletedTasks();
    Materialize.updateTextFields();
});

function setTaskInfo(){
    var localstroage = window.localStorage;
    var taskId = localstroage.getItem("taskID");
    var taskName = localstroage.getItem("taskName");
    var tablestr = localstroage.getItem("tableNameList");
    var taskIncreamtent = localstroage.getItem("taskIncreament");
    var tableNames = JSON.parse(tablestr);
    console.log(tableNames);

    var namestr = '';
    $('#taskID').text(taskId);
    $('#taskName').text(taskName);
    $('#taskIncreament').text(taskIncreamtent);
    for(var i = 0 ; i< tableNames.length; i++){
        namestr = namestr + (tableNames[i].tableName) + '|';
    }
    $('#tableNames').text(namestr);
}

function judgeTaskInfo(){

    $.ajax({
        url:refreshprocessRouter,
        method: 'POST',
        dataType:'text',
        success: function(data){
            if(parseInt(data) != 100){
                $('#taskProcess').text(data + '%');
                $('#processbar').empty();
                $('#processbar').append('<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+ parseInt(data) +'%">');
            }else {

                $('#left-container-view').empty();
                $('#left-container-view').append('  <div class="alert alert-info">'+
                    ' <strong>所有任务执行完成，队列中无任务</strong> '+ '</div>');

            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            Materialize.toast("服务器停止服务，请联系管理员！", 4000,"red") ;
        }
    });
}

function refesh_process() {
    $('#refresh').click(function(){
        setCompletedTasks();
        $.ajax({
            url:refreshprocessRouter,
            method: 'POST',
            dataType:'text',
            success: function(data){
                if(parseInt(data) != 100){
                    $('#taskProcess').text(data + '%');
                    $('#processbar').empty();
                    $('#processbar').append('<div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+ parseInt(data) +'%">');
                    Materialize.toast("任务进度更新", 4000);
                }else {

                    var taskName =   $('#taskName').text();
                    var taskID = $('#taskID').text();
                    var taskStatus = CP_OK;
                    var tableInfo =  $('#tableNames').text();
                    var taskIncrement = $('#taskIncreament').text();
                    var taskdate = new Date().toLocaleString();
                    $('#left-container-view').empty();
                    $('#left-container-view').append('  <div class="alert alert-info">'+
                        ' <strong>所有任务执行完成，队列中无任务</strong> '+ '</div>');
                    createCompeletTask(taskName, taskID, taskStatus, tableInfo, taskIncrement,taskdate);
                    Materialize.toast("任务完成", 4000);
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                Materialize.toast("服务器停止服务，请联系管理员！", 4000,"red") ;
            }
        });
    });
}

function generateCompleltedTaskListItem(taskName, taskID, taskStatus, tableInfo, taskIncrement, taskdate) {
    $('#right-container-view').prepend('  ' +
        '<div class="row">'+
        '<div class="col-md-12">'+
        '<div class="card  hoverable white-text " style="background-color: #265a88">'+
        '<div class="card-content">'+
        '<div class="card-title"><span>'+taskName+'</span></div>'+
        '<p>任务ID：<label style="color: #d58512">'+taskID+' </label></p>'+
        '<p>任务状态：<label style="color: #d58512">'+taskStatus+'</label></p>'+
        '<p>表空间信息：<label style="color: #d58512">'+tableInfo+'</label></p>'+
        '<p>增量任务：<label style="color: #d58512">'+taskIncrement+'</label></p>'+
        '<p>任务完成时间：<label style="color: #d58512">'+taskdate+'</label></p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');
}

function setLeftContainerHeight(){
    var height = $("#right-container-view").height();
    console.log(height);

    $("#left-container-view").css("max-height", height+40);
    $("#left-container-view").css("overflow-y", "scroll");
    $("#left-container-view").css("right", "-17px");
}

/**
 * 获取已建立数据源
 */
function fetchCompletedTasks(){
    $.ajax({
        url:fetchCompletedTaskRouter,
        dataType:"json",
        type:"GET",
        success: function(data){
            completeTasks = data;
        }
    });
}

function setCompletedTasks(){
    $('#right-container-view').empty();
    $.ajax({
        url:fetchCompletedTaskRouter,
        dataType:"json",
        type:"GET",
        success: function(data){
            var DSarray = JSON.parse(data);
            for(var obj in DSarray){

                var taskName = DSarray[obj].taskName;
                var taskID = DSarray[obj].taskID;
                var taskStatus = DSarray[obj].taskStatus;
                var tableInfo = DSarray[obj].tableInfo;
                var taskIncrement = DSarray[obj].taskIncrement;
                var taskdate = DSarray[obj].taskdate;
                generateCompleltedTaskListItem(taskName, taskID, taskStatus, tableInfo, taskIncrement, taskdate);
            }
        }
    });

}

function createCompeletTask(taskName, taskID, taskStatus, tableInfo, taskIncrement, taskdate){

    var postData = {
        "taskName":taskName,
        "taskID":taskID,
        "taskStatus":taskStatus,
        "tableInfo":tableInfo,
        "taskIncrement":taskIncrement,
        "taskdate":taskdate};


    $.ajax({
        url:fetchCompletedTaskRouter,
        dataType:"text",
        type:"POST",
        data:postData,
        success: function(data){
            if(data === "true"){
                generateCompleltedTaskListItem(taskName, taskID, taskStatus, tableInfo, taskIncrement,taskdate);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}


var ip = "localhost";//"10.2.32.10";//
var url_prefix = "http://" + ip + ":3097";
var fetchCompletedTaskRouter = url_prefix + "/snp/fetchcompletedtask";
var refreshprocessRouter = url_prefix + "/snp/refreshprocess";


const CP_OK = '执行成功';