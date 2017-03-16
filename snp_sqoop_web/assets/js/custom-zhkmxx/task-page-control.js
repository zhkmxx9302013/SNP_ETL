/**
 * Created by zhao on 2017/3/12.
 */

$(document).ready(function () {

    datePickControl();
    isIncreamentContorl();
    isDateIncreamentContorl();
    isColIncreamentContorl();
    fetchTableData();
});

function dataTableControl(tableData) {
    console.log(JSON.stringify(tableData));
    $('#dataTables-e').dataTable({
        pagingType: 'full',
        "lengthMenu": [10,15,20],
        "autoWidth": true,
        "scroller": false,
        'columnDefs': [{
            'targets': 0,
            "width": "10%",
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function (data, type, full, meta){
                    return '<input type="checkbox" style="left:40px;opacity:100">';//'<input type="checkbox" class="filled-in" value="999">';
            }
        }],
        data:tableData, //[{ida:10,tableName:9},{ida:10,tableName:9}],  //JSON.stringify(tableData),

        "columns": [
            { title:"" ,"width": "20%"},
            { title:"表序号",data: "ida" ,"width": "20%"},
            { title:"表空间名称",data: "tableName" ,"width": "60%" }

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
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        }
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
            $("#increament_mode_date").active
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
            dataTableControl(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}


var CONSTANT = {

    // datatables常量
    DATA_TABLES : {
        DEFAULT_OPTION : { // DataTables初始化选项
            LANGUAGE : {
                sProcessing : "处理中...",
                sLengthMenu : "显示 _MENU_ 项结果",
                sZeroRecords : "没有匹配结果",
                sInfo : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                sInfoEmpty : "显示第 0 至 0 项结果，共 0 项",
                sInfoFiltered : "(由 _MAX_ 项结果过滤)",
                sInfoPostFix : "",
                sSearch : "搜索:",
                sUrl : "",
                sEmptyTable : "表中数据为空",
                sLoadingRecords : "载入中...",
                sInfoThousands : ",",
                oPaginate : {
                    sFirst : "首页",
                    sPrevious : "上页",
                    sNext : "下页",
                    sLast : "末页"
                },
                "oAria" : {
                    "sSortAscending" : ": 以升序排列此列",
                    "sSortDescending" : ": 以降序排列此列"
                }
            },
            // 禁用自动调整列宽
            autoWidth : false,
            // 为奇偶行加上样式，兼容不支持CSS伪类的场合
            stripeClasses : [ "odd", "even" ],
            // 取消默认排序查询,否则复选框一列会出现小箭头
            order : [],
            // 隐藏加载提示,自行处理
            processing : false,
            // 启用服务器端分页
            serverSide : true,
            // 禁用原生搜索
            searching : false
        },
        COLUMN : {
            // 复选框单元格
            CHECKBOX : {
                className: "td-checkbox",
                orderable : false,
                bSortable : false,
                data : "id",
                render : function(data, type, row, meta) {
                    var content = '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">';
                    content += '    <input type="checkbox" class="group-checkable" value="' + data + '" />';
                    content += '    <span></span>';
                    content += '</label>';
                    return content;
                }
            }
        },
        // 常用render可以抽取出来，如日期时间、头像等
        RENDER : {
            ELLIPSIS : function(data, type, row, meta) {
                data = data || "";
                return '<span title="' + data + '">' + data + '</span>';
            }
        }
    }


};

var ip = "localhost";//"10.2.32.10";
var url_prefix = "http://" + ip + ":3097";
var fetchTablesRouter = url_prefix + "/snp/fetchtables";

