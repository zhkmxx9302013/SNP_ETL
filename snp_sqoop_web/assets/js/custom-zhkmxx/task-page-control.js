/**
 * Created by zhao on 2017/3/12.
 */
var globalConunt = 0;
var _table;
var tbData;
$(document).ready(function () {
    $('.modal').modal({
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            commitTaskDetail();
        }
    });
    $("#input-alert").hide();


    datePickControl();
    isIncreamentContorl();
    isDateIncreamentContorl();
    isColIncreamentContorl();
    fetchTableData();
    inputFoucus();
    setTaskID();
    Materialize.updateTextFields();
});

function dataTableControl(tableData) {
    _table = $table.dataTable({
        pagingType: 'full',
        "lengthChange": false,
        "autoWidth": true,
        "scroller": false,
        "iDisplayLength": 10,
        data:tableData, //[{ida:10,tableName:9},{ida:10,tableName:9}],  //JSON.stringify(tableData),

        "columns": [

            { title:"表序号",data: "ida" ,"width": "20%"},
            { title:"表空间名称",data: "tableName" ,"width": "80%" }

        ],

        language: {
            "decimal":        "",
            "emptyTable":     "该数据库无任何表信息",
            "info":           "_START_ - _END_ 条，共 _TOTAL_ 条",
            "infoFiltered":   "",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "每页 _MENU_ 项",
            "loadingRecords": "正在加载数据...",
            "processing":     "正在处理...",
            "search":         "搜索:",
            "zeroRecords":    "没有找到该表",

            "paginate": {
                "first":      "<<",
                "last":       ">>",
                "next":       ">",
                "previous":   "<"
            },
            "aria": {
                "sortAscending":  ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
            }
        }
    }).api();
    setLeftContainerHeight();
    //行点击事件
    $("tbody",$table).on("dblclick","tr",function(event) {
        $(this).addClass("active").siblings().removeClass("active");
        //获取该行对应的数据
        var item = _table.row($(this).closest('tr')).data();
        _table.row($(this)).remove().draw( false );
        dbClickToLeftTag(item);
    });


}

function datePickControl(){
    $(".date_picker").flatpickr({
        enableTime: true,
        weekNumbers: true,
        altInput: true
    });
}

function isIncreamentContorl() {
    $('#increament_block').hide();
    $("#is_Increament").click(function() {
        if ($("#is_Increament").is(":checked")) {
            $("#increament_mode_date").active;
            $('#increament_block').show();
        } else {
            $('#increament_block').hide();
        }
    });
}


function isDateIncreamentContorl() {
    $('#date-time-div').hide();
    $("#increament_mode_date").click(function() {
        if ($("#increament_mode_date").is(":checked")) {
            $("#increament_mode_colval").attr("checked", false);
            generateDateIncreamentCard();
            $('#date-time-div').show();
            $('#col-val-div').hide();
        } else {
            $('#date-time-div').hide();
        }
    });

}

function isColIncreamentContorl() {
    $('#col-val-div').hide();
    $("#increament_mode_colval").click(function() {
        if ($("#increament_mode_colval").is(":checked")) {
            $("#increament_mode_date").attr("checked", false);
            generateColValIncreamentCard();
            $('#col-val-div').show();
            $('#date-time-div').hide();
        } else {
            $('#col-val-div').hide();
        }
    });
}

function fetchTableData(){

    $.ajax({
        url:fetchTablesRouter,
        method: 'GET',
        success: function(data){
            tbData = data;
            dataTableControl(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            Materialize.toast("服务器停止服务，请联系管理员！", 4000,"red") ;
        }
    });
}

function dbClickToLeftTag(data){
    globalConunt++;
    if(globalConunt % 3 == 0){
        $("#table_name_list").append('<a class="waves-effect waves-light btn red" style="margin-top:5px;margin-left: 3px" ondblclick="tagDbClick($(this))">' +data.tableName+'</a>');
    }else if(globalConunt % 3 == 1){
        $("#table_name_list").append('<a class="waves-effect waves-light btn blue white-text" style="margin-top:5px;margin-left: 3px"  ondblclick="tagDbClick($(this))">' +data.tableName+'</a>');
    }else{
        $("#table_name_list").append('<a class="waves-effect waves-light btn" style="margin-top:5px;margin-left: 3px"  ondblclick="tagDbClick($(this))">' +data.tableName+'</a>');
    }
    $("#table_name_list").trigger("create");
    generateColValIncreamentCard();
    generateDateIncreamentCard();
}


function addTag(data){
    globalConunt++;
    if(globalConunt % 3 == 0){
        $("#table_name_list").append('<a class="waves-effect waves-light btn red" style="margin-top:5px;margin-left: 3px" ondblclick="tagDbClick($(this))">' +data+'</a>');
    }else if(globalConunt % 3 == 1){
        $("#table_name_list").append('<a class="waves-effect waves-light btn blue white-text" style="margin-top:5px;margin-left: 3px"  ondblclick="tagDbClick($(this))">' +data+'</a>');
    }else{
        $("#table_name_list").append('<a class="waves-effect waves-light btn" style="margin-top:5px;margin-left: 3px"  ondblclick="tagDbClick($(this))">' +data+'</a>');
    }
    $("#table_name_list").trigger("create");

}

function onAddBtnClickListener(){
    var tableNames = $("#text_DSname").val();
    var tbArr = tableNames.split(",");

    for(var i = 0; i < tbArr.length; i++){

        if(JSON.stringify(tbData).indexOf(tbArr[i]) == -1){
            $("#input-alert").empty();
            $("#input-alert").append('<strong>表空间信息错误</strong> 未能找到' + tbArr[i] +'表' );
            console.log(tbArr[i]);
            $("#input-alert").show();

        }else{
            if(tbArr[i] == "") continue;
            addTag(tbArr[i]);
            $("#text_DSname").val("");
            generateColValIncreamentCard();
            generateDateIncreamentCard();
        }

    }
}

function inputFoucus(){
    $('#text_DSname').bind({
        focus: function () {
            $("#input-alert").hide();
        }
    });
}

function setTaskID(){
    var localstroage = window.localStorage;
    $("#text_DS").val(localstroage.getItem("DS-title"));
    $("#text_TaskID").val(createHexRandom());

}

function generateDateIncreamentCard(){
    var tagCount = $("#table_name_list").children().length;
    $("#date-time-div").empty();
    for(var i = 0; i < tagCount; i++){

        $("#date-time-div").append(
            '<div class="col s12">'+
                '<div class="card ">'+
                    '<div class="card-content ">'+
                        '<span class="card-title">' +$("#table_name_list").children().eq(i).text() + '</span>'+
                        '<input class="date_picker"  placeholder="选择增量开始时间">'+
                    '</div>'+
                '</div>'+
            '</div>');
        $(".date_picker").flatpickr({
            enableTime: true,
            weekNumbers: true,
            altInput: true
        });
    }

}


function generateColValIncreamentCard(){
    var tagCount = $("#table_name_list").children().length;
    $("#col-val-div").empty();
    for(var i = 0; i < tagCount; i++){

        $("#col-val-div").append('<div class="col s12 ">'+
                '<div class="card">'+
                    '<div class="card-content ">'+
                        '<p class="card-title">'+$("#table_name_list").children().eq(i).text()+'</p>'+
                        '<label >增量列名称</label>'+
                        '<input type="text" class="validate">'+
                        '<label >增量列值</label>'+
                        '<input i type="text" class="validate">'+
                    '</div>'+
                '</div>'+
            '</div>');
    }

}

function tagDbClick(obj){
    ////_table.fnAddData([
    ////    "00",
    ////    obj.val
    ////]);
    //alert(obj.text)
    obj.remove();

}


function setLeftContainerHeight(){
    var height = $("#right-container-view").height();
    console.log(height);

    $("#left-container-view").css("max-height", height+40);
    $("#left-container-view").css("overflow-y", "scroll");
    $("#left-container-view").css("right", "-17px");
}


function commitTaskDetail(){
    var tagCount = $("#table_name_list").children().length;
    $("#modal-info-content").empty();
    if ($("#is_Increament").is(":checked")) {
        if ($("#increament_mode_date").is(":checked")) {
            for(var i = 0; i < tagCount; i++){
                $("#modal-info-content").append(
                    '<div class="col s12">'+
                    '<div class="card blue col-md-4">'+
                    '<div class="card-content  white-text">'+
                    '<div >' +$("#table_name_list").children().eq(i).text() + '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="card blue-grey darken-1 col-md-3">'+
                    '<div class="card-content  white-text">'+
                    '<div >' + '增量模式：按时间增量导入' + '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="card red  col-md-5">'+
                    '<div class="card-content  white-text">'+
                    '<div >' + '起始时间：' +$("#date-time-div").find("input").eq(i).val()+ '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'

                );
            }
        }
        if($("#increament_mode_colval").is(":checked")) {
            for(var i = 0; i < tagCount; i++){
                $("#modal-info-content").append(
                    '<div class="col s12">'+
                    '<div class="card blue col-md-4">'+
                    '<div class="card-content  white-text">'+
                    '<div >' +$("#table_name_list").children().eq(i).text() + '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="card blue-grey darken-1 col-md-3">'+
                    '<div class="card-content  white-text">'+
                    '<div >' + '增量模式：按列值增量导入' + '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="card red col-md-5">'+
                    '<div class="card-content  white-text">'+
                    '<div >' + '字段名称：'+$("#col-val-div").find("input").eq(i+i).val() +'&nbsp&nbsp&nbsp&nbsp'+ '字段值:' + $("#col-val-div").find("input").eq(i+i+1).val() + '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'

                );
            }
        }
    } else {
        for(var i = 0; i < tagCount; i++){
            $("#modal-info-content").append(
                '<div class="col s12">'+
                    '<div class="card blue col-md-9">'+
                        '<div class="card-content  white-text">'+
                            '<div >' +$("#table_name_list").children().eq(i).text() + '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="card blue-grey darken-1 col-md-3">'+
                        '<div class="card-content  white-text">'+
                            '<div >' + '增量模式：未开启' + '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'

                );
        }
    }
    commitTask();
}

function commitTask(){
    $('#commitTask').click(function(){
        var tagCount = $("#table_name_list").children().length;
        var jsonArr = [];
        for(var i = 0; i < tagCount; i++){
            var tbName = $("#table_name_list").children().eq(i).text();
            if(tbName.indexOf("\n") == 0){
                tbName = tbName.substring(1);
            }
            var jsonItem = {'tableName':tbName};
            jsonArr.push(jsonItem);
        }
        var tableNames = {"tableNames": JSON.stringify(jsonArr)};
        console.log(tableNames);
        $.ajax({
            url:commitTaskUrl,
            method: 'POST',
            data:tableNames,
            dataType:'text',
            success: function(data){
                Materialize.toast("任务提交成功", 4000) ;
                setTimeout("location.href = 'process.html'", 2000);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                Materialize.toast("服务器停止服务，请联系管理员！", 4000,"red") ;
            }
        });
    });
}

function createHexRandom() {
    var num = '';
    for (i = 0; i <= 31; i++) {
        var tmp = Math.ceil(Math.random() * 15);
        if (tmp > 9) {
            switch (tmp) {
                case(10):
                    num += 'a';
                    break;
                case(11):
                    num += 'b';
                    break;
                case(12):
                    num += 'c';
                    break;
                case(13):
                    num += 'd';
                    break;
                case(14):
                    num += 'e';
                    break;
                case(15):
                    num += 'f';
                    break;
            }
        } else {
            num += tmp;
        }
    }
    return num
}


var ip = "10.2.32.10";//"localhost";
var url_prefix = "http://" + ip + ":3097";
var fetchTablesRouter = url_prefix + "/snp/fetchtables";
var commitTaskUrl = url_prefix + "/snp/committask";
var $table = $('#dataTables-e');

